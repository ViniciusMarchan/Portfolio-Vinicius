import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';

// Use uma instalação existente de Playwright; não adiciona dependências ao site.
const { chromium } = await import(pathToFileURL(process.argv[2]).href);
const browser = await chromium.launch({ channel: 'msedge', headless: true });
const base = process.env.PREVIEW_URL || 'http://127.0.0.1:5173';
const results = [];
const errors = [];
const consoleErrors = [];
await mkdir('docs/screenshots', { recursive: true });
try {
  const page = await browser.newPage({ reducedMotion: 'reduce' });
  page.on('pageerror', error => errors.push(error.message));
  page.on('console', message => { if (message.type() === 'error') consoleErrors.push(message.text()); });
  for (const width of [360, 390, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto(base, { waitUntil: 'networkidle' });
    assert.equal(await page.locator('h1').count(), 1);
    const heroImage = await page.locator('.hero-portrait').evaluate(image => ({ src: image.currentSrc, loaded: image.complete && image.naturalWidth > 0 }));
    assert.equal(heroImage.loaded, true, `Foto carregada na largura ${width}`);
    assert.equal(heroImage.src.includes('portrait-desktop-800'), width >= 768, `Foto adequada na largura ${width}`);
    assert.equal(await page.locator('.project-card').count(), 3);
    assert.equal(await page.locator('.technology-tile').count(), 12);
    assert.equal(await page.locator('.technology-tile svg').evaluateAll(icons => new Set(icons.map(icon => getComputedStyle(icon).color)).size), 12);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > innerWidth);
    assert.equal(overflow, false, `Overflow na largura ${width}`);
    await page.getByRole('button', { name: 'Backend', exact: true }).click();
    assert.equal(await page.locator('.project-card').count(), 1);
    const card = page.getByRole('button', { name: 'Explorar projeto API Payment' });
    await card.click();
    assert.equal(await page.locator('dialog').evaluate(node => node.open), true);
    for (let tab = 0; tab < 8; tab++) {
      await page.keyboard.press('Tab');
      assert.equal(await page.locator('dialog').evaluate(node => node.contains(document.activeElement)), true, 'Foco deve permanecer no modal');
    }
    await page.getByRole('button', { name: 'Próximo projeto' }).click();
    await page.getByRole('heading', { name: 'Clothes Shop', exact: true }).waitFor();
    await page.keyboard.press('Escape');
    assert.equal(await page.locator('dialog').count(), 0);
    assert.equal(await card.evaluate(node => node === document.activeElement), true);
    await page.getByRole('button', { name: /Todos/ }).click();
    if (width < 768) {
      await page.getByRole('button', { name: 'Abrir menu' }).click();
      await page.getByRole('navigation').getByRole('link', { name: 'Sobre', exact: true }).click();
      assert.equal(await page.getByRole('button', { name: 'Abrir menu' }).getAttribute('aria-expanded'), 'false');
    }
    for (const section of await page.locator('main > section').all()) await section.scrollIntoViewIfNeeded();
    assert.equal(await page.locator('.portrait-wrap').isVisible(), width >= 768);
    if (width >= 768) assert.equal(await page.locator('.portrait-wrap img').evaluate(img => img.complete && img.naturalWidth > 0), true);
    await page.locator('h1').scrollIntoViewIfNeeded();
    if (width === 390 || width === 1440) {
      await page.mouse.move(0, 0);
      await page.screenshot({ path: `docs/screenshots/${width === 390 ? 'mobile' : 'desktop'}.png`, fullPage: true });
      await page.screenshot({ path: `docs/screenshots/${width === 390 ? 'mobile' : 'desktop'}-hero.png` });
      await page.locator('#tecnologias').screenshot({ path: `docs/screenshots/technologies-${width === 390 ? 'mobile' : 'desktop'}.png` });
    }
    results.push({ width, overflow: false, filters: 'passed', modal: 'passed', escapeAndFocus: 'passed', mobileMenu: width < 768 ? 'passed' : 'not applicable' });
  }
  assert.deepEqual(consoleErrors, []);
  assert.equal(await page.evaluate(() => getComputedStyle(document.querySelector('.hero-copy h1')).animationName), 'none');
  assert.equal(await page.evaluate(() => [...document.fonts].filter(font => font.status === 'loaded').length >= 2), true, 'As fontes locais devem carregar');
  await page.route('https://api.github.com/**', route => route.fulfill({ status: 403, body: '{}' }));
  await page.getByRole('button', { name: 'Outros repositórios' }).click();
  await page.getByText('Limite de consultas do GitHub atingido.', { exact: false }).waitFor();
  assert.equal(await page.locator('.project-card').count(), 3);
  results.push({ githubRateLimit: 'passed; curated projects preserved' });
  await page.unroute('https://api.github.com/**');
  await page.route('https://api.github.com/**', route => route.fulfill({ status: 200, body: '[]', contentType: 'application/json' }));
  await page.getByRole('button', { name: 'Tentar novamente' }).click();
  await page.getByText('Nenhum repositório adicional disponível.').waitFor();
  results.push({ githubEmptyStateAndRetry: 'passed' });
  await page.reload({ waitUntil: 'networkidle' });
  await page.unroute('https://api.github.com/**');
  await page.route('https://api.github.com/**', route => route.abort());
  await page.getByRole('button', { name: 'Outros repositórios' }).click();
  await page.getByRole('button', { name: 'Tentar novamente' }).waitFor();
  results.push({ githubNetworkFailure: 'passed' });
  assert.deepEqual(errors, []);
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.reload({ waitUntil: 'networkidle' });
  await page.locator('#sobre').scrollIntoViewIfNeeded();
  await page.locator('#sobre.revealed').waitFor();
  results.push({ normalMotionReveal: 'passed', localFonts: 'passed', modalFocusTrap: 'passed' });
  const report = { base, results, pageErrors: errors, consoleErrorsBeforeFailureSimulation: [], note: 'Edge headless; reduced and normal motion; no Lighthouse or production INP claim.' };
  await writeFile('docs/browser-verification.json', JSON.stringify(report, null, 2));
  console.log(JSON.stringify(report, null, 2));
} finally {
  await browser.close();
}

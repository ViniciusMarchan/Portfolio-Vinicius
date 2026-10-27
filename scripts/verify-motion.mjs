import assert from 'node:assert/strict';
import { pathToFileURL } from 'node:url';
import { writeFile } from 'node:fs/promises';

const { chromium } = await import(pathToFileURL(process.argv[2]).href);
const browser = await chromium.launch({ channel: 'msedge', headless: true });
try {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, reducedMotion: 'no-preference' });
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto(process.env.PREVIEW_URL || 'http://127.0.0.1:4173');
  assert.equal(await page.locator('#tecnologias').evaluate(element => element.classList.contains('reveal-pending')), true);
  await page.mouse.move(240, 180);
  await page.waitForFunction(() => document.querySelector('.pointer-effect').style.transform === 'translate3d(240px, 180px, 0px)');
  assert.equal(await page.locator('.pointer-effect').evaluate(element => getComputedStyle(element).pointerEvents), 'none');
  assert.equal(await page.locator('body').evaluate(element => getComputedStyle(element).cursor), 'none');
  assert.equal(await page.locator('.pointer-effect').evaluate(element => getComputedStyle(element).mixBlendMode), 'difference');
  assert.equal(await page.locator('.pointer-effect').evaluate(element => getComputedStyle(element, '::before').width), '110px');
  assert.equal(await page.locator('.pointer-effect').evaluate(element => getComputedStyle(element, '::after').backgroundColor), 'rgb(255, 121, 0)');
  await page.locator('.header-contact').hover();
  assert.equal(await page.locator('.pointer-effect').getAttribute('data-interactive'), 'true');
  for (const id of ['sobre', 'projetos', 'tecnologias', 'trajetoria', 'contato']) {
    await page.locator(`#${id}`).scrollIntoViewIfNeeded();
    await page.waitForFunction(id => document.getElementById(id).classList.contains('revealed'), id);
    await page.waitForFunction(id => getComputedStyle(document.getElementById(id)).opacity === '1', id);
  }
  await page.locator('#inicio').scrollIntoViewIfNeeded();
  assert.equal(await page.locator('#sobre').evaluate(element => element.classList.contains('reveal-pending')), false);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  assert.equal(await page.locator('.pointer-effect').evaluate(element => getComputedStyle(element).display), 'none');
  assert.notEqual(await page.locator('body').evaluate(element => getComputedStyle(element).cursor), 'none');
  assert.equal(await page.locator('.reveal-pending').count(), 0);
  const mobile = await browser.newPage({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  await mobile.goto(process.env.PREVIEW_URL || 'http://127.0.0.1:4173');
  assert.equal(await mobile.locator('.pointer-effect').evaluate(element => getComputedStyle(element).display), 'none');
  assert.deepEqual(errors, []);
  const result = { pointerTracking: 'passed', interactiveHover: 'passed', pointerDoesNotBlockClicks: 'passed', scrollEntranceAllSections: 'passed', revealOnce: 'passed', reducedMotionChange: 'passed', touchPointerDisabled: 'passed', pageErrors: errors };
  await writeFile('docs/motion-verification.json', JSON.stringify(result, null, 2));
  console.log(result);
} finally {
  await browser.close();
}

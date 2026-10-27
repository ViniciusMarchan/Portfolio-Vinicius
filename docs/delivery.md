# Entrega do redesign

Implementado localmente na branch `feat/editorial-portfolio-redesign`. Nenhum commit, push, merge ou deploy em produção foi executado.

## Revisão visual após feedback

A direção verde e abstrata foi substituída pelas prévias enviadas: preto/laranja, título branco condensado, foto real ampliada no hero com faixa diagonal, Sobre antes de Projetos, três projetos lado a lado, tecnologias em grade e contato escuro. Capturas e validação na raiz foram atualizadas.

## Resultado

- Header horizontal, menu acessível, hero tipográfico, arte fotográfica com diagonal laranja, projetos, sobre, tecnologias por área, trajetória, contato e footer.
- Galeria local de três projetos reais com filtros e estudos de caso em dialog acessível. Capas conceituais identificadas.
- CSS/Sass com transições curtas, IntersectionObserver e preferência por movimento reduzido. Sem Motion, WebGL, vídeo ou bibliotecas de scroll.
- Fontes locais com licenças e swap; foto existente otimizada em WebP responsivo, sem alterar a imagem original.
- Metadados em português, favicon próprio e imagem de compartilhamento.
- Um workflow oficial de Pages, testes em PR e deploy de dist restrito à main. Base configurável para domínio próprio ou subdiretório.

## Inventário

Modificados: `src/App.jsx`, `src/styles/main.sass`, `src/styles/variables.sass`, `package.json`, `package-lock.json`, `vite.config.js`, `index.html`, `.github/workflows/static.yml`, `README.md`.

Criados: `src/data/profile.js`, `src/data/projects.js`, `src/components/ProjectVisual.jsx`, `src/components/ProjectsGallery.jsx`, `src/img/portrait-400.webp`, `src/img/portrait-800.webp`, `public/favicon.svg`, `public/og-card.svg`, `public/og-card.png`, fontes e licenças em `public/fonts/`, `tests/projects.test.mjs`, `scripts/verify-browser.mjs`, este registro, plano em `docs/redesign-plan.md`, relatórios JSON e capturas em `docs/screenshots/`. Veredito visual em `.omx/state/redesign/ralph-progress.json`.

Removidos: `.github/workflows/jekyll-gh-pages.yml`, `public/vite.svg`, componentes antigos `AboutContainer`, `GitContainer`, `InformationContainer`, `MainContent`, `ProjectsContainer`, `Sidebar`, `SocialNetwork`, `TechnologiesContainer`; Sass não utilizado em `src/styles/components/` e `src/styles/mixins.sass`. A remoção dos estilos da sidebar também elimina as declarações inválidas `top: -50`.

Dependências removidas: `axios` e `gh-pages`. Nenhuma adicionada. React, React DOM, React Icons, Vite e Sass preservados; sem migração de framework. Scripts predeploy/deploy e homepage fictício removidos. O lockfile já estava alterado na entrada da sessão; essa versão foi a base para a atualização, sem restaurar o conteúdo antigo.

## Evidência

- `npm test`: 3 testes aprovados (catálogo offline, filtros e exclusões de repositórios).
- `npm run lint`: aprovado, zero avisos.
- `npm run build`: aprovado; JavaScript principal ~177,6 KB (~58,2 KB gzip), CSS ~23,2 KB (~5,8 KB gzip).
- Foto: original 620.487 bytes; WebP 400 px 5.352 bytes e 800 px 14.260 bytes.
- Edge headless em 360, 390, 768, 1024 e 1440 px: sem overflow horizontal, filtros, imagens/fontes, menu móvel, dialog, Tab, Escape e restauração de foco aprovados.
- Estados GitHub: limite 403, resposta vazia, nova tentativa e falha de rede aprovados; seleção editorial preservada.
- Movimento normal: reveal observado. Movimento reduzido: animação do título desativada.
- Base `/Portfolio-Vinicius/` validada com build e preview nessa base; raiz validada separadamente. Relatórios em `browser-verification*.json`.
- Inspeção visual das capturas reais em desktop e mobile. A skill visual-verdict não está instalada; o veredito foi registrado por inspeção direta.
- Revisão independente do código: sem bloqueadores após correções de foco/estado.

## Limites e publicação

Lighthouse e Web Vitals em produção não foram medidos. Execução remota do workflow, DNS, certificado e configuração administrativa do Pages não foram verificados. O homepage público declara `viniciusmarcham.com.br`; a raiz é o padrão e a variável `VITE_BASE_PATH` permite usar Pages em subdiretório. Veja as instruções completas no README antes do merge autorizado.

Currículo atualizado e demos antigas não confirmados; o currículo pode ser solicitado por e-mail. Nenhum cliente, emprego, certificação ou implantação AWS foi inventado. O e-mail e LinkedIn preservam os dados do repositório existente, sem confirmação de entrega/atualização da conta.

# Vinicius Marcham — Portfólio

Portfólio em português com React 18, Vite e Sass. Direção editorial escura, destaque laranja, tipografia local, diagrama técnico original e animações discretas com CSS/IntersectionObserver. `prefers-reduced-motion` desativa transições e smooth scroll.

## Executar

Node **22.12+** (CI usa Node 24):

```sh
npm ci
npm run dev
npm test
npm run lint
npm run build
npm run preview
```

No PowerShell com execução de scripts desabilitada, use `npm.cmd`.

## Organização e edição

- `src/App.jsx`: header responsivo, hero, sobre, tecnologias, trajetória, contato e footer.
- `src/components/ProjectsGallery.jsx`: seleção local, filtros, dialog acessível e consulta opcional de repositórios adicionais.
- `src/components/ProjectVisual.jsx`: capas conceituais originais, explicitamente identificadas; não são screenshots dos sistemas.
- `src/components/Technologies.jsx`: grade de 12 tecnologias com ícones coloridos, seis colunas no desktop e três no mobile, seguindo a referência visual enviada. Estilos em `src/styles/components/technologies.sass`.
- `src/data/projects.js`: conteúdo dos estudos, tecnologias, participação e fontes. Edite aqui para adicionar projetos.
- `src/data/profile.js`: contato e perfis existentes.
- `src/styles/main.sass`: tokens CSS, layouts, componentes e responsividade; `variables.sass`: fontes locais com swap.
- `src/img/portrait-*.webp`: versões de 400/800 px da foto existente, com srcset, sizes e lazy loading. Original preservado.
- `public/fonts`: Barlow Condensed e Space Grotesk, distribuídas sob SIL OFL, com licenças anexas.
- `public/og-card.*` e `favicon.svg`: identidade própria e imagem social.
- `tests/projects.test.mjs`: testes de seleção, filtros e exclusão de repositórios privados/forks/arquivados.
- `scripts/verify-browser.mjs`: verificação reproduzível no Edge com Playwright externo ao projeto.

A galeria principal funciona sem rede. A consulta opcional do GitHub só acontece ao clicar, compartilha a requisição/cache durante a sessão, limita espera a 10 segundos e trata loading, limite de consultas, falha e resultado vazio. Não utiliza tokens. A listagem adicional é limitada aos primeiros 100 repositórios públicos, excluindo selecionados, forks e arquivados.

O estudo de caso utiliza `<dialog>` nativo: Escape, foco inicial, contenção de Tab/Shift+Tab, retorno de foco e bloqueio de scroll de fundo. A seleção de outro projeto não fecha/reabre o modal. Não existem rotas dependentes de fallback no servidor.

## Conteúdo verificado e limites

A seleção foi conferida em fontes públicas em 26/10/2026:

- [API-Payment: manifesto Java/Spring](https://github.com/ViniciusMarchan/API-Payment/blob/main/pom.xml) e [código](https://github.com/ViniciusMarchan/API-Payment/tree/main/src/main/java/br/com/marcham/desafio_itau).
- [clothes-shop: dependências React/TypeScript](https://github.com/ViniciusMarchan/clothes-shop/blob/main/package.json) e [páginas](https://github.com/ViniciusMarchan/clothes-shop/tree/main/src/pages). Interfaces de checkout não comprovam processamento real de pagamentos.
- [LimitsGym: contexto acadêmico e equipe](https://github.com/ViniciusMarchan/LimitsGym/blob/master/README.md) e [manifesto](https://github.com/ViniciusMarchan/LimitsGym/blob/master/package.json). A participação individual não foi inferida além da equipe documentada.

Não foram acrescentados empregadores, anos de experiência, certificações, indicadores de proficiência nem resultados sem comprovação. Cloud/DevOps aparece como interesse informado pelo proprietário. O caso privado de WhatsApp/AWS foi omitido por ausência de material público autorizado. O currículo antigo do Drive não teve atualização/disponibilidade confirmadas: o botão solicita o documento pelo e-mail existente. Demonstrações sem disponibilidade confirmada não são anunciadas.

As referências de direção foram [Lando Norris](https://landonorris.com), [Dennis Snellenberg](https://dennissnellenberg.com/work) e [Aristide Benoist](https://aristidebenoist.com). Nenhum material visual desses sites foi copiado.

## Publicação no GitHub Pages

Há **um único workflow**, `.github/workflows/static.yml`, usando o fluxo oficial de artefatos do Pages. PRs executam testes, lint e build; deploy ocorre somente para `main`, após aprovação/merge fora desta entrega. Não houve push, merge ou publicação nesta implementação.

1. Em Settings → Pages, selecione **GitHub Actions** como fonte.
2. Confirme o destino e o domínio em Settings → Pages. O homepage público do repositório declara `https://viniciusmarcham.com.br`; DNS, certificado e configuração administrativa do Pages não puderam ser confirmados. Por isso o padrão continua `base: '/'`.
3. Para esse domínio, mantenha a variável de Actions `VITE_BASE_PATH` vazia ou `/`. Para `https://viniciusmarchan.github.io/Portfolio-Vinicius/`, defina a variável como `/Portfolio-Vinicius/` antes de publicar.
4. Se o endereço mudar, atualize também `og:image` em `index.html`. O hostname da imagem social atualmente segue o homepage declarado.
5. Revise a branch `feat/editorial-portfolio-redesign`; após autorização, faça merge. O workflow instala com `npm ci`, valida e envia **dist** ao Pages.

Para testar subdiretório localmente, defina `VITE_BASE_PATH=/Portfolio-Vinicius/` tanto no build quanto ao iniciar `npm run preview`. Em PowerShell: `$env:VITE_BASE_PATH='/Portfolio-Vinicius/'`. Remova a variável para voltar ao domínio raiz.

Foram removidos `homepage` de exemplo e os scripts antigos `predeploy`/`deploy`, que publicavam `build`. Também foram removidos Axios (sem uso), gh-pages (substituído pelo workflow oficial), sidebar/componentes Sass obsoletos e o favicon do Vite. Nenhuma dependência foi adicionada; a alteração prévia do lockfile foi mantida como base, sem restaurar versões antigas.

## Validação

Consulte [evidências](docs/browser-verification.json) e [registro da entrega](docs/delivery.md). Capturas reais: [desktop](docs/screenshots/desktop.png), [mobile](docs/screenshots/mobile.png).

Para repetir o teste visual, use uma instalação existente de Playwright e Edge:

```sh
node scripts/verify-browser.mjs /caminho/para/playwright/index.mjs
```

O servidor de preview deve estar ativo; `PREVIEW_URL` permite alterar o padrão `http://127.0.0.1:5173`. O script não instala bibliotecas no projeto. Ele verifica 360, 390, 768, 1024 e 1440 px, filtros, teclado/modal, menu, imagens, fontes, movimento reduzido e falhas da API, além de gerar screenshots e JSON.

Lighthouse mobile, Web Vitals em produção e a execução remota do workflow **não foram medidos**. Não há alegação de Performance 90+, LCP, CLS ou INP de produção.

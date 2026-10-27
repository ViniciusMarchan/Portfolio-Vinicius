export const projects = [
  {
    id: 'api-payment', name: 'API Payment', repository: 'API-Payment', category: 'Backend', type: 'API DE PAGAMENTOS',
    stack: ['Java 21', 'Spring Boot', 'PostgreSQL', 'RabbitMQ'],
    description: 'O que acontece entre um pagamento e sua confirmação? Uma API para explorar essa jornada.',
    context: 'Projeto de backend que reúne autenticação, pagamentos, transações e estatísticas em uma API Java.',
    goal: 'Organizar o processamento de pagamentos com persistência, autenticação e mensageria.',
    role: 'Desenvolvimento do projeto pessoal publicado no repositório.',
    decisions: 'O código é separado em domínios como pagamento, usuário e autenticação. Spring Security e JWT tratam autenticação; PostgreSQL e Flyway compõem a persistência. Há módulos de mensageria e outbox.',
    features: ['Cadastro e login com tokens', 'Criação e consulta de pagamentos', 'Processamento com RabbitMQ', 'Estatísticas de transações'],
    repo: 'https://github.com/ViniciusMarchan/API-Payment', source: 'pom.xml e src/main/java/br/com/marcham/desafio_itau', visual: 'payment',
  },
  {
    id: 'clothes-shop', name: 'Clothes Shop', repository: 'clothes-shop', category: 'Frontend', type: 'EXPERIÊNCIA DE E-COMMERCE',
    stack: ['React', 'TypeScript', 'Vite', 'React Query'],
    description: 'Da descoberta ao checkout. Uma interface de loja com catálogo e área administrativa.',
    context: 'Projeto de interface para e-commerce com páginas públicas e uma área administrativa organizadas em rotas distintas.',
    goal: 'Construir os fluxos de navegação de uma loja e separar a experiência de compra da administração.',
    role: 'Desenvolvimento do frontend publicado no repositório pessoal.',
    decisions: 'React e TypeScript estruturam a interface. O projeto utiliza React Router, React Query e Zustand, com componentes compartilhados e páginas divididas por área.',
    features: ['Catálogo e detalhes de produtos', 'Carrinho e interface de checkout', 'Páginas de conta e acompanhamento', 'Interfaces de administração de produtos e pedidos'],
    repo: 'https://github.com/ViniciusMarchan/clothes-shop', source: 'package.json e src/pages; os fluxos de pagamento em produção não foram validados.', visual: 'shop',
  },
  {
    id: 'limits-gym', name: 'Limits Gym', repository: 'LimitsGym', category: 'Full Stack', type: 'PROJETO ACADÊMICO · EM EQUIPE',
    stack: ['React', 'Next.js', 'Sass', 'MongoDB'],
    description: 'Tecnologia em movimento. Um projeto de conclusão de curso inspirado em uma academia real.',
    context: 'Trabalho de conclusão de curso técnico em Desenvolvimento de Sistemas, realizado em equipe e documentado no README público.',
    goal: 'Aplicar os conhecimentos do curso na construção de um site para o contexto de uma academia.',
    role: 'Integrante da equipe de desenvolvimento; a divisão individual de tarefas não está documentada.',
    decisions: 'O projeto utiliza React com Next.js 12, Sass, Material UI e MongoDB. O manifesto também registra bibliotecas para cookies, modais e máscaras de entrada.',
    features: ['Interface web para o contexto de academia', 'Componentes com Material UI', 'Integração da stack com MongoDB'],
    repo: 'https://github.com/ViniciusMarchan/LimitsGym', source: 'README.md e package.json. Demonstração antiga sem disponibilidade confirmada.', visual: 'gym',
  },
];
export function filterProjects(items, category) {
  return category === 'Todos' ? items : items.filter(item => item.category === category);
}
export function selectPublicRepositories(items) {
  if (!Array.isArray(items)) return [];
  return items.filter(item => !item.private && !item.fork && !item.archived && item.html_url?.startsWith('https://github.com/ViniciusMarchan/') && !projects.some(project => project.repository === item.name));
}

import { useEffect, useRef, useState } from 'react';
import { FiArrowUpRight, FiArrowRight, FiX, FiGithub } from 'react-icons/fi';
import { projects, filterProjects, selectPublicRepositories } from '../data/projects';
import ProjectVisual from './ProjectVisual';

let repositoryRequest;
function fetchRepositories() {
  if (!repositoryRequest) repositoryRequest = fetch('https://api.github.com/users/ViniciusMarchan/repos?per_page=100&sort=updated', { signal: AbortSignal.timeout(10000) })
    .then(response => { if (!response.ok) throw new Error(response.status === 403 || response.status === 429 ? 'Limite de consultas do GitHub atingido. Tente mais tarde.' : 'Não foi possível consultar o GitHub.'); return response.json(); })
    .then(selectPublicRepositories).catch(error => { repositoryRequest = undefined; throw error; });
  return repositoryRequest;
}
export default function ProjectsGallery() {
  const [filter, setFilter] = useState('Todos');
  const [selected, setSelected] = useState(null);
  const [extra, setExtra] = useState({ status: 'idle', items: [] });
  const dialog = useRef(null);
  const trigger = useRef(null);
  const categories = ['Todos', ...new Set(projects.map(project => project.category))];
  const isDialogOpen = selected !== null;
  useEffect(() => {
    if (!isDialogOpen) return;
    const element = dialog.current;
    element.showModal();
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { element.close(); document.body.style.overflow = previous; trigger.current?.focus(); };
  }, [isDialogOpen]);
  async function loadMore() {
    setExtra({ status: 'loading', items: [] });
    try { setExtra({ status: 'success', items: await fetchRepositories() }); }
    catch (error) { setExtra({ status: 'error', items: [], message: error.message }); }
  }
  function containDialogFocus(event) {
    if (event.key !== 'Tab') return;
    const controls = [...event.currentTarget.querySelectorAll('button:not(:disabled), a[href]')];
    const first = controls[0];
    const last = controls[controls.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }
  return <section id="projetos" className="section projects-section" data-reveal>
    <div className="section-kicker"><span>02 / PROJETOS SELECIONADOS</span><span>IDEIAS QUE VIRAM CÓDIGO ↙</span></div>
    <div className="section-heading"><h2>PROJETOS EM <span>DESTAQUE</span></h2><p>Uma seleção de projetos pessoais e acadêmicos.<br/>Cada um, um novo problema para resolver.</p></div>
    <div className="filters" role="group" aria-label="Filtrar projetos">{categories.map(category => <button key={category} aria-pressed={filter === category} onClick={() => setFilter(category)}>{category}{category === 'Todos' && <sup> {projects.length.toString().padStart(2, '0')}</sup>}</button>)}</div>
    <p className="sr-only" role="status">{filterProjects(projects, filter).length} projetos exibidos</p>
    <div className="projects-grid">{filterProjects(projects, filter).map(project => <article className={`project-card ${project.id === 'api-payment' ? 'featured' : ''}`} key={project.id}>
      <button className="project-open" aria-label={`Explorar projeto ${project.name}`} onClick={event => { trigger.current = event.currentTarget; setSelected(project); }}><ProjectVisual variant={project.visual}/><span className="project-overlay"><span>{String(projects.indexOf(project) + 1).padStart(2, '0')} / {project.type}</span><FiArrowUpRight/></span></button>
      <div className="project-info"><div><h3>{project.name}</h3><p>{project.description}</p></div><span className="project-index">0{projects.indexOf(project) + 1}</span></div>
      <div className="tags">{project.stack.map(tech => <span key={tech}>{tech}</span>)}</div>
    </article>)}</div>
    <div className="more-projects"><span>O processo continua. Mais experimentos no GitHub.</span><button className="text-link" onClick={loadMore} disabled={extra.status === 'loading'}>{extra.status === 'loading' ? 'Consultando…' : extra.status === 'error' ? 'Tentar novamente' : 'Outros repositórios'} <FiGithub/></button></div>
    <div aria-live="polite">{extra.status === 'error' && <p className="api-message">{extra.message} <a href="https://github.com/ViniciusMarchan?tab=repositories">Acessar no GitHub ↗</a></p>}{extra.status === 'success' && (extra.items.length ? <ul className="extra-repos">{extra.items.map(repo => <li key={repo.id}><a href={repo.html_url}>{repo.name}<FiArrowUpRight/></a>{repo.description && <p>{repo.description}</p>}</li>)}</ul> : <p>Nenhum repositório adicional disponível.</p>)}</div>
    {selected && <dialog ref={dialog} aria-labelledby="project-title" className="project-dialog" onKeyDown={containDialogFocus} onCancel={() => setSelected(null)} onClick={event => { if (event.target === event.currentTarget) setSelected(null); }}>
      <div className="dialog-content"><button className="dialog-close" autoFocus aria-label="Fechar projeto" onClick={() => setSelected(null)}><FiX/></button><span className="eyebrow">ESTUDO DE PROJETO / {selected.category}</span><h2 id="project-title">{selected.name}</h2><p className="dialog-intro">{selected.description}</p><ProjectVisual variant={selected.visual}/><div className="case-grid"><div><h3>Contexto & desafio</h3><p>{selected.context}</p><h3>Objetivo</h3><p>{selected.goal}</p><h3>Decisões técnicas</h3><p>{selected.decisions}</p></div><div><h3>Participação</h3><p>{selected.role}</p><h3>Stack</h3><div className="tags">{selected.stack.map(tech => <span key={tech}>{tech}</span>)}</div><h3>Funcionalidades</h3><ul>{selected.features.map(feature => <li key={feature}>{feature}</li>)}</ul></div></div><p className="source-note">Fonte: {selected.source} {selected.visual === 'gym' ? 'Captura do projeto fornecida pelo autor.' : 'Capa ilustrativa, não captura do sistema.'} Sem métricas de produção publicadas.</p><div className="dialog-actions"><a className="button primary" href={selected.repo}>Explorar código <FiGithub/></a><button className="text-link" onClick={() => setSelected(projects[(projects.indexOf(selected) + 1) % projects.length])}>Próximo projeto <FiArrowRight/></button></div></div>
    </dialog>}
  </section>;
}

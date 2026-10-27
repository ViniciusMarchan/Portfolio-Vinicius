import { useEffect, useState } from 'react';
import { FiArrowDown, FiArrowUpRight, FiArrowRight, FiGithub, FiLinkedin, FiMenu, FiX, FiCode, FiServer } from 'react-icons/fi';
import Technologies from './components/Technologies';
import PointerEffect from './components/PointerEffect';
import useScrollReveal from './hooks/useScrollReveal';
import { profile } from './data/profile';
import ProjectsGallery from './components/ProjectsGallery';
import portrait from './img/portrait-800.webp';
import desktopPortrait from './img/portrait-desktop-800.webp';
import portraitSmall from './img/portrait-400.webp';

const navigation = [['inicio', 'Início'], ['sobre', 'Sobre'], ['projetos', 'Projetos'], ['tecnologias', 'Tecnologias'], ['contato', 'Contato']];


function App() {
  useScrollReveal();
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState('inicio');
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.isIntersecting) setActive(entry.target.id); });
    }, { rootMargin: '-15% 0px -55% 0px' });
    document.querySelectorAll('main > section[id]').forEach(section => observer.observe(section));
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (!menuOpen) return;
    const close = event => { if (event.key === 'Escape') { setMenuOpen(false); document.querySelector('.menu-toggle')?.focus(); } };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, [menuOpen]);

  return <>
    <PointerEffect/>
    <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
    <header className="site-header">
      <a href="#inicio" className="monogram" aria-label="Vinicius Marcham, início">VM<span>.</span></a>
      <button className="menu-toggle" aria-expanded={menuOpen} aria-controls="navigation" aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <FiX/> : <FiMenu/>}</button>
      <nav id="navigation" aria-label="Navegação principal" className={menuOpen ? 'is-open' : ''}>{navigation.map(([id, label]) => <a key={id} href={`#${id}`} aria-current={active === id ? 'location' : undefined} onClick={() => setMenuOpen(false)}>{label}</a>)}</nav>
      <a className="header-contact" href={`${import.meta.env.BASE_URL}Curriculo_Vinicius_Marcham.pdf`} download="Curriculo_Vinicius_Marcham.pdf">Baixar currículo <FiArrowUpRight/></a>
    </header>
    <main id="conteudo">
      <section id="inicio" className="hero">
        <div className="hero-grid"><div className="hero-copy"><p className="eyebrow">OLÁ, EU SOU</p><h1>VINICIUS<br/><span>MARCHAM</span></h1><h2>DESENVOLVIMENTO<br/><span>INFRAESTRUTURA E CLOUD</span></h2><p className="hero-description">Desenvolvo soluções modernas, escaláveis e seguras,<br/>unindo desenvolvimento, infraestrutura e cloud<br/>para transformar ideias em resultados.</p><div className="hero-actions"><a href="#projetos" className="button primary">Explorar projetos <FiArrowUpRight/></a><a href="#sobre" className="text-link">Sobre mim <FiArrowRight/></a></div></div>
          <div className="hero-art" aria-hidden="true"><div className="hero-orange-panel"/><picture><source media="(min-width: 768px)" srcSet={desktopPortrait} width="800" height="846"/><img className="hero-portrait" src={portrait} width="800" height="1048" alt=""/></picture><div className="hero-art-caption"><span>TECNOLOGIA</span><span>DESENVOLVIMENTO</span><span>INFRAESTRUTURA</span><span>SEGURANÇA</span></div></div>
        </div><div className="hero-bottom"><a href="#projetos"><FiArrowDown/> SCROLL PARA EXPLORAR</a><div><a href={profile.github}>GITHUB <FiArrowUpRight/></a><a href={profile.linkedin}>LINKEDIN <FiArrowUpRight/></a></div></div>
      </section>
      <section id="sobre" className="section about-section" data-reveal><div className="section-kicker"><span>01 / SOBRE MIM</span><span>PESSOA ANTES DO CÓDIGO</span></div><div className="about-grid"><div className="portrait-wrap"><img src={portrait} srcSet={`${portraitSmall} 400w, ${portrait} 800w`} sizes="(max-width: 767px) 90vw, 40vw" alt="Vinicius Marcham" width="800" height="1048" loading="lazy" decoding="async"/><span className="portrait-caption">VINICIUS MARCHAM DA SILVA</span><span className="portrait-mark">VM.</span></div><div className="about-copy"><p className="eyebrow">CURIOSIDADE É O PONTO DE PARTIDA.</p><h2>TRANSFORMANDO<br/>IDEIAS EM SOLUÇÕES<br/><span>REAIS.</span></h2><p>Sou Vinicius Marcham da Silva, desenvolvedor com interesse em conectar interfaces, sistemas e infraestrutura. Gosto de entender como as peças se encaixam — e transformar esse entendimento em soluções úteis.</p><p>Minha trajetória passa pelo desenvolvimento web com React e Node.js, APIs e projetos em equipe. Cloud, DevOps, escalabilidade e segurança são os próximos desafios que me movem.</p><a href={profile.linkedin} className="text-link">Mais sobre minha trajetória <FiArrowUpRight/></a><div className="about-facts"><div><FiCode/><span>Interfaces & sistemas</span></div><div><FiServer/><span>Cloud & infraestrutura</span></div></div></div></div></section>
      <ProjectsGallery/>
      <Technologies/>
      <section id="trajetoria" className="section timeline-section" data-reveal><div className="section-kicker"><span>04 / TRAJETÓRIA</span><span>APRENDER. CONSTRUIR. EVOLUIR.</span></div><div className="timeline-grid"><h2>EXPERIÊNCIA<br/><span>& FORMAÇÃO</span></h2><div className="timeline"><article><span>FORMAÇÃO TÉCNICA / PROJETO EM EQUIPE</span><h3>Desenvolvimento de Sistemas</h3><p>Participação no LimitsGym, trabalho de conclusão de curso técnico que conecta desenvolvimento web e o contexto de uma academia.</p><a href="https://github.com/ViniciusMarchan/LimitsGym" className="text-link">Conhecer o projeto <FiArrowUpRight/></a></article><article><span>PRÁTICA / PROJETOS PESSOAIS</span><h3>Da interface à API</h3><p>Exploração de aplicações web, e-commerce e backend por meio de projetos públicos, com diferentes tecnologias e desafios.</p></article><article><span>PRÓXIMOS PASSOS</span><h3>Sistemas que vão além da tela</h3><p>Aprofundar os estudos em cloud, infraestrutura, escalabilidade e segurança, mantendo o aprendizado conectado à prática.</p></article></div></div></section>
      <section id="contato" className="section contact-section" data-reveal><div className="section-kicker"><span>05 / VAMOS CONVERSAR</span><span>O PRÓXIMO PROJETO COMEÇA AQUI.</span></div><p className="eyebrow">IDEIAS BOAS MERECEM SAIR DO PAPEL.</p><a className="contact-title" href="https://wa.me/5518997249894"><h2>VAMOS<br/><span>CONVERSAR?</span></h2><FiArrowUpRight/></a><div className="contact-bottom"><a href={`mailto:${profile.email}`}>{profile.email} <FiArrowUpRight/></a><p>{profile.location}</p><div><a href={profile.github} aria-label="GitHub"><FiGithub/></a><a href={profile.linkedin} aria-label="LinkedIn"><FiLinkedin/></a></div></div></section>
    </main><footer className="site-footer"><a href="#inicio" className="monogram" aria-label="Voltar ao início">VM<span>.</span></a><p>© {new Date().getFullYear()} Vinicius Marcham</p><span>FEITO COM INTENÇÃO. E CÓDIGO.</span><a href="#inicio">Voltar ao topo ↑</a></footer>
  </>;
}
export default App;

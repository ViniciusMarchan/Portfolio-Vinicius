import {
  SiAmazonaws, SiDocker, SiLinux, SiReact, SiNodedotjs, SiNestjs,
  SiPostgresql, SiJavascript, SiPhp, SiLaravel, SiGit, SiCloudflare,
} from 'react-icons/si';

const technologies = [
  { name: 'AWS', Icon: SiAmazonaws, color: '#ff9900' },
  { name: 'Docker', Icon: SiDocker, color: '#2496ed' },
  { name: 'Linux', Icon: SiLinux, color: '#f5c842' },
  { name: 'React', Icon: SiReact, color: '#00c8f4' },
  { name: 'Node.js', Icon: SiNodedotjs, color: '#72ad42' },
  { name: 'NestJS', Icon: SiNestjs, color: '#e9234f' },
  { name: 'PostgreSQL', Icon: SiPostgresql, color: '#4895c5' },
  { name: 'JavaScript', Icon: SiJavascript, color: '#f7df1e' },
  { name: 'PHP', Icon: SiPhp, color: '#9298ed' },
  { name: 'Laravel', Icon: SiLaravel, color: '#ff3931' },
  { name: 'Git', Icon: SiGit, color: '#f4512b' },
  { name: 'Cloudflare', Icon: SiCloudflare, color: '#f6821f' },
];

export default function Technologies() {
  return (
    <section id="tecnologias" className="section technologies-section" data-reveal>
      <div className="section-kicker"><span>03 / TECNOLOGIAS</span></div>
      <div className="technology-content">
        <p className="eyebrow"><span className="status-dot"/> TECNOLOGIAS</p>
        <h2>FERRAMENTAS<br/>QUE UTILIZO</h2>
        <ul className="technology-grid" aria-label="Tecnologias e ferramentas">
          {technologies.map(({ name, Icon, color }) => (
            <li className="technology-tile" key={name}>
              <Icon style={{ color }} aria-hidden="true" focusable="false"/>
              <span>{name}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="technology-art" aria-hidden="true">
        <svg viewBox="0 0 320 430" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="city-light" x1="0" y1="0" x2="1" y2="1">
              <stop stopColor="#a8abad"/><stop offset="1" stopColor="#33383b"/>
            </linearGradient>
            <pattern id="city-windows" width="12" height="15" patternUnits="userSpaceOnUse">
              <rect width="12" height="15" fill="#181c1f"/>
              <path d="M3 3h3v7H3z" fill="#6b7276" opacity=".6"/>
            </pattern>
          </defs>
          <path d="M105 0h125L105 430H0z" fill="url(#city-light)" opacity=".8"/>
          <g transform="translate(110 15) rotate(15 90 200)">
            <path d="M0 430V190h35V120h36V70h24v360z" fill="url(#city-windows)"/>
            <path d="M95 430V230h24V155h38v-40h25v315z" fill="url(#city-windows)"/>
            <path d="M185 430V95h33V35h30v395z" fill="url(#city-windows)"/>
            <path d="M12 210h22m5-80h26m38 110h13m7-74h28M193 105h20" stroke="#c4c9cb" opacity=".5"/>
          </g>
        </svg>
      </div>
      <p className="technology-note">SEMPRE EXPLORANDO<br/>NOVAS TECNOLOGIAS<br/>E BUSCANDO<br/>EVOLUÇÃO CONSTANTE.</p>
    </section>
  );
}

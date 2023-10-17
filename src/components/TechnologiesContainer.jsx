import {
  DiHtml5,
  DiCss3,
  DiJavascript,
  DiNodejsSmall,
  DiMysql,
  DiReact,
  DiFirebase,
  DiMongodb,
  DiPhp
} from "react-icons/di";

import "../styles/components/technologies.sass"

const Tecnhologies =[
  {id: "html", name: "HTML5", icon: <DiHtml5/>, nivel: "Intermediário" },
  {id: "css", name: "CSS3", icon: <DiCss3/>, nivel: "Intermediário"},
  {id: "js", name: "JavaScript", icon: <DiJavascript/>, nivel: "Intermediário" },
  {id: "node", name: "Node.Js", icon: <DiNodejsSmall/>, nivel: "Intermediário" },
  {id: "mysql", name: "MySQL", icon: <DiMysql/>, nivel: "Intermediário" },
  {id: "react", name: "React.Js", icon: <DiReact/>, nivel: "Intermediário"},
  {id: "firebase", name: "Firebase", icon: <DiFirebase/>, nivel: "Intermediário"},
  {id: "mongodb", name: "MongoDB", icon: <DiMongodb/>, nivel: "Iniciante"},
  {id: "php", name: "PHP", icon: <DiPhp/>, nivel: "Intermediário"}
];

const TecnologiesContainer = () => {
  return (
    <section className="technologies">
      <h2>Tecnologias</h2>
      <div className="technologies-grid">
        {Tecnhologies.map((tech) => (
          <div className="tech-card" id={tech.id} key={tech.id}>
            {tech.icon}
            <div className="tech-info">
              <h3>{tech.name}</h3>
              <p>{tech.nivel}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default TecnologiesContainer

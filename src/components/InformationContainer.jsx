import { AiFillPhone, AiOutlineMail, AiFillEnvironment } from "react-icons/ai"

import "../styles/components/information.sass"

const InformationContainer = () => {
  return (
    <section id="information">
    <div className="info-card">
      <AiFillPhone id="phone-icon"/>
      <div>
        <h3>Telefone</h3>
        <p>+55 (18) 99724-9894</p>
      </div>
    </div>
    
    <div className="info-card">
      <AiOutlineMail id="mail-icon"/>
      <div>
        <h3>E-Mail</h3>
        <p>vini19ms@gmail.com</p>
      </div>
    </div>

    <div className="info-card">
      <AiFillEnvironment id="pin-icon"/>
      <div>
        <h3>Localização</h3>
        <p>Osvaldo Cruz | SP</p>
      </div>
    </div>
    </section>
  )
}

export default InformationContainer

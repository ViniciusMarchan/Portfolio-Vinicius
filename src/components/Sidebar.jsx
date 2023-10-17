import Avatar from "../img/eu.jpg";

import "../styles/components/sidebar.sass"
import InformationContainer from "./InformationContainer";
import SocialNetwork from "./SocialNetwork";

const Sidebar = () => {
  return (
    <aside id="sidebar">
        <img src={Avatar} alt="Vinicius Marcham" />
        <p className="title">Desenvolvedor Web</p>
        <SocialNetwork />
        <InformationContainer />
        <a href="https://drive.google.com/file/d/1-9zLWUhVVMwrYxmS9ahcJ4kGwehucYhb/view?usp=sharing"  className="btn">Download Curriculo</a>
    </aside>
  )
}

export default Sidebar

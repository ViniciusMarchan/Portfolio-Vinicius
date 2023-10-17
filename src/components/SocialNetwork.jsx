import { FaLinkedinIn, FaGithub, FaInstagram } from 'react-icons/fa';

import "../styles/components/socialnetworks.sass"

const socialNetwork = [
    {name: "linkedin", icon: <FaLinkedinIn/>, href: "https://www.linkedin.com/in/vinicius-marcham-da-silva-29a447218/"},
    {name: "github", icon: <FaGithub/>, href: "https://github.com/ViniciusMarchan"},
    {name: "instagram", icon: <FaInstagram/>, href: "https://www.instagram.com/viniciusms_dev/"}
];

const SocialNetwork = () => {
  return (
    <section id='social'>
      {socialNetwork.map((network) => (
        <a href={network.href} className='social-btn' id={network.name} key={network.name}>{network.icon}</a>
      ))}
    </section>
  )
}

export default SocialNetwork

import { useState, useEffect } from 'react'

import '../styles/components/gitcontainer.sass'

    function GitContainer() {

        const [repositories, setRepositories] = useState([]);

        useEffect( () => {
            fetch('https://api.github.com/users/ViniciusMarchan/repos')
            .then(response => response.json())
            .then(data => setRepositories(data))
        }, []);

        return(
            <section id="Git-Container">
               <h2>Projetos</h2>
                <div className='repositorios'>
                    {repositories.map((repository) => {
                        return(
                           <article key={repository.id}>
                                <div className='projects'>
                                <span className='titulo'>{repository.name}</span>
                                    <span className='description'>{repository.description}</span>
                                    <a href={repository.html_url} className='btn'>Ver Projeto</a>
                                    <hr />
                                </div>
                           </article>
                        )
                    })}
                </div>
            </section>
        )
    }

    export default GitContainer;
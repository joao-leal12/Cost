import Message from '../layout/Message'; 
import {useLocation} from 'react-router-dom'; 
import {useState, useEffect} from 'react'; 
import styles from './Projects.module.css'; 
import Container from '../layout/Container'; 
import LinkButton from '../layout/LinkButton';
import ProjectCard from './Project/ProjectCard';
import Loading from '../layout/Loading'


function Projects(){
    const [projects, setProjects] = useState([]); 
    const [removeLoading , setRemoveLoading] = useState(false); 
    const [messageDelete , setMessageDelete] = useState(''); 

    const location = useLocation(); 
    let message = ''; 

        if(location.state){
            message = location.state.message; 
        }
        useEffect(() => {
            setTimeout(() => {
                fetch('http://localhost:5000/project', {
                    methods: 'GET', 
                    headers: { 
                        'Content-type': 'application/json', 
                    }
                }).then(response => response.json()) 
                .then(data => {
                    setProjects(data)
                    setRemoveLoading(true); 
                   
                    
                })
                .catch(erro => console.log(erro)); 
            }, 300)
        

        }, [])

        function removeProject(id){ 

            fetch(`http://localhost:5000/project/${id}`, {
                method: 'DELETE', 
                headers: { 
                    'Content-Type': 'application/json'
                }
            }).then(response => response.json())
            .then(()=> {
                setProjects(projects.filter((project) => project.id != id))
                setMessageDelete('Projeto removido com sucesso!')
            })
            .catch(error => console.log(error)); 

        }
    return(
        <div className={styles.projectContainer}>
            <div className={styles.titleContainer}>
              <h1>Meus projetos</h1>
              <LinkButton to="./NewProject" text="Criar Projeto"/>
            </div>
            {message && <Message  type="success" msg={message} />}
            {messageDelete && <Message  type="success" msg={messageDelete} />}
            <Container customClass="start"> 
                {projects.length > 0 && 

                    projects.map(project => (
                         <ProjectCard 
                            name={project.name}
                            id={project.id}
                            budget={project.budget}
                            category={project.category?.name}
                            key={project.id} 
                            handleRemove={removeProject}
                         />      
                    ))} 
                    {!removeLoading && <Loading/>}
                    {removeLoading && projects.length === 0 && (
                        <p>Não há projetos cadastrados</p>
                    )}
            </Container> 
            
        </div> 

    )
} 


export default Projects;  
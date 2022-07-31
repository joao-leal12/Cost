
import styles from './newProject.module.css'; 
import ProjectForm from './Project/ProjectForm';
import {useNavigate} from 'react-router-dom'; 
function NewProject(){ 
  
    const navigate = useNavigate(); 
    function createPost(project){ 
        project.cost = 0; 
        project.services = []; 

        fetch("http://localhost:5000/project",{
            method: "POST", 
            body: JSON.stringify(project), 
            headers: {
                'Content-type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data =>{ 
            
            navigate('/projects', {state: {message: 'projeto criado com sucesss'}}) //hook do router para redirect  
        })
        .catch( erro => console.log(erro))
        
    }
    return( 
        <div className={styles.newProjectContainer}>
           
            <h1>Criar Projeto</h1>
            <p>Crie seu projeto para depois adicionar os serviços</p>
            <ProjectForm btnText="Criar Projeto" handleSubmit={createPost}/> 

        </div>
    )
}

 export default NewProject;  
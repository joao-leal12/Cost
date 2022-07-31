import {parse, v4 as uuidv4} from 'uuid'; 
import Loading from '../../layout/Loading';
import styles from './ProjectD.module.css'; 
import Container from '../../layout/Container'; 
import {useParams} from 'react-router-dom';
import {useState, useEffect} from 'react'; 
import ProjectForm from './ProjectForm' ;
import Message from '../../layout/Message'; 
import ServiceForm from '../../services/ServicesForm' 
import ServiceCard from '../../services/ServiceCard'; 

function Project(){ 
    const {id} = useParams() 
    const [showProject, setShowProject] = useState(false); 
    const [project, setProject] = useState([]); 
    const [message, setMessage] = useState(); 
    const [type, setType] = useState()
    const [servicesForm , setServicesForm] = useState(false);  
    const [services, setServices] = useState([])
    useEffect(() => { 
        setTimeout(()=> {
            fetch(`http://localhost:5000/project/${id}`, {
            method: 'GET', 
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            setProject(data)
            setServices(data.services)
        })
        .catch(erro => console.log('Deu erro', erro)) 
        
        }, 200)
    }, [id])

    function editPost(project){
        setMessage(''); 
        if(project.budget < project.cost){ 
            setMessage('O orçamento não pode ser menor que o custo do projeto!')
            setType('error'); 
            return false; 
        }
     
        fetch(`http://localhost:5000/project/${project.id}`, {
            method: 'PATCH', 
            headers: { 
                'Content-type': 'application/json', 
            }, 
            body: JSON.stringify(project)
            
        })
        .then(response => response.json())
        .then(data => {
            setProject(data); 
            setShowProject(!showProject);
            setMessage('Projeto atualizado');
            setType('success'); 
        }) 
        .catch(erro => console.log(erro)); 
    }

    function createService(project){ 
        setMessage(''); 
        const lastServices = project.services[project.services.length - 1] 
         
        lastServices.id = uuidv4()
        const lastServicesCost = lastServices.cost; 
        const newCost = parseFloat(project.cost) + parseFloat(lastServicesCost);  
        if(newCost > parseFloat(project.budget)){ 
            setMessage('Orçamento ultrapassado, verifique o valor do serviço') 
            setType('error') 
            project.services.pop(); 
            return false; 
        }
 
        project.cost = newCost;  
         fetch(`http://localhost:5000/project/${project.id}`, {
             method: 'PATCH', 
             headers: {
                 'Content-Type': 'application/json'
             }, 
             body: JSON.stringify(project)
            })
            .then(response => response.json())
            .then( data => setServicesForm(false) )
         .catch(erro => console.log(erro))


    }

    function removeService(id, cost){ 
        
        const servicesUpdated = project.services.filter(service => service.id !== id) 
        const projectUpdated = project  

        projectUpdated.services = servicesUpdated; 
        projectUpdated.cost = parseFloat(projectUpdated.cost) - parseFloat(cost); 
        
        fetch(`http://localhost:5000/project/${projectUpdated.id}`, {
            method: 'PATCH', 
            headers: { 
                'Content-type': 'application/json', 
            }, 
            body: JSON.stringify(projectUpdated)
        })
        .then(response => response.json())
        .then(data => { 
            setProject(projectUpdated); 
            setServices(servicesUpdated); 
            setMessage('Serviço removido com sucesso')
        })
        .catch(erro => console.log(erro))
    }

    function toggleProjectForm() {
        setShowProject(!showProject); 
    }
     
    function toggleServicesForm(){ 
        setServicesForm(!servicesForm); 
    }
    
    return(
        <>
           {project.name? (
            <div className={styles.projectDetails}>
                <Container customClass="column">
                    {message && <Message type={type} msg={message}/>}
                    <div className={styles.detailsContainer}>
                        <h1>Projeto: {project.name}</h1>
                        <button className={styles.btn} onClick={toggleProjectForm}>
                            {!showProject ? 'Editar Projeto' : 'Fechar'} 
                        </button>
                        {!showProject ? (
                            <div className={styles.projectInfo}> 
                               <p>
                                    <span>Categoria: </span> 
                                    {project.category.name}
                               </p>
                               <p>
                                 <span>Total de Orçamento: </span>
                                     R${project.budget}
                               </p>
                               <p>
                                 <span>Total utilizado: </span>
                                    R${project.cost} 
                               </p>
                            </div> 
                        ) : (
                            
                            <div className={styles.projectInfo}> 
                                <ProjectForm
                                 handleSubmit={editPost} 
                                 btnText="Concluir edição" 
                                 projectData={project}
                                 /> 
                            </div>
                        )}
                    </div>
                    <div className={styles.serviceFormContainer}>
                            <h2>Adicione um serviço</h2>
                            <button className={styles.btn} onClick={toggleServicesForm}>
                                {!servicesForm ? 'Adicionar Serviços' : 'Fechar'} 
                            </button>
                            <div className={styles.projectInfo}>
                               {servicesForm && (
                                <ServiceForm
                                    handleSubmit={createService}
                                    btnText="Adicionar serviço" 
                                    projectData={project} 
                                /> 
                               )}
                            </div>
                    </div>
                    <h2>Serviços</h2>
                    <Container customClass="start">
                            {services.length > 0 && services.map(service => ( 
                                
                                <ServiceCard
                                    id={service.id}
                                    name={service.name}
                                    cost={service.cost}
                                    description={service.description}
                                    key={service.id}
                                    handleRemove={removeService}
                                /> 
                                    
                            ))}
                                
                            {services.length == 0 && <p>Não há serviços cadastrados</p>}

                    </Container>
                </Container>
            </div>
           )
           : (<Loading/>
           )}
        </>
        
    )
} 


export default Project; 
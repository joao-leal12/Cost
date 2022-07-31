import styles from'../Pages/Project/Project.module.css'; 
import {useState} from 'react' ; 
import Input from '../form/Input'; 
import SubmitButton from '../form/submitButton';

function ServicesForm({handleSubmit, btnText, projectData}){ 
    const [service, setService ] = useState({})
    function Submit(e) {
        e.preventDefault(); 
        projectData.services.push(service); 
        handleSubmit(projectData)
    }
    function handleChange(e){ 
        setService({...service , [e.target.name]: e.target.value})
    }
    return (
        <form onSubmit={Submit} className={styles.form}>
            <Input 
                type="text" 
                text="Nome do serviço" 
                name="name" 
                placeholder="Insira o nome do serviço"
                handleOnchange={handleChange}
            />
             <Input 
                type="number" 
                text="Custo do serviço" 
                name="cost" 
                placeholder="Insira o valor total"
                handleOnchange={handleChange}
            />
             <Input 
                type="text" 
                text="Descrição do serviço" 
                name="description" 
                placeholder="Escreva o serviço"
                handleOnchange={handleChange}
            />
            
            <SubmitButton text={btnText}/> 
        </form>
    ) 
} 

export default ServicesForm; 
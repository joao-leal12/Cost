import {useEffect, useState} from 'react';
import styles from './Project.module.css'; 
import Input from '../../form/Input'; 
import Select from '../../form/Select'; 
import Button from '../../form/submitButton'
import call from '../../../calls/call'
function ProjectForm({handleSubmit, btnText, projectData}){

    const [categories, setCategories] = useState([])
    const [project, setProject] = useState(projectData || {})
         
         useEffect(() => {  
            call(setCategories)
            }, [])
        
        
        const submit = (e) => {
            e.preventDefault();     
            handleSubmit(project);  
        
        }

        function handleChange(e){ 
      
                 
          setProject({ ...project, [e.target.name]: e.target.value}); //Aparentemente foi usado o spread nessa desestruturação.. 
           
            
        }
        function handleCategory(e){ 
            
            
            setProject({
                ...project,
                category:{ 
                id: e.target.value, 
                name: e.target.options[e.target.selectedIndex].text,
            }
            } ); 
           
            console.log(project); 
          }
         
       
    return (
        <form onSubmit={submit}   className={styles.form}> 
           
            <Input 
                type="text" 
                text="Orçamento do projeto"  
                placeholder="Insira o nome do orçamento   "
                name="name" 
                handleOnchange={handleChange}
                value={project.name ? project.name : ''}
                /> 
            <Input 
                type="number" 
                text="Valor do Projeto"  
                placeholder="Insira aqui o valor do projeto"
                name="budget" 
                handleOnchange={handleChange}
                value={project.budget ? project.budget : ''} 
                /> 

            <Select 
                name="category_id" 
                text="Selecione a categoria" 
                options={categories} 
                handleOnchange={handleCategory}
                 value ={project.category ? project.category.id : ''}
                /> 
               
            <Button text={btnText} /> 
        </form>

    )

}


export default ProjectForm; 
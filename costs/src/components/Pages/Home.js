
import styles from './Home.module.css'; 
import Savings from '../../assets/saving.svg'
import LinkButton from '../layout/LinkButton'; 

function Home(){

    return(
        <section className={styles.homeContainer}> 
            <h1>Bem-Vindo ao <span>Costs</span></h1>
            <p>Comece a gerenciar os seus projetos agora mesmo!</p>
            <LinkButton to="./NewProject" text="Criar Projeto"/>
            <img src={Savings} alt="costs"/> 
        </section>
    )
} 


export default Home; 
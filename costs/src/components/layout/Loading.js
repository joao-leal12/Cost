import styles from './Loading.module.css'; 
import load from '../../assets/loading.svg'

function Loading(){ 

    return (
        <div className={styles.loaderContainer}>
            <img className={styles.loader} src={load} alt="loading..."/> 
        </div>
    )
} 

export default Loading; 
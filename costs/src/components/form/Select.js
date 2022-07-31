import styles from './Select.module.css'; 
function Select({text, name, options, handleOnchange, value }){
     
//Não entendi o porque de mudar o value do option com o value do select
     return(
         
         <div className={styles.formControl}>
              <label htmlFor={name}>{text}</label>
                <select 
                name={name} 
                id={name} 
                onChange={handleOnchange} 
                value={value||''}
               >
                    <option>Selecione uma opção</option>
                   {options.map((optionn) => (
                        <option value={optionn.id} key={optionn.id}>{optionn.name}</option>
                   ))}
                </select>
         </div>

    ) 
}


export default Select;   
import {Link} from 'react-router-dom'; 
import Container from './Container'; 
import style from './NavBar.module.css'; 
import logo from '../../assets/coinCost.png'; 
function NavBar(){ 

    return (
     <nav  className={style.navbar}>
        <Container>
            <Link to="/">
                <img src={logo} alt="Costs"/>
            </Link>
          
           <ul className={style.lista}>
                <li className={style.item}>
                    <Link to="/">
                        Home
                    </Link>
                </li>
                <li className={style.item}>
                    <Link to="/Projects">
                        Projetos
                    </Link>
                </li>
                <li className={style.item}>
                    <Link to="/Company">
                        Empresa
                    </Link>
                </li>
            
                <li className={style.item}>
                    <Link to="/Contato">
                        Contato
                    </Link>
                </li>
            </ul>
        </Container>
     </nav>

    )

} 


export default NavBar; 
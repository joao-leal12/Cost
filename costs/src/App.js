import {BrowserRouter as Router, Routes , Route, Link} from 'react-router-dom'; 
import Home from './components/Pages/Home'; 
import Company from './components/Pages/Company'; 
import Contato from './components/Pages/Contato'; 
import NewProject from './components/Pages/NewProject';  
import Projects from './components/Pages/Projects'
import Container from './components/layout/Container'; 
import NavBar from './components/layout/NavBar'; 
import Footer from './components/layout/Footer'; 
import Project from './components/Pages/Project/Project'; 

function App() {
  return (
   <Router> 
    <NavBar/> 
    <Container customClass="min-height"> 
      <Routes>
          <Route exact path="/" element={<Home/> }/>
          <Route  path="/Contato" element={<Contato/>}/>
          <Route  path="/Projects" element={<Projects/>}/>
          <Route  path="/Company" element={<Company/>}/>
          <Route  path="/NewProject" element={<NewProject/>}/>
          <Route  path="/Project/:id" element={<Project/>}/>
       
      </Routes>
    </Container>
    <Footer/>
   </Router>
  )
}

export default App;

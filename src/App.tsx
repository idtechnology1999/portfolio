import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './style/global.css';
import Navbar from './components/Navbar';
// import Hero from './components/Hero';
// import About from './components/About';
import Skills from './components/Skills';
import Team from './components/Team';
import Portfolio from './components/Portfolio';
// import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Dashboard from "./components/Admin/Dashboard";
import MyPortfolio from "./components/MyPortfolio";
import WebHero from "./components/WebHero"

const Home =()=>{
  return(
    <>
    <Navbar/> 
    <WebHero />
    {/* <About/> */}
    <Skills/>
    <Team/>
    <Portfolio/>
    <Contact/>
    <Footer/>
    </>
  )
}

const Admin =()=>{
return(
    <>
 <Dashboard/>
  </>
)
}




function App() {
  return (
    <>
 
<Router>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="Admin/*" element={<Admin />} />
    <Route path="/MyPortfolio" element={<MyPortfolio/>} />
  </Routes>
</Router>


    </>
  )
}

export default App

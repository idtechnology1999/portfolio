import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './style/global.css';
import './style/spacing.css';
import Navbar from './components/Navbar';
import About from './components/About';
import Skills from './components/Skills';
import Team from './components/Team';
import Portfolio from './components/Portfolio';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Dashboard from "./components/Admin/Dashboard";
import MyPortfolio from "./components/MyPortfolio";
import WebHero from "./components/WebHero";
import CoreValues from "./components/CoreValues";
import Services from "./components/Services";
import Stats from "./components/Stats";

const Home =()=>{
  return(
    <>
    <Navbar/> 
    <WebHero />
    <About/>
    <Services/>
    <CoreValues/>
    <Stats/>
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
    <Route path="/Admin/*" element={<Admin />} />
    <Route path="/MyPortfolio" element={<MyPortfolio/>} />
  </Routes>
</Router>


    </>
  )
}

export default App

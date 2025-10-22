
import './style/global.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
// import About from './components/About';
import Skills from './components/Skills';
import Team from './components/Team';
import Portfolio from './components/Portfolio';
// import Projects from './components/Projects';
// import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <>
    <Navbar/> 
    <Hero />
    {/* <About/> */}
    <Skills/>
    <Team/>
    <Portfolio/>
    <Footer/>
    
    </>
  )
}

export default App

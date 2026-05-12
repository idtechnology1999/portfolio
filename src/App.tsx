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
import QuizHome from "./pages/quiz/Home";
import Register from "./pages/quiz/Register";
import Login from "./pages/quiz/Login";
import Quiz from "./pages/quiz/Quiz";
import Result from "./pages/quiz/Result";
import QuizAdmin from "./pages/quiz/Admin";

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
    <Route path="/quiz" element={<QuizHome />} />
    <Route path="/quiz/register" element={<Register />} />
    <Route path="/quiz/login" element={<Login />} />
    <Route path="/quiz/take" element={<Quiz />} />
    <Route path="/quiz/result" element={<Result />} />
    <Route path="/quiz/admin" element={<QuizAdmin />} />
  </Routes>
</Router>
    </>
  )
}

export default App

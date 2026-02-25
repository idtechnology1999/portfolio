import { useState, useEffect } from 'react';
import './MyPortfolio.css';
import AOS from 'aos';
import 'aos/dist/aos.css';

const MyPortfolio = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-out'
    });

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      const sections = ['home', 'about', 'skills', 'experience', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const skills = [
    { name: "Full-Stack Development", level: 90, icon: "💻" },
    { name: "Computer Repair & Troubleshooting", level: 95, icon: "🔧" },
    { name: "Mobile App Development", level: 85, icon: "📱" },
    { name: "Microsoft Office Suite", level: 92, icon: "📊" },
    { name: "Leadership & Team Management", level: 88, icon: "👥" },
    { name: "Technical Training", level: 90, icon: "🎓" }
  ];

  const projects = [
    { title: "Vision Spark Website", description: "A sleek, responsive business website designed to showcase marketing solutions with modern design and fast performance.", link: "http://visionsparkmarketingsolution.com/", tags: ["Marketing", "Business"] },
    { title: "E-Library", description: "A modern, digital library platform for online academic resources and study materials, built with a clean dashboard interface.", link: "http://chrislewando.com/", tags: ["Education", "Platform"] },
    { title: "Computer Engineering Chatbot", description: "A smart chatbot system for Computer Engineering Department, built to automate student queries and department information.", link: "https://github.com/idtechnology1999/Department-Chatbot.git", tags: ["AI", "Education"] },
    { title: "Mama Bee's Kitchen", description: "Professional restaurant website with online menu, ordering system, and elegant design showcasing authentic Nigerian cuisine.", link: "https://mamabeeskitchen.com/", tags: ["Restaurant", "E-Commerce"] },
    { title: "Munat Tech", description: "Modern technology company website featuring IT solutions, software development services, and digital transformation consulting.", link: "https://munattech.online/", tags: ["Tech", "Business"] },
    { title: "5NJ Limited", description: "Corporate business website for a leading Nigerian company, featuring company profile and services portfolio.", link: "https://www.5njlimited.com/", tags: ["Corporate", "Business"] }
  ];

  return (
    <div className="portfolio">
      <div className="hero-bg">
        <div className="hero-shape shape-1"></div>
        <div className="hero-shape shape-2"></div>
      </div>

      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="container">
          <div className="nav-brand" onClick={() => scrollToSection('home')}>
            <div className="brand-icon">💼</div>
            <span className="brand-text">Owolabi</span>
          </div>
          <ul className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
            {['Home', 'About', 'Skills', 'Experience', 'Projects', 'Contact'].map((item) => (
              <li key={item}>
                <a href={`#${item.toLowerCase()}`} className={`nav-link ${activeSection === item.toLowerCase() ? 'active' : ''}`}
                  onClick={(e) => { e.preventDefault(); scrollToSection(item.toLowerCase()); }}>
                  {item}
                </a>
              </li>
            ))}
          </ul>
          <button className="mobile-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? '✕' : '☰'}
          </button>
        </div>
      </nav>

      <section id="home" className="hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-text" data-aos="fade-right">
              <div className="hero-badge">
                <span>🎯 Available for Opportunities</span>
              </div>
              <h1 className="hero-title">
                <span className="title-primary">Owolabi Idowu</span>
                <span className="title-gradient">Computer Engineer</span>
              </h1>
              <p className="hero-subtitle">Full-Stack Developer | Hardware Specialist | Tech Educator</p>
              <p className="hero-description">
                Passionate Computer Engineering graduate with hands-on experience in full-stack development, 
                hardware repair, and technical training. Ready to bring innovative solutions to your team.
              </p>
              <div className="hero-buttons">
                <button className="btn btn-primary" onClick={() => scrollToSection('experience')}>
                  View Experience →
                </button>
                <button className="btn btn-secondary" onClick={() => scrollToSection('contact')}>
                  Get In Touch ✉
                </button>
              </div>
              <div className="hero-social">
                <a href="mailto:owolabiidowu99@gmail.com" className="social-link">📧</a>
                <a href="tel:+2347086292944" className="social-link">📱</a>
              </div>
            </div>
            <div className="hero-image" data-aos="fade-left" data-aos-delay="200">
              <div className="image-wrapper">
                <div className="image-ring"></div>
                <div className="image-container">
                  <img src="/images/myimage.png" alt="Owolabi Idowu" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="about">
        <div className="container">
          <div className="section-header" data-aos="fade-up">
            <h2 className="section-title">About Me</h2>
            <div className="section-line"></div>
          </div>
          <div className="about-content">
            <div className="about-cards">
              <div className="about-card card-violet" data-aos="fade-right" data-aos-delay="100">
                <div className="card-icon">🎯</div>
                <h3 className="card-title">Career Objective</h3>
                <p className="card-text">
                  A passionate and self-motivated Computer Engineering graduate with hands-on experience in computer hardware repair, 
                  full-stack website development, and mobile app development. Eager to apply technical skills and creative solutions 
                  to real-world challenges.
                </p>
              </div>
              <div className="about-card card-cyan" data-aos="fade-right" data-aos-delay="200">
                <div className="card-icon">📍</div>
                <h3 className="card-title">Personal Info</h3>
                <p className="card-text">
                  <strong>Location:</strong> Ogbomosho, Oyo State, Nigeria<br/>
                  <strong>Date of Birth:</strong> February 2, 1999<br/>
                  <strong>Nationality:</strong> Nigerian
                </p>
              </div>
            </div>
            <div className="about-info">
              <div className="info-card" data-aos="fade-left" data-aos-delay="100">
                <div className="info-header">
                  <span>🎓</span>
                  <h4>Education</h4>
                </div>
                <p><strong>HND Computer Engineering Technology</strong> - The Polytechnic Ibadan (2021-2024)</p>
                <p><strong>ND Computer Engineering Technology</strong> - The Polytechnic Ibadan (2020-2021)</p>
              </div>
              <div className="stats" data-aos="fade-left" data-aos-delay="200">
                <div className="stat-item stat-violet">
                  <div className="stat-number">6+</div>
                  <div className="stat-label">Years Experience</div>
                </div>
                <div className="stat-item stat-cyan">
                  <div className="stat-number">5+</div>
                  <div className="stat-label">Organizations</div>
                </div>
                <div className="stat-item stat-fuchsia">
                  <div className="stat-number">100%</div>
                  <div className="stat-label">Dedication</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="skills" className="skills">
        <div className="container">
          <div className="section-header" data-aos="fade-up">
            <h2 className="section-title">Core Competencies</h2>
            <div className="section-line"></div>
          </div>
          <div className="skills-grid">
            {skills.map((skill, index) => (
              <div key={skill.name} className="skill-item" data-aos="fade-up" data-aos-delay={index * 100}>
                <div className="skill-header">
                  <div className="skill-info">
                    <div className="skill-icon">{skill.icon}</div>
                    <h3>{skill.name}</h3>
                  </div>
                  <span className="skill-percent">{skill.level}%</span>
                </div>
                <div className="skill-bar">
                  <div className="skill-progress" style={{ width: `${skill.level}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="experience" className="experience">
        <div className="container">
          <div className="section-header" data-aos="fade-up">
            <h2 className="section-title">Professional Experience</h2>
            <div className="section-line"></div>
          </div>
          <div className="experience-list">
            <div className="exp-item" data-aos="fade-up" data-aos-delay="100">
              <div className="exp-header">
                <div>
                  <h3 className="exp-title">NYSC Corps Member</h3>
                  <p className="exp-company">Digital World Tech Academy</p>
                </div>
                <span className="exp-date">Present</span>
              </div>
              <p className="exp-desc">Place of Primary Assignment</p>
            </div>
            <div className="exp-item" data-aos="fade-up" data-aos-delay="200">
              <div className="exp-header">
                <div>
                  <h3 className="exp-title">Industrial Training</h3>
                  <p className="exp-company">International Institute of Tropical Agriculture</p>
                </div>
                <span className="exp-date">2021 - 2022</span>
              </div>
            </div>
            <div className="exp-item" data-aos="fade-up" data-aos-delay="300">
              <div className="exp-header">
                <div>
                  <h3 className="exp-title">Tech Tutor</h3>
                  <p className="exp-company">Parch Computer Hub</p>
                </div>
                <span className="exp-date">2021</span>
              </div>
            </div>
            <div className="exp-item" data-aos="fade-up" data-aos-delay="400">
              <div className="exp-header">
                <div>
                  <h3 className="exp-title">SIWES Intern</h3>
                  <p className="exp-company">Nigerian Institute of Social and Economic Research (NISER)</p>
                </div>
                <span className="exp-date">2019 - 2020</span>
              </div>
            </div>
            <div className="exp-item" data-aos="fade-up" data-aos-delay="500">
              <div className="exp-header">
                <div>
                  <h3 className="exp-title">Computer Teacher/Operator</h3>
                  <p className="exp-company">The Vine Nur/Pry School Olorisa-oko Ibadan</p>
                </div>
                <span className="exp-date">2018</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="projects" className="projects">
        <div className="container">
          <div className="section-header" data-aos="fade-up">
            <h2 className="section-title">Featured Projects</h2>
            <div className="section-line"></div>
            <p className="section-description">A showcase of my recent work across various technologies</p>
          </div>
          <div className="projects-grid">
            {projects.map((project, index) => (
              <div key={index} className="project-card" data-aos="zoom-in" data-aos-delay={index * 100}>
                <div className="project-body">
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-description">{project.description}</p>
                  <div className="project-tags">
                    {project.tags.map((tag) => (
                      <span key={tag} className="project-tag">{tag}</span>
                    ))}
                  </div>
                  <a href={project.link} target="_blank" rel="noopener noreferrer" className="project-link">
                    View Project →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="contact">
        <div className="container">
          <div className="section-header" data-aos="fade-up">
            <h2 className="section-title">Let's Connect</h2>
            <div className="section-line"></div>
            <p className="section-description">Ready to collaborate on your next project</p>
          </div>
          <div className="contact-grid">
            <div className="contact-card card-violet" data-aos="flip-left" data-aos-delay="100">
              <span className="contact-icon">📧</span>
              <h3>Email</h3>
              <a href="mailto:owolabiidowu99@gmail.com">owolabiidowu99@gmail.com</a>
              <a href="mailto:owolabiidowu99@yahoo.com">owolabiidowu99@yahoo.com</a>
            </div>
            <div className="contact-card card-cyan" data-aos="flip-left" data-aos-delay="200">
              <span className="contact-icon">📱</span>
              <h3>Phone</h3>
              <a href="tel:+2347086292944">+234 708 629 2944</a>
              <a href="tel:+2348159548029">+234 815 954 8029</a>
            </div>
            <div className="contact-card card-fuchsia" data-aos="flip-left" data-aos-delay="300">
              <span className="contact-icon">📍</span>
              <h3>Location</h3>
              <p>Ogbomosho, Oyo State, Nigeria</p>
            </div>
          </div>
          <div className="contact-cta" data-aos="fade-up" data-aos-delay="400">
            <button className="btn btn-primary" onClick={() => window.location.href = 'mailto:owolabiidowu99@gmail.com'}>
              Send Message ✉
            </button>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="container">
          <p>&copy; 2025 Owolabi Idowu. All rights reserved.</p>
          <p className="footer-subtitle">Computer Engineering Technology | Full-Stack Developer</p>
        </div>
      </footer>
    </div>
  );
};

export default MyPortfolio;

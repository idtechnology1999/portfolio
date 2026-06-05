import { useState, useEffect, useRef } from 'react';
import './MyPortfolio.css';
import AOS from 'aos';
import 'aos/dist/aos.css';

import {
  FaGithub, FaEnvelope, FaPhone, FaMapMarkerAlt, FaGraduationCap,
  FaCode, FaMobileAlt, FaTools, FaUsers, FaChalkboardTeacher,
  FaGlobe, FaRocket, FaRobot, FaLaptopCode, FaServer,
} from 'react-icons/fa';
import { MdLocationOn, MdSchool } from 'react-icons/md';

const ROLES = [
  'Full-Stack Developer',
  'Backend Engineer',
  'Website Developer',
  'Mobile App Developer',
  'Hardware Specialist',
  'Tech Educator',
];

const MyPortfolio = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const [displayRole, setDisplayRole] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [roleIndex, setRoleIndex] = useState(0);
  const typingRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const current = ROLES[roleIndex];
    const speed = isDeleting ? 40 : 90;

    typingRef.current = setTimeout(() => {
      if (!isDeleting) {
        setDisplayRole(current.slice(0, displayRole.length + 1));
        if (displayRole.length + 1 === current.length) {
          setTimeout(() => setIsDeleting(true), 1800);
        }
      } else {
        setDisplayRole(current.slice(0, displayRole.length - 1));
        if (displayRole.length - 1 === 0) {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % ROLES.length);
        }
      }
    }, speed);

    return () => { if (typingRef.current) clearTimeout(typingRef.current); };
  }, [displayRole, isDeleting, roleIndex]);

  useEffect(() => {
    AOS.init({ duration: 900, once: true, easing: 'ease-out-cubic' });

    const handleScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(total > 0 ? (window.scrollY / total) * 100 : 0);
      setScrolled(window.scrollY > 50);

      const sections = ['home', 'about', 'services', 'skills', 'experience', 'projects', 'contact'];
      const current = sections.find(id => {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.pageYOffset - 80, behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  const skills = [
    { name: 'Full-Stack Development',        level: 90, Icon: FaCode },
    { name: 'Mobile App Development',         level: 85, Icon: FaMobileAlt },
    { name: 'Computer Repair & Troubleshooting', level: 95, Icon: FaTools },
    { name: 'Microsoft Office Suite',         level: 92, Icon: FaLaptopCode },
    { name: 'Leadership & Team Management',   level: 88, Icon: FaUsers },
    { name: 'Technical Training',             level: 90, Icon: FaChalkboardTeacher },
  ];

  const techStack = [
    { category: 'Frontend',  techs: ['React', 'TypeScript', 'HTML5', 'CSS3', 'Tailwind CSS'] },
    { category: 'Backend',   techs: ['Node.js', 'Express.js', 'REST APIs', 'Python'] },
    { category: 'Mobile',    techs: ['React Native', 'Expo', 'Android'] },
    { category: 'Database',  techs: ['MongoDB', 'MySQL', 'AsyncStorage'] },
    { category: 'Tools',     techs: ['Git', 'GitHub', 'VS Code', 'Postman', 'Figma'] },
  ];

  const services = [
    {
      Icon: FaGlobe,
      title: 'Web Development',
      description: 'Full-stack web applications built with React on the frontend and Node.js/Express on the backend. Clean, fast, and scalable.',
      tags: ['React', 'Node.js', 'MongoDB'],
    },
    {
      Icon: FaMobileAlt,
      title: 'Mobile App Development',
      description: 'Cross-platform mobile apps using React Native & Expo — from student portals to research platforms, delivered on iOS & Android.',
      tags: ['React Native', 'Expo', 'REST API'],
    },
    {
      Icon: FaTools,
      title: 'Hardware & IT Support',
      description: 'Computer hardware diagnosis, repair, and maintenance. Networking setup, OS installation, and IT support for individuals and organisations.',
      tags: ['Hardware Repair', 'Networking', 'IT Support'],
    },
  ];

  const allProjects = [
    {
      title: 'I-Shelf App',
      description: 'A collaborative digital platform that brings researchers, authors, and students together — enabling seamless sharing of academic resources, research papers, and study materials.',
      link: 'https://github.com/idtechnology1999',
      tags: ['React Native', 'Node.js', 'MongoDB', 'Expo'],
      type: 'mobile', badge: 'Mobile App', highlight: true,
    },
    {
      title: 'IDTECH Academy App',
      description: 'Full-featured mobile application for IDTECH Real World Academy. Students track online classes, monitor payment records, and view course progress in real time.',
      link: 'https://github.com/idtechnology1999',
      tags: ['React Native', 'Expo', 'Node.js', 'MongoDB'],
      type: 'mobile', badge: 'Mobile App', highlight: true,
    },
    {
      title: 'Vision Spark Website',
      description: 'Sleek, responsive business website showcasing marketing solutions with modern design and fast performance.',
      link: 'http://visionsparkmarketingsolution.com/',
      tags: ['React', 'Node.js', 'CSS'],
      type: 'web', badge: 'Web App',
    },
    {
      title: 'E-Library',
      description: 'Modern digital library platform for online academic resources and study materials, with a clean dashboard interface.',
      link: 'http://chrislewando.com/',
      tags: ['React', 'Node.js', 'MongoDB'],
      type: 'web', badge: 'Web App',
    },
    {
      title: 'Computer Engineering Chatbot',
      description: 'Smart chatbot for a Computer Engineering Department — automates student queries and delivers department information instantly.',
      link: 'https://github.com/idtechnology1999/Department-Chatbot.git',
      tags: ['Python', 'NLP', 'React'],
      type: 'ai', badge: 'AI / Bot',
    },
    {
      title: "Mama Bee's Kitchen",
      description: 'Professional restaurant website with online menu, ordering system, and elegant design showcasing authentic Nigerian cuisine.',
      link: 'https://mamabeeskitchen.com/',
      tags: ['React', 'Node.js', 'E-Commerce'],
      type: 'web', badge: 'Web App',
    },
    {
      title: 'Munat Tech',
      description: 'Technology company website featuring IT solutions, software development services, and digital transformation consulting.',
      link: 'https://munattech.online/',
      tags: ['React', 'JavaScript', 'CSS'],
      type: 'web', badge: 'Web App',
    },
    {
      title: '5NJ Limited',
      description: 'Corporate business website for a leading Nigerian company — company profile, services portfolio, and contact management.',
      link: 'https://www.5njlimited.com/',
      tags: ['React', 'CMS', 'Business'],
      type: 'web', badge: 'Web App',
    },
  ];

  const [activeFilter, setActiveFilter] = useState('all');
  const filters = [
    { key: 'all',    label: 'All Projects' },
    { key: 'mobile', label: 'Mobile' },
    { key: 'web',    label: 'Web' },
    { key: 'ai',     label: 'AI' },
  ];
  const projects = activeFilter === 'all' ? allProjects : allProjects.filter(p => p.type === activeFilter);

  const typeIcon = (type: string) => {
    if (type === 'mobile') return <FaMobileAlt />;
    if (type === 'ai')     return <FaRobot />;
    return <FaGlobe />;
  };

  return (
    <div className="portfolio">
      <div className="scroll-progress" style={{ width: `${scrollProgress}%` }} />

      <div className="hero-bg">
        <div className="hero-shape shape-1"></div>
        <div className="hero-shape shape-2"></div>
        <div className="hero-shape shape-3"></div>
      </div>

      {/* NAV */}
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="container">
          <div className="nav-brand" onClick={() => scrollToSection('home')}>
            <div className="brand-icon">OI</div>
            <span className="brand-text">Owolabi</span>
          </div>
          <ul className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
            {['Home', 'About', 'Services', 'Skills', 'Experience', 'Projects', 'Contact'].map((item) => (
              <li key={item}>
                <a href={`#${item.toLowerCase()}`}
                  className={`nav-link ${activeSection === item.toLowerCase() ? 'active' : ''}`}
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

      {/* HERO */}
      <section id="home" className="hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-text" data-aos="fade-right">
              <div className="hero-badge">
                <span className="badge-dot"></span>
                Available for Opportunities
              </div>
              <h1 className="hero-title">
                <span className="title-primary">Owolabi Idowu</span>
                <span className="title-typed">{displayRole}<span className="cursor">|</span></span>
              </h1>
              <p className="hero-description">
                Computer Engineering graduate who builds things — full-stack web platforms,
                cross-platform mobile apps, and hardware solutions. I take ideas from concept
                to a working product.
              </p>
              <div className="hero-buttons">
                <button className="btn btn-primary" onClick={() => scrollToSection('projects')}>
                  View My Work <FaRocket />
                </button>
                <button className="btn btn-secondary" onClick={() => scrollToSection('contact')}>
                  Hire Me <FaEnvelope />
                </button>
              </div>
              <div className="hero-social">
                <a href="mailto:owolabiidowu99@gmail.com" className="social-link" title="Email">
                  <FaEnvelope />
                </a>
                <a href="tel:+2347086292944" className="social-link" title="Call">
                  <FaPhone />
                </a>
                <a href="https://github.com/idtechnology1999" target="_blank" rel="noopener noreferrer" className="social-link" title="GitHub">
                  <FaGithub />
                </a>
              </div>
            </div>
            <div className="hero-image" data-aos="fade-left" data-aos-delay="200">
              <div className="image-wrapper">
                <div className="image-ring"></div>
                <div className="image-container">
                  <img src="/images/myimage.png" alt="Owolabi Idowu" />
                </div>
                <div className="image-float image-float-1"><FaMobileAlt style={{marginRight:'5px'}}/> React Native</div>
                <div className="image-float image-float-2"><FaServer style={{marginRight:'5px'}}/> Node.js</div>
                <div className="image-float image-float-3"><FaCode style={{marginRight:'5px'}}/> MongoDB</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="about">
        <div className="container">
          <div className="section-header" data-aos="fade-up">
            <span className="section-tag">Who I Am</span>
            <h2 className="section-title">About Me</h2>
            <div className="section-line"></div>
          </div>
          <div className="about-content">
            <div className="about-cards">
              <div className="about-card card-orange" data-aos="fade-right" data-aos-delay="100">
                <div className="card-icon"><FaRocket /></div>
                <h3 className="card-title">Career Objective</h3>
                <p className="card-text">
                  A self-motivated Computer Engineering graduate with proven experience building full-stack web
                  applications, cross-platform mobile apps, and hardware solutions. Eager to apply deep technical
                  skills and a product-oriented mindset to real-world engineering challenges.
                </p>
              </div>
              <div className="about-card card-yellow" data-aos="fade-right" data-aos-delay="200">
                <div className="card-icon"><MdLocationOn /></div>
                <h3 className="card-title">Personal Info</h3>
                <p className="card-text">
                  <strong>Location:</strong> Ogbomosho, Oyo State, Nigeria<br />
                  <strong>Date of Birth:</strong> February 2, 1999<br />
                  <strong>Nationality:</strong> Nigerian
                </p>
              </div>
            </div>
            <div className="about-info">
              <div className="info-card" data-aos="fade-left" data-aos-delay="100">
                <div className="info-header">
                  <MdSchool className="info-icon" />
                  <h4>Education</h4>
                </div>
                <div className="edu-item">
                  <strong>HND Computer Engineering Technology</strong>
                  <span>The Polytechnic Ibadan · 2021–2024</span>
                </div>
                <div className="edu-item">
                  <strong>ND Computer Engineering Technology</strong>
                  <span>The Polytechnic Ibadan · 2020–2021</span>
                </div>
              </div>
              <div className="stats" data-aos="fade-left" data-aos-delay="200">
                <div className="stat-item stat-orange">
                  <div className="stat-number">6+</div>
                  <div className="stat-label">Years Exp.</div>
                </div>
                <div className="stat-item stat-yellow">
                  <div className="stat-number">8+</div>
                  <div className="stat-label">Projects</div>
                </div>
                <div className="stat-item stat-green">
                  <div className="stat-number">100%</div>
                  <div className="stat-label">Dedication</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="services">
        <div className="container">
          <div className="section-header" data-aos="fade-up">
            <span className="section-tag">What I Do</span>
            <h2 className="section-title">Services</h2>
            <div className="section-line"></div>
            <p className="section-description">End-to-end solutions across web, mobile, and hardware</p>
          </div>
          <div className="services-grid">
            {services.map((s, i) => (
              <div key={i} className="service-card" data-aos="fade-up" data-aos-delay={i * 120}>
                <div className="service-icon"><s.Icon /></div>
                <h3 className="service-title">{s.title}</h3>
                <p className="service-desc">{s.description}</p>
                <div className="service-tags">
                  {s.tags.map(t => <span key={t} className="service-tag">{t}</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" className="skills">
        <div className="container">
          <div className="section-header" data-aos="fade-up">
            <span className="section-tag">Expertise</span>
            <h2 className="section-title">Core Competencies</h2>
            <div className="section-line"></div>
          </div>
          <div className="skills-grid">
            {skills.map((skill, index) => (
              <div key={skill.name} className="skill-item" data-aos="fade-up" data-aos-delay={index * 80}>
                <div className="skill-header">
                  <div className="skill-info">
                    <div className="skill-icon"><skill.Icon /></div>
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

          <div className="tech-stack" data-aos="fade-up" data-aos-delay="200">
            <h3 className="tech-stack-title">Technologies I Work With</h3>
            <div className="tech-categories">
              {techStack.map((cat, i) => (
                <div key={i} className="tech-category">
                  <span className="tech-category-label">{cat.category}</span>
                  <div className="tech-pills">
                    {cat.techs.map(t => <span key={t} className="tech-pill">{t}</span>)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="experience" className="experience">
        <div className="container">
          <div className="section-header" data-aos="fade-up">
            <span className="section-tag">Career</span>
            <h2 className="section-title">Professional Experience</h2>
            <div className="section-line"></div>
          </div>
          <div className="timeline">
            {[
              { title: 'NYSC Corps Member', company: 'Digital World Tech Academy', date: 'Present', desc: 'Place of Primary Assignment — delivering computer skills training and supporting tech infrastructure.' },
              { title: 'Industrial Training', company: 'International Institute of Tropical Agriculture (IITA)', date: '2021 – 2022', desc: '' },
              { title: 'Tech Tutor', company: 'Parch Computer Hub', date: '2021', desc: '' },
              { title: 'SIWES Intern', company: 'Nigerian Institute of Social and Economic Research (NISER)', date: '2019 – 2020', desc: '' },
              { title: 'Computer Teacher / Operator', company: 'The Vine Nursery & Primary School, Ibadan', date: '2018', desc: '' },
            ].map((exp, i) => (
              <div key={i} className="timeline-item" data-aos="fade-up" data-aos-delay={i * 100}>
                <div className="timeline-marker">
                  <div className="timeline-dot"></div>
                  <div className="timeline-line"></div>
                </div>
                <div className="timeline-body">
                  <div className="timeline-header">
                    <div>
                      <h3 className="exp-title">{exp.title}</h3>
                      <p className="exp-company">{exp.company}</p>
                    </div>
                    <span className="exp-date">{exp.date}</span>
                  </div>
                  {exp.desc && <p className="exp-desc">{exp.desc}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="projects">
        <div className="container">
          <div className="section-header" data-aos="fade-up">
            <span className="section-tag">Portfolio</span>
            <h2 className="section-title">Featured Projects</h2>
            <div className="section-line"></div>
            <p className="section-description">Web platforms, mobile apps, and AI tools — built end to end</p>
          </div>

          <div className="project-filters" data-aos="fade-up">
            {filters.map(f => (
              <button key={f.key}
                className={`filter-btn ${activeFilter === f.key ? 'filter-btn--active' : ''}`}
                onClick={() => setActiveFilter(f.key)}>
                {f.key === 'mobile' && <FaMobileAlt />}
                {f.key === 'web'    && <FaGlobe />}
                {f.key === 'ai'     && <FaRobot />}
                {f.key === 'all'    && <FaCode />}
                {f.label}
              </button>
            ))}
          </div>

          <div className="projects-grid">
            {projects.map((project, index) => (
              <div key={project.title}
                className={`project-card ${project.highlight ? 'project-card--featured' : ''}`}
                data-aos="zoom-in" data-aos-delay={index * 70}>
                <div className={`project-card-top project-card-top--${project.type}`}>
                  <span className="project-type-badge">
                    {typeIcon(project.type)} {project.badge}
                  </span>
                  {project.highlight && <span className="project-featured-label">Featured</span>}
                </div>
                <div className="project-body">
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-description">{project.description}</p>
                  <div className="project-tags">
                    {project.tags.map(tag => <span key={tag} className="project-tag">{tag}</span>)}
                  </div>
                  <a href={project.link} target="_blank" rel="noopener noreferrer" className="project-link">
                    {project.type === 'mobile' ? 'View on GitHub' : 'View Project'} →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="contact">
        <div className="container">
          <div className="section-header" data-aos="fade-up">
            <span className="section-tag">Get In Touch</span>
            <h2 className="section-title">Let's Connect</h2>
            <div className="section-line"></div>
            <p className="section-description">Open to full-time roles, freelance projects, and collaborations</p>
          </div>
          <div className="contact-grid">
            <div className="contact-card card-orange" data-aos="flip-left" data-aos-delay="100">
              <span className="contact-icon"><FaEnvelope /></span>
              <h3>Email</h3>
              <a href="mailto:owolabiidowu99@gmail.com">owolabiidowu99@gmail.com</a>
              <a href="mailto:owolabiidowu99@yahoo.com">owolabiidowu99@yahoo.com</a>
            </div>
            <div className="contact-card card-yellow" data-aos="flip-left" data-aos-delay="200">
              <span className="contact-icon"><FaPhone /></span>
              <h3>Phone</h3>
              <a href="tel:+2347086292944">+234 708 629 2944</a>
              <a href="tel:+2348159548029">+234 815 954 8029</a>
            </div>
            <div className="contact-card card-green" data-aos="flip-left" data-aos-delay="300">
              <span className="contact-icon"><FaMapMarkerAlt /></span>
              <h3>Location</h3>
              <p>Ogbomosho, Oyo State</p>
              <p>Nigeria</p>
            </div>
          </div>
          <div className="contact-cta" data-aos="fade-up" data-aos-delay="400">
            <button className="btn btn-primary btn-lg" onClick={() => window.location.href = 'mailto:owolabiidowu99@gmail.com'}>
              Send Me a Message <FaEnvelope />
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="container">
          <div className="footer-inner">
            <div className="nav-brand">
              <div className="brand-icon brand-icon--sm">OI</div>
              <span className="brand-text footer-brand-text">Owolabi Idowu</span>
            </div>
            <div className="footer-links">
              {['About', 'Services', 'Projects', 'Contact'].map(item => (
                <a key={item} href={`#${item.toLowerCase()}`}
                  onClick={(e) => { e.preventDefault(); scrollToSection(item.toLowerCase()); }}>
                  {item}
                </a>
              ))}
            </div>
            <div className="footer-social">
              <a href="mailto:owolabiidowu99@gmail.com" title="Email"><FaEnvelope /></a>
              <a href="https://github.com/idtechnology1999" target="_blank" rel="noopener noreferrer" title="GitHub"><FaGithub /></a>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2025 Owolabi Idowu · Computer Engineer · Full-Stack &amp; Mobile Developer</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MyPortfolio;

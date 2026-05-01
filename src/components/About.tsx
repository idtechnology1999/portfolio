import { useEffect, useRef, useState } from "react";
import "./About.css";
import QuoteCarousel from "./QuoteCarousel";

import companyImg from "../assets/images/imgheros2.png";

const digitalSol = "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80";
const techTrain = "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80";
const mobileApp = "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&q=80";

const stats = [
  { value: 50, label: "Projects Delivered", icon: "bi-rocket-takeoff-fill" },
  { value: 200, label: "Students Trained", icon: "bi-mortarboard-fill" },
  { value: 30, label: "Satisfied Clients", icon: "bi-people-fill" },
  { value: 5, label: "Years of Excellence", icon: "bi-award-fill" },
];

const services = [
  {
    title: "Digital Solutions",
    desc: "We design and build powerful web and mobile applications that help businesses and individuals thrive in the digital economy.",
    icon: "bi-laptop",
    image: digitalSol,
    color: "#FF8C00",
  },
  {
    title: "Tech Training",
    desc: "We empower graduates and undergraduates with hands-on skills in web and mobile app development — turning learners into real-world problem solvers.",
    icon: "bi-mortarboard",
    image: techTrain,
    color: "#FFA500",
  },
  {
    title: "Mobile App Development",
    desc: "From concept to launch, we craft intuitive, high-performance mobile apps for both Android and iOS platforms.",
    icon: "bi-phone",
    image: mobileApp,
    color: "#E67E00",
  },
];

const values = [
  { icon: "bi-lightbulb-fill", title: "Innovation", desc: "Pioneering creative solutions for tomorrow's challenges." },
  { icon: "bi-people-fill", title: "Community", desc: "Building a generation of empowered, tech-savvy professionals." },
  { icon: "bi-shield-check", title: "Integrity", desc: "Delivering quality with full transparency and trust." },
  { icon: "bi-graph-up-arrow", title: "Growth", desc: "Committed to continuous learning and measurable improvement." },
];

function CountUp({ target }: { target: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          let current = 0;
          const step = Math.ceil(target / 60);
          const timer = setInterval(() => {
            current += step;
            if (current >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(current);
            }
          }, 30);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref}>{count}</span>;
}

export default function About() {
  return (
    <section id="about" className="about-section">

      {/* ── COMBINED HERO: ABOUT + OUR STORY ── */}
      <div className="about-hero" data-aos="fade-up">
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-lg-6" data-aos="fade-right" data-aos-delay="100">
              <div className="about-img-wrapper">
                <img
                  src={companyImg}
                  alt="IDTECH Real World Innovations"
                  className="about-main-image img-fluid"
                />
                <div className="about-img-badge">
                  <i className="bi bi-patch-check-fill"></i>
                  <span>Trusted Tech Company</span>
                </div>
              </div>
            </div>

            <div className="col-lg-6" data-aos="fade-left" data-aos-delay="200">
              <span className="about-badge">WHO WE ARE</span>
              <h2 className="about-hero-title">
                About <span className="text-orange">IDTECH</span>
              </h2>
              <p className="about-hero-subtitle">Real World Innovations</p>
              <div className="about-divider"></div>
              
              <p className="about-hero-text">
                <strong>IDTECH Real World Innovations</strong> is a forward-thinking
                technology company dedicated to providing cutting-edge digital
                solutions to businesses and individuals. We bridge the gap between
                innovative ideas and real-world execution.
              </p>
              <p className="about-hero-text">
                Beyond building products, we invest in the future — training
                students, both graduates and undergraduates, in practical tech
                skills such as web and mobile app development. We empower the next
                generation to become confident problem-solvers in their
                environments.
              </p>
              <div className="about-tags d-flex flex-wrap gap-2 mt-4">
                {[
                  "Web Development",
                  "Mobile Apps",
                  "Tech Training",
                  "UI/UX Design",
                  "Backend Engineering",
                ].map((tag, i) => (
                  <span key={i} className="about-tag">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── STATS STRIP ── */}
      <div className="about-stats-strip" data-aos="fade-up">
        <div className="container">
          <div className="row justify-content-center text-center g-4">
            {stats.map((s, i) => (
              <div className="col-6 col-md-3" key={i}>
                <div className="stat-card">
                  <i className={`bi ${s.icon} stat-icon`}></i>
                  <h3 className="stat-number">
                    <CountUp target={s.value} />+
                  </h3>
                  <p className="stat-label">{s.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── WHAT WE DO ── */}
      <div className="container about-services">
        <div className="text-center mb-5" data-aos="fade-up">
          <span className="about-badge">Our Expertise</span>
          <h3 className="section-title">
            What We <span className="text-orange">Do</span>
          </h3>
          <p className="section-sub">
            From digital products to tech education — we deliver excellence at every step.
          </p>
        </div>
        <div className="row g-4 justify-content-center">
          {services.map((svc, i) => (
            <div
              className="col-md-4"
              key={i}
              data-aos="zoom-in"
              data-aos-delay={i * 120}
            >
              <div className="service-card">
                <div className="service-image-wrap">
                  <img
                    src={svc.image}
                    alt={svc.title}
                    className="service-image"
                  />
                  <i className={`bi ${svc.icon} service-icon`}></i>
                </div>
                <div className="service-body">
                  <h5 className="service-title">{svc.title}</h5>
                  <p className="service-desc">{svc.desc}</p>
                  <a href="#contact" className="service-link">
                    Learn More <i className="bi bi-arrow-right"></i>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── ANIMATED QUOTE CAROUSEL ── */}
      <QuoteCarousel />

      {/* ── CORE VALUES ── */}
      <div className="about-values-strip">
        <div className="container" data-aos="fade-up">
          <div className="text-center mb-5">
            <span className="about-badge light">Our Foundation</span>
            <h3 className="section-title white">
              Core <span className="text-yellow">Values</span>
            </h3>
          </div>
          <div className="row g-4 justify-content-center">
            {values.map((v, i) => (
              <div
                className="col-6 col-md-3"
                key={i}
                data-aos="fade-up"
                data-aos-delay={i * 100}
              >
                <div className="value-card text-center">
                  <div className="value-icon-wrap">
                    <i className={`bi ${v.icon}`}></i>
                  </div>
                  <h6 className="value-title">{v.title}</h6>
                  <p className="value-desc">{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── CTA ── */}
      <div className="about-cta text-center" data-aos="zoom-in">
        <div className="container">
          <div className="cta-inner">
            <span className="about-badge">Let's Collaborate</span>
            <h3 className="cta-title">Ready to Work With Us?</h3>
            <p className="cta-sub">
              Whether you need a digital solution or want to enrol in our training
              programme — we're here for you.
            </p>
            <div className="d-flex gap-3 justify-content-center flex-wrap">
              <a href="#contact" className="btn cta-btn-primary">
                <i className="bi bi-envelope-fill me-2"></i>Get In Touch
              </a>
              <a href="#projects" className="btn cta-btn-outline">
                <i className="bi bi-window-stack me-2"></i>View Our Work
              </a>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}

import { useEffect, useState } from "react";
import "./Hero.css";
import companyImage from "../assets/images/imgheros1.png";

export default function Hero() {
  const skills = [
    "HTML", "CSS", "JavaScript", "Bootstrap",
    "React", "React Native", "PHP",
    "Node.js", "Python",
    "MongoDB", "MySQL"
  ];

  const fullSubtitle = "Real World Innovations";
  const [subtitle, setSubtitle] = useState("");
  const [typing, setTyping] = useState(true); // true = typing, false = deleting

  useEffect(() => {
    const icons = document.querySelectorAll<HTMLElement>(".floating-icon");
    icons.forEach((icon) => {
      const top = Math.random() * 90;
      const left = Math.random() * 90;
      icon.style.top = `${top}%`;
      icon.style.left = `${left}%`;

      const duration = 20 + Math.random() * 15;
      const delay = Math.random() * 5;
      icon.style.animationDuration = `${duration}s`;
      icon.style.animationDelay = `${delay}s`;
    });

    let index = 0;
    let deletingIndex = fullSubtitle.length;

    const loopTyping = setInterval(() => {
      if (typing) {
        // Typing phase
        setSubtitle(fullSubtitle.slice(0, index + 1));
        index++;
        if (index === fullSubtitle.length) {
          setTyping(false); // switch to deleting
        }
      } else {
        // Deleting phase
        setSubtitle(fullSubtitle.slice(0, deletingIndex - 1));
        deletingIndex--;
        if (deletingIndex === 0) {
          index = 0;
          deletingIndex = fullSubtitle.length;
          setTyping(true); // switch to typing again
        }
      }
    }, 120); // speed per letter

    return () => clearInterval(loopTyping);
  }, [typing]);

  return (
    <section
      id="hero"
      className="d-flex align-items-center position-relative"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #1a1f3a 0%, #2a3150 100%)",
        color: "#fff",
        overflow: "hidden",
        margin: 0,
        padding: 0,
      }}
    >
      <div className="container">
        <div className="row align-items-center justify-content-center text-center text-lg-start" style={{ height: "100%" }}>

          {/* Company Image */}
          <div
            className="col-12 col-lg-6 order-1 order-lg-2 d-flex align-items-center justify-content-center mb-4 mb-lg-0"
            data-aos="fade-left"
            data-aos-delay="400"
          >
<img
  src={companyImage}
  alt="ID TECH Real World Innovations"
  className="img-fluid hero-image"
/>
          </div>

          {/* Company Text */}
          <div className="col-12 col-lg-6 order-2 order-lg-1" data-aos="fade-up">
            <div className="hero-text">
              <h1 style={{ color: "#fff", fontWeight: "700", fontSize: "3rem" }}>ID TECH</h1>
              <h3 style={{ color: "#FFA500", fontWeight: "700", fontSize: "1.8rem", marginBottom: "1.5rem" }}>
                {subtitle}
                <span className="blinking-cursor">|</span>
              </h3>

              <p style={{ color: "#b8bcc8", fontSize: "1.1rem", lineHeight: "1.6" }} className="mb-4">
                Delivering Innovative Technology Solutions — Web & Mobile Applications
              </p>

              {/* Tech Stack */}
             {/* Tech Stack */}
              <div className="d-flex flex-wrap justify-content-center justify-content-lg-start gap-2 mb-4">
                {skills.map((skill, idx) => (
                  <span
                    key={idx}
                    style={{
                      padding: "6px 15px",
                      borderRadius: "25px",
                      backgroundColor: "rgba(255, 165, 0, 0.15)",
                      color: "#fff",
                      fontWeight: "500",
                      fontSize: "0.9rem",
                      border: "1px solid rgba(255, 165, 0, 0.3)"
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>

              {/* Buttons */}
              <div className="d-flex flex-column flex-sm-row justify-content-center justify-content-lg-start gap-3">
                <a
                  href="#projects"
                  className="btn"
                  style={{
                    backgroundColor: "#FF8C00",
                    color: "#fff",
                    borderRadius: "30px",
                    padding: "10px 25px",
                    fontWeight: "500",
                    transition: "0.3s"
                  }}
                >
                  Our Projects
                </a>
                <a
                  href="#contact"
                  className="btn"
                  style={{
                    backgroundColor: "#FFA500",
                    color: "#fff",
                    borderRadius: "30px",
                    padding: "10px 25px",
                    fontWeight: "500",
                    transition: "0.3s"
                  }}
                >
                  Contact Us
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Floating Tech Icons */}
        <div className="floating-icons">
          {[
            "html5", "css3", "javascript", "bootstrap",
            "react", "react-native", "php", "nodejs",
            "python", "mongodb", "mysql",
          ].map((icon, idx) => (
            <i key={idx} className={`devicon-${icon}-plain colored floating-icon`}></i>
          ))}
        </div>

      </div>

      {/* WhatsApp Contact */}
      <a
        href="https://wa.me/2347086292944"
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-float"
      >
        <i className="bi bi-whatsapp"></i>
      </a>
    </section>
  );
}

import { useEffect } from "react";
import "./Hero.css"; // Animation CSS

// ✅ Import your local image
import myimage from "../assets/images/myimage.png";

export default function Hero() {
  const skills = [
    "HTML", "CSS", "JavaScript", "Bootstrap",
    "React", "React Native", "PHP",
    "Node.js", "Python",
    "MongoDB", "MySQL"
  ];

  useEffect(() => {
  const icons = document.querySelectorAll<HTMLElement>(".floating-icon");

  icons.forEach((icon) => {
    // random start position (within 0–90%)
    const top = Math.random() * 90;
    const left = Math.random() * 90;
    icon.style.top = `${top}%`;
    icon.style.left = `${left}%`;

    // random animation duration and delay
    const duration = 20 + Math.random() * 15; // between 20–35s
    const delay = Math.random() * 5; // between 0–5s
    icon.style.animationDuration = `${duration}s`;
    icon.style.animationDelay = `${delay}s`;
  });
}, []);


  return (
 <section
  id="hero"
  className="d-flex align-items-center position-relative"
  style={{
    height: "96vh",
    backgroundColor: "white", // dark background helps icons glow
    color: "#fff",
    overflow: "hidden",
  }}
>
      <div className="container">
        <div className="row align-items-center justify-content-center text-center text-lg-start" style={{height:"96vh"}} >
          
          {/* 👤 Image First in Mobile */}
          <div
            className="col-12 col-lg-6 order-1 order-lg-2 d-flex align-items-center justify-content-center mt-5 mb-4 mb-lg-0"
            data-aos="fade-left"
            data-aos-delay="400"
            id="background"
          >
            <img
              src={myimage}
              alt="Owolabi - Fullstack Developer"
              className="img-fluid rounded-circle shadow bouncing"
              style={{
                // maxWidth: "200px",
                // maxHeight: "200px",
                // border: "5px solid #FFA500",
                // backgroundColor: "#fff"

  width: "180px",             // default for large screens
    height: "180px",
    borderRadius: "50%",
    border: "5px solid #FFA500",
    backgroundColor: "#fff",
    objectFit: "cover",
    display: "block",
    margin: "0 auto",
              }}
            />
          </div>

          {/* 📝 Text Section */}
          <div
            className="col-12 col-lg-6 order-2 order-lg-1"
            data-aos="fade-up"
           
          >
            <div className="hero-text">
              <h1
                className="fw-bold mb-2"
                style={{ color: "#222", fontSize: "2.8rem" }}
              >
                ID TECH
              </h1>
              <h3
                style={{ color: "#555", fontWeight: "400" }}
                className="mb-3"
              >
                Real World Innovations
              </h3>
              <p
                style={{ color: "#666", fontSize: "1.1rem", lineHeight: "1.6" }}
                className="mb-4"
              >
                Fullstack Developer — Websites & Mobile Applications
              </p>

              {/* 💡 Skills */}
              <div className="d-flex flex-wrap justify-content-center justify-content-lg-start gap-2 mb-4">
                {skills.map((skill, idx) => (
                  <span
                    key={idx}
                    style={{
                      padding: "6px 15px",
                      borderRadius: "25px",
                      backgroundColor: "#e0e0e0",
                      color: "#0c0c0cff",
                      fontWeight: "500",
                      fontSize: "0.9rem"
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>

              {/* 🔘 Buttons */}
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
                  View Projects
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
                  Contact Me
                </a>
              </div>
            </div>
          </div>

        </div>

       {/* 🌐 Floating Tech Icons in Background */}
<div className="floating-icons">
  {[
    "html5",
    "css3",
    "javascript",
    "bootstrap",
    "react",
    "react-native",
    "php",
    "nodejs",
    "python",
    "mongodb",
    "mysql",
  ].map((icon, idx) => (
    <i key={idx} className={`devicon-${icon}-plain colored floating-icon`}></i>
  ))}
</div>


      </div>



        {/* ✅ Fixed WhatsApp Icon */}
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

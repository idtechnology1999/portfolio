import "./Skills.css";
import frontendImg from "../assets/images/frontend.jpg";
import backendImg from "../assets/images/backend.jpg";
import mobileImg from "../assets/images/Mobile-App-Development.jpg";
import databaseImg from "../assets/images/database.jpg";
import uiuxImg from "../assets/images/representations-user-experience-interface-design.jpg";
import hardwareImg from "../assets/images/hardware.jpg";

export default function Skills() {
  const skills = [
    {
      title: "Frontend Development",
      image: frontendImg,
      description:
        "Building interactive and responsive user interfaces using HTML, CSS, JavaScript, Bootstrap, Tailwind CSS, and React.",
    },
    {
      title: "Backend Development",
      image: backendImg,
      description:
        "Developing secure and scalable server-side logic with Node.js, php, Express, and RESTful APIs for dynamic applications.",
    },
   {
  title: "Mobile App Development",
  image: mobileImg,
  description:
    "Building cross-platform mobile apps with React Native and Flutter (Dart) for seamless Android and iOS performance.",
},

    {
      title: "Database Management",
      image: databaseImg,
      description:
        "Managing and structuring data efficiently using MySQL, MongoDB, and Firebase for reliable performance.",
    },
    {
      title: "UI / UX Design",
      image: uiuxImg,
      description:
        "Creating visually appealing, intuitive designs that enhance user experience and accessibility.",
    },
    {
      title: "Computer Hardware & Networking",
      image: hardwareImg,
      description:
        "Troubleshooting, assembling, and maintaining hardware systems and network infrastructures.",
    },
  ];

  return (
    <section id="skills" className="skills-section text-center py-5">
      <div className="container">
        <h2 className="section-title mb-3">Skills & Expertise</h2>
        <p className="section-desc mx-auto mb-5">
          I’m a passionate <strong>Website and Mobile App Developer</strong> with
          a strong foundation in <strong>Computer Engineering</strong>. I
          specialize in building responsive, user-friendly, and high-performing
          digital solutions that bring ideas to life.
        </p>

        <div className="row g-4">
          {skills.map((skill, index) => (
            <div className="col-md-4 col-sm-6" key={index}>
              <div className="skill-card shadow-sm">
                <img
                  src={skill.image}
                  alt={skill.title}
                  className="img-fluid skill-img"
                />
                <h5 className="mt-3 skill-title">{skill.title}</h5>
                <p className="skill-desc">{skill.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


import "./Portfolio.css";

export default function Portfolio() {
  const projects = [
    {
      title: "Vision Spark Website",
      description:
        "A sleek, responsive business website designed to showcase marketing solutions with modern design and fast performance.",
      link: "http://visionsparkmarketingsolution.com/",
    },
    {
      title: "E-Library",
      description:
        "A modern, digital library platform for online academic resources and study materials, built with a clean dashboard interface.",
      link: "http://chrislewando.com/",
    },
    {
      title: "Computer Engineering chatbot",
      description:
        "A smart chatbot system for Computer Engineering Department, built to automate student queries and department information.",
      link: "https://github.com/idtechnology1999/Department-Chatbot.git",
    },
    {
      title: "See all",
      description: "Explore more of my projects on my GitHub profile.",
      link: "https://github.com/idtechnology1999",
    },
  ];
  return (
    <section id="projects" className="portfolio-section py-5">
      <div className="container text-center">
        <h2
          className="section-title mb-3"
          data-aos="fade-down"
          data-aos-duration="1000"
        >
          My Projects
        </h2>
        <p
          className="section-desc mb-5"
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          A collection of my recent work — crafted with precision, performance,
          and creativity in mind.
        </p>

        <div className="row g-4">
          {projects.map((project, index) => (
            <div
              key={index}
              className="col-12 col-md-6 col-lg-4"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="project-card">
                <div className="project-body">
                  <h5 className="project-title">{project.title}</h5>
                  <p className="project-desc">{project.description}</p>
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link"
                  >
                    View Project →
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

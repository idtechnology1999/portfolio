import "./About.css";
export default function About() {
  return (
    <section
      id="about"
      className="about-section py-5 d-flex justify-content-center align-items-center"
    >
      <div className="about-container text-center">
        <h2 className="about-title mb-4">About Me</h2>

        <p className="about-desc">
          I’m <strong>Owolabi Idowu</strong>, a creative and detail-oriented
          individual passionate about innovation, design, and technology.
          My goal is to craft meaningful digital experiences and build
          solutions that make life easier and smarter.
        </p>

        <p className="about-desc">
          I’ve gained valuable experience through academic training,
          internships, and collaborations with organizations like
          <strong> NISER</strong>, <strong> Paraq Hub</strong>, and
          <strong> Digital World Tech Academic</strong> — where I contributed
          to impactful, user-focused projects.
        </p>

        <div className="contact-info mt-4">
          <p>
            <i className="bi bi-whatsapp text-success me-2"></i>
            WhatsApp:{" "}
            <a
              href="https://wa.me/2347086292944"
              target="_blank"
              rel="noopener noreferrer"
            >
              07086292944
            </a>
          </p>
          <p>
            <i className="bi bi-telephone text-primary me-2"></i>
            Call:{" "}
            <a href="tel:07086292944">07086292944</a>,{" "}
            <a href="tel:08142090731">08142090731</a>
          </p>
        </div>

        <a href="#contact" className="btn about-btn mt-3">
          Contact Me
        </a>
      </div>
    </section>
  );
}

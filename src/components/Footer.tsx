
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer-section text-center text-lg-start">
      <div className="container py-5">
        <div className="row gy-4 justify-content-between">
          {/* Brand Info */}
          <div className="col-lg-4 col-md-6">
            <h4 className="footer-brand mb-3">Real World Innovations</h4>
            <p className="footer-text">
              Delivering real-world digital solutions through creativity,
              innovation, and technology — transforming ideas into impactful
              experiences.
            </p>
          </div>
          {/* Quick Links */}
          <div className="col-lg-3 col-md-6">
            <h5 className="footer-title mb-3">Quick Links</h5>
            <ul className="list-unstyled footer-links">
              <li><a href="#about">About</a></li>
              <li><a href="#team">Team</a></li>
              <li><a href="#skills">Skills</a></li>
              <li><a href="#projects">Projects</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div className="col-lg-4 col-md-6">
            <h5 className="footer-title mb-3">Get in Touch</h5>
            <p className="footer-text mb-2">
              <i className="bi bi-telephone me-2"></i> 07086292944
            </p>
            <p className="footer-text mb-2">
              <i className="bi bi-envelope me-2"></i> idtechrealworldinnovations@gmail.com
            </p>
            <p className="footer-text mb-2">
              <i className="bi bi-geo-alt me-2"></i>Moniya, Ibadan.
            </p>

            <p className="footer-text mb-2">
              <i className="bi bi-geo-alt me-2"></i>Ikorodu, Lagos state
            </p>

            <div className="social-icons mt-3">
              <a
                href="https://wa.me/2347086292944"
                target="_blank"
                rel="noopener noreferrer"
                className="me-3 whatsapp-icon"
              >
                <i className="bi bi-whatsapp"></i>
              </a>
              <a
                href="https://github.com/idtechnology1999"
                target="_blank"
                rel="noopener noreferrer"
                className="me-3"
              >
                <i className="bi bi-github"></i>
              </a>
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="me-3"
              >
                <i className="bi bi-linkedin"></i>
              </a>
              <a href="mailto:idtechrealworldinnovations@gmail.com">
                <i className="bi bi-envelope"></i>
              </a>
            </div>
          </div>
        </div>

        <hr className="footer-divider my-4" />

        <div className="text-center small text-muted">
          © {new Date().getFullYear()} Real World Innovations — All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}

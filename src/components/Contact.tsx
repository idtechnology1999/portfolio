import "./Contact.css";

const Contact = () => {
  return (
    <div className="contact-section" id="contact">
      <div className="container">
        <div className="text-center mb-5" data-aos="fade-up">
          <span className="section-badge">GET IN TOUCH</span>
          <h2 className="section-title">Contact Us</h2>
          <p className="section-desc">
            Reach out to us via WhatsApp or visit our office locations for inquiries and support.
          </p>
        </div>

        <div className="row g-4 justify-content-center">
          {/* WhatsApp Card */}
          <div className="col-12 col-md-6 col-lg-5" data-aos="fade-right" data-aos-delay="100">
            <div className="contact-card text-center">
              <div className="contact-icon-wrap">
                <i className="bi bi-whatsapp"></i>
              </div>
              <h5>WhatsApp Support</h5>

              <a
                href="https://wa.me/2347086292944"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-btn whatsapp-btn"
              >
                <i className="bi bi-telephone-fill me-2"></i>0708 629 2944
              </a>

              <a
                href="https://wa.me/2348159548029"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-btn whatsapp-btn"
              >
                <i className="bi bi-telephone-fill me-2"></i>0815 954 8029
              </a>
            </div>
          </div>

          {/* Locations Card */}
          <div className="col-12 col-md-6 col-lg-5" data-aos="fade-left" data-aos-delay="200">
            <div className="contact-card text-center">
              <div className="contact-icon-wrap">
                <i className="bi bi-geo-alt-fill"></i>
              </div>
              <h5>Our Locations</h5>

              <p className="location-item">
                <i className="bi bi-pin-map-fill me-2" style={{color: '#FF8C00'}}></i>
                Ikorodu, Lagos State
              </p>
              <p className="location-item">
                <i className="bi bi-pin-map-fill me-2" style={{color: '#FF8C00'}}></i>
                Moniya, Ibadan
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;

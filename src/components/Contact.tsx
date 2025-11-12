import "./Contact.css"; // <-- create this CSS file

const Contact = () => {
  return (
    <div className="contact-section" id="contact">

      <h2 className="section-title text-center mb-3">Contact Us</h2>
      <p className="section-desc text-center mb-5">
        Reach out to us via WhatsApp or visit our office locations for inquiries and support.
      </p>

      <div className="container">
        <div className="row g-4 justify-content-center">

          {/* WhatsApp Card */}
          <div className="col-12 col-md-6 col-lg-5">
            <div className="contact-card text-center">
              <h5 className="fw-semibold mb-4">
                <i className="bi bi-whatsapp text-success me-2"></i>WhatsApp Support
              </h5>

              <a
                href="https://wa.me/2347086292944"
                target="_blank"
                className="contact-btn whatsapp-btn"
              >
                0708 629 2944
              </a>

              <a
                href="https://wa.me/2348159548029"
                target="_blank"
                className="contact-btn whatsapp-btn"
              >
                0815 954 8029
              </a>
            </div>
          </div>

          {/* Locations Card */}
          <div className="col-12 col-md-6 col-lg-5">
            <div className="contact-card text-center">
              <h5 className="fw-semibold mb-4">
                <i className="bi bi-geo-alt-fill text-danger me-2"></i>Our Locations
              </h5>

              <p className="location-item">📍 Ikorodu, Lagos State</p>
              <p className="location-item">📍 Moniya, Ibadan</p>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};

export default Contact;

import "./Services.css";

export default function Services() {
  const services = [
    {
      icon: "🌐",
      title: "Web Development",
      description: "Custom websites and web applications built with modern technologies for optimal performance and user experience.",
      features: ["Responsive Design", "E-commerce Solutions", "CMS Integration"]
    },
    {
      icon: "📱",
      title: "Mobile App Development",
      description: "Native and cross-platform mobile applications for iOS and Android that engage users and drive business growth.",
      features: ["React Native", "iOS & Android", "API Integration"]
    },
    {
      icon: "🎓",
      title: "Tech Training",
      description: "Comprehensive training programs for graduates and undergraduates in practical tech skills to become industry-ready professionals.",
      features: ["Web Development", "Mobile Development", "Real-World Projects"]
    },
    {
      icon: "☁️",
      title: "Cloud Solutions",
      description: "Scalable cloud infrastructure and deployment solutions to ensure your applications run smoothly and securely.",
      features: ["AWS Deployment", "Database Management", "API Development"]
    }
  ];

  return (
    <section className="services-section">
      <div className="container">
        <div className="section-header">
          <div className="section-badge">WHAT WE OFFER</div>
          <h2 className="section-title">Our Services</h2>
          <p className="section-subtitle">
            Comprehensive digital solutions tailored to your business needs
          </p>
        </div>

        <div className="services-grid">
          {services.map((service, idx) => (
            <div key={idx} className="service-card" data-aos="fade-up" data-aos-delay={idx * 100}>
              <div className="service-icon">{service.icon}</div>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-description">{service.description}</p>
              <ul className="service-features">
                {service.features.map((feature, i) => (
                  <li key={i}>
                    <span className="feature-dot">•</span> {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

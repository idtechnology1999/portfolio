import "./CoreValues.css";

export default function CoreValues() {
  const values = [
    {
      icon: "💡",
      title: "Innovation",
      description: "Pioneering creative solutions for tomorrow's challenges."
    },
    {
      icon: "👥",
      title: "Community",
      description: "Building a generation of empowered, tech-savvy professionals."
    },
    {
      icon: "🛡️",
      title: "Integrity",
      description: "Delivering quality with full transparency and trust."
    },
    {
      icon: "📈",
      title: "Growth",
      description: "Committed to continuous learning and measurable improvement."
    }
  ];

  return (
    <section className="core-values-section">
      <div className="container">
        <div className="section-badge">OUR FOUNDATION</div>
        <h2 className="section-title">Core Values</h2>
        
        <div className="values-grid">
          {values.map((value, idx) => (
            <div key={idx} className="value-card" data-aos="fade-up" data-aos-delay={idx * 100}>
              <div className="value-icon">{value.icon}</div>
              <h3 className="value-title">{value.title}</h3>
              <p className="value-description">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

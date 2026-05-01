import { useEffect, useState } from "react";
import "./Stats.css";

export default function Stats() {
  const [counts, setCounts] = useState({ projects: 0, students: 0, clients: 0, years: 0 });

  const stats = [
    { label: "Projects Completed", value: 50, suffix: "+", key: "projects" },
    { label: "Students Trained", value: 200, suffix: "+", key: "students" },
    { label: "Happy Clients", value: 40, suffix: "+", key: "clients" },
    { label: "Years Experience", value: 5, suffix: "+", key: "years" }
  ];

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;

    stats.forEach((stat) => {
      let current = 0;
      const increment = stat.value / steps;

      const timer = setInterval(() => {
        current += increment;
        if (current >= stat.value) {
          current = stat.value;
          clearInterval(timer);
        }
        setCounts((prev) => ({ ...prev, [stat.key]: Math.floor(current) }));
      }, interval);
    });
  }, []);

  return (
    <section className="stats-section">
      <div className="container">
        <div className="stats-grid">
          {stats.map((stat, idx) => (
            <div key={idx} className="stat-card" data-aos="zoom-in" data-aos-delay={idx * 100}>
              <div className="stat-value">
                {counts[stat.key as keyof typeof counts]}{stat.suffix}
              </div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

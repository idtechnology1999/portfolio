
import "./Team.css";
import managerImg from "../assets/images/image2.png"
import member1 from "../assets/images/database.jpg";
import member2 from "../assets/images/database.jpg";
import member3 from "../assets/images/frontend too.jpg";
import member4 from "../assets/images/database.jpg";

export default function Team() {
  const members = [
    { name: "Sarah Johnson", role: "Frontend Developer", image: member1 },
    { name: "Michael Smith", role: "Backend Engineer", image: member2 },
    { name: "Olawale o.o", role: "UI/UX Designer", image: member3 },
    { name: "Owolabi Elijah", role: "Mobile App Developer", image: member4 },
  ];

  return (
    <section id="team" className="team-section py-5 text-center">
      <div className="container">
        <h2
          className="section-title mb-3"
          data-aos="fade-down"
          data-aos-duration="1000"
        >
          Meet Our Team
        </h2>
        <p
          className="section-desc mb-5"
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          Our passionate professionals combine creativity, technology, and
          strategy to bring digital ideas to life.
        </p>

        {/* 👔 Manager Section */}
        <div
          className="manager-card mx-auto mb-5"
          data-aos="zoom-in"
          data-aos-duration="1200"
        >
          <img
            src={managerImg}
            alt="Team Manager"
            className="manager-img mb-3"
          />
          <h4 className="fw-bold mb-1">Owolabi Idowu</h4>
          <p className="text-muted">Team Manager / Fullstack Developer</p>
        </div>

        {/* 👥 Other Team Members */}
        <div className="row g-4 justify-content-center">
          {members.map((member, index) => (
            <div
              className="col-12 col-sm-6 col-md-4 col-lg-3"
              key={index}
              data-aos="fade-up"
              data-aos-delay={index * 150}
              data-aos-duration="1000"
            >
              <div className="team-card">
                <img
                  src={member.image}
                  alt={member.name}
                  className="team-img mb-3"
                />
                <h6 className="fw-bold">{member.name}</h6>
                <p className="text-muted mb-0">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 
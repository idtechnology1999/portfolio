

export default function Navbar() {
  return (
    <nav
      className="navbar navbar-expand-lg shadow-sm py-3 fixed-top"
      style={{
        backgroundColor: "#fff",
        zIndex: 1030, // ensures it stays above all sections
      }}
      data-aos="fade-down"
    >
      <div className="container">
        {/* 🔷 Logo */}
        <a
          className="navbar-brand fw-bold d-flex flex-column lh-1"
          href="#hero"
          style={{ color: "#000", textDecoration: "none" }}
        >
          <span style={{ fontSize: "1.5rem" }}>ID TECH</span>
          <small style={{ fontSize: "0.75rem", color: "#FFA500" }}>
            Real World Innovations
          </small>
        </a>

        {/* ☰ Hamburger Menu */}
        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* 🔗 Navbar Links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center gap-lg-2">
            {[
              { id: "/", icon: "house", label: "Home" },
              // { id: "#about", icon: "person", label: "About" },
               { id: "#team", icon: "people", label: "Team" },
              { id: "#skills", icon: "lightning", label: "Skills" },
              { id: "#projects", icon: "window-stack", label: "Projects" },
              { id: "#contact", icon: "envelope", label: "Contact" },
            ].map((item, index) => (
              <li key={index} className="nav-item">
                <a
                  href={`${item.id}`}
                  className="nav-link fw-medium px-3"
                  style={{
                    color: "#000",
                    transition: "0.3s ease",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                  }}
                >
                  <i
                    className={`bi bi-${item.icon}`}
                    style={{ color: "#FFA500" }}
                  ></i>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}

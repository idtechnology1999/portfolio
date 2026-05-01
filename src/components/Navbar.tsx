import { useEffect, useState } from "react";

const navItems = [
  { id: "/", icon: "house-fill", label: "Home" },
  { id: "#about", icon: "info-circle-fill", label: "About" },
  { id: "#team", icon: "people-fill", label: "Team" },
  { id: "#skills", icon: "lightning-fill", label: "Services" },
  { id: "#projects", icon: "window-stack", label: "Projects" },
  { id: "#contact", icon: "envelope-fill", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("/");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`navbar navbar-expand-lg fixed-top py-2 nav-root${scrolled ? " nav-scrolled" : ""}`}
      style={{ transition: "all 0.35s ease", fontFamily: "'Poppins', sans-serif" }}
    >
      <div className="container">
        {/* Logo */}
        <a
          className="navbar-brand d-flex flex-column lh-1"
          href="#hero"
          style={{ textDecoration: "none" }}
        >
          <span
            style={{
              fontSize: "1.55rem",
              fontWeight: 800,
              color: "#1a1a1a",
              letterSpacing: "-0.5px",
            }}
          >
            ID<span style={{ color: "#FF8C00" }}>TECH</span>
          </span>
          <small
            style={{
              fontSize: "0.68rem",
              color: "#FF8C00",
              fontWeight: 600,
              letterSpacing: "1.5px",
              textTransform: "uppercase",
            }}
          >
            Real World Innovations
          </small>
        </a>

        {/* Hamburger */}
        <button
          className="navbar-toggler border-0 shadow-none"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
          style={{ outline: "none" }}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center gap-lg-1">
            {navItems.map((item, index) => (
              <li key={index} className="nav-item">
                <a
                  href={item.id}
                  onClick={() => setActive(item.id)}
                  className="nav-link fw-medium px-3 py-2"
                  style={{
                    color: active === item.id ? "#FF8C00" : "#555",
                    transition: "color 0.3s ease",
                    borderRadius: "8px",
                    fontSize: "0.95rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    position: "relative",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.color = "#FF8C00";
                    (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,140,0,0.1)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.color =
                      active === item.id ? "#FF8C00" : "#555";
                    (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
                  }}
                >
                  <i className={`bi bi-${item.icon}`} style={{ fontSize: "0.85rem" }}></i>
                  <span>{item.label}</span>
                </a>
              </li>
            ))}

            {/* CTA Button */}
            <li className="nav-item ms-lg-2">
              <a
                href="#contact"
                className="btn"
                style={{
                  background: "linear-gradient(135deg, #FF8C00, #FFA500)",
                  color: "#fff",
                  borderRadius: "20px",
                  padding: "8px 20px",
                  fontWeight: 600,
                  fontSize: "0.85rem",
                  transition: "all 0.3s ease",
                  boxShadow: "0 4px 15px rgba(255,140,0,0.3)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px)";
                  (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 8px 20px rgba(255,140,0,0.45)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)";
                  (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 4px 15px rgba(255,140,0,0.3)";
                }}
              >
                Get Started
              </a>
            </li>
          </ul>
        </div>
      </div>

      <style>{`
        .nav-root {
          background: rgba(255,255,255,0.98);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid transparent;
        }
        .nav-scrolled {
          background: rgba(255,255,255,1) !important;
          border-bottom-color: rgba(255,140,0,0.12) !important;
          box-shadow: 0 2px 20px rgba(0,0,0,0.06) !important;
        }
        .nav-link {
          position: relative;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%) scaleX(0);
          width: 80%;
          height: 2px;
          background: linear-gradient(90deg, #FF8C00, #FFA500);
          transition: transform 0.3s ease;
          z-index: 1;
        }
        .nav-link:hover::after {
          transform: translateX(-50%) scaleX(1);
        }
        .nav-link span, .nav-link i {
          position: relative;
          z-index: 2;
        }
        @media (max-width: 991px) {
          #navbarNav {
            background: #fff;
            border-radius: 12px;
            padding: 12px 0;
            margin-top: 8px;
            box-shadow: 0 8px 30px rgba(0,0,0,0.1);
          }
        }
      `}</style>
    </nav>
  );
}

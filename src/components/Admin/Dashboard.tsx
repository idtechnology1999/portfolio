import { useState } from "react";
import { NavLink, Routes, Route } from "react-router-dom";
import SkillsPage from "./SkillsPage";
import TeamPage from "./TeamPage";
import TeamSettings from "./TeamSettings";
import CourseSettings from "./CourseSettings";

export default function Dashboard() {
  const [collapsed, setCollapsed] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false); // submenu toggle

  return (
    <div className="dashboard-container">

      <style>{`
        body { margin: 0; background: #f5f6fa; height: 100vh; overflow: hidden; }
        .dashboard-container { display: flex; width: 100%; height: 100vh; }

        /* Sidebar */
        .sidebar {
          width: 240px;
          background: #111827;
          transition: width 0.3s ease;
          flex-shrink: 0;
          height: 100vh;
          overflow: hidden;
          position: sticky;
          top: 0;
        }
        .sidebar.collapsed { width: 70px; }
        .sidebar h4 { color: white; margin-bottom: 1rem; }
        .sidebar .nav-link {
          padding: 10px 14px;
          border-radius: 8px;
          font-size: 15px;
          color: #e5e7eb !important;
          transition: background 0.2s;
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        .sidebar .nav-link:hover { background: #1f2937; }
        .sidebar .nav-link.active { background: #2563eb !important; color: #fff !important; }

        /* Submenu */
        .submenu { padding-left: 1.5rem; display: flex; flex-direction: column; gap: 0.25rem; }
        .submenu .nav-link { font-size: 14px; padding: 6px 14px; }

        /* Collapse behavior */
        .sidebar.collapsed .nav-link span,
        .sidebar.collapsed h4 { display: none; }
        .sidebar.collapsed .nav-link { justify-content: center !important; }

        /* Main content */
        .main-content {
          flex-grow: 1;
          padding: 1rem;
          background: #f5f6fa;
          height: 100vh;           /* full viewport height */
          overflow-y: auto;        /* scroll independently */
        }
      `}</style>

      {/* SIDEBAR */}
      <div className={`sidebar p-3 ${collapsed ? "collapsed" : ""}`}>
        <h4 className="fw-bold">Dashboard</h4>

        <button
          className="btn btn-sm btn-outline-light mb-3"
          onClick={() => setCollapsed(!collapsed)}
        >
          <i className={`bi bi-${collapsed ? "arrow-bar-right" : "arrow-bar-left"}`}></i>
        </button>

        <ul className="nav flex-column gap-2">
          <li>
            <NavLink to="/Admin/team" className="nav-link d-flex align-items-center gap-3">
              <i className="bi bi-people fs-5"></i> <span>Team</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/Admin/skills" className="nav-link d-flex align-items-center gap-3">
              <i className="bi bi-lightning-charge fs-5"></i> <span>Skills</span>
            </NavLink>
          </li>
          <li>
            <div
              className="nav-link d-flex align-items-center gap-3"
              style={{ cursor: "pointer" }}
              onClick={() => setSettingsOpen(!settingsOpen)}
            >
              <i className="bi bi-gear fs-5"></i> <span>Settings</span>
              <i className={`bi ms-auto bi-chevron-${settingsOpen ? "down" : "right"}`}></i>
            </div>
            {settingsOpen && (
              <div className="submenu">
                <NavLink to="/Admin/TeamSettings" className="nav-link">Team Settings</NavLink>
                <NavLink to="/Admin/CourseSettings" className="nav-link">Course Settings</NavLink>
              </div>
            )}
          </li>
        </ul>
      </div>

      {/* MAIN CONTENT */}
      <div className="main-content">
        <Routes>
          <Route path="/" element={<SkillsPage />} />
          <Route path="skills" element={<SkillsPage />} />
          <Route path="team" element={<TeamPage />} />
          <Route path="TeamSettings" element={<TeamSettings />} /> {/* Team Settings */}
          <Route path="CourseSettings" element={<CourseSettings />} />
        </Routes>
      </div>
    </div>
  );
}

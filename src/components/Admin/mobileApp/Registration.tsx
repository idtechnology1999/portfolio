import { useState, useEffect } from "react";
import axios from "axios";
import "./CreateUserForm.css";

const apiurl = import.meta.env.VITE_API_BASE_URL;

interface User {
  _id: string;
  fullName: string;
  email: string;
  course: string;
  amount: number;
  certificate: string;
  status: string;
  durationMonths: number;
  isUnlimited: boolean;
  startDate: string;
}

function getDurationProgress(user: User) {
  const months = user.isUnlimited ? 12 : (user.durationMonths || 1);
  const start  = new Date(user.startDate || Date.now());
  const end    = new Date(start);
  end.setMonth(end.getMonth() + months);
  const now      = Date.now();
  const total    = end.getTime() - start.getTime();
  const elapsed  = Math.min(now - start.getTime(), total);
  const pct      = Math.round((elapsed / total) * 100);
  const daysLeft = Math.max(0, Math.ceil((end.getTime() - now) / 86400000));
  return { pct, daysLeft, end };
}

function formatDate(d: Date) {
  return d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
}

function printCertificate(user: User) {
  const months = user.isUnlimited ? 12 : (user.durationMonths || 1);
  const start  = new Date(user.startDate || Date.now());
  const end    = new Date(start);
  end.setMonth(end.getMonth() + months);
  const duration = user.isUnlimited ? "Unlimited Access (12 Months)" : `${months} Month${months > 1 ? "s" : ""}`;
  const issued   = formatDate(start);
  const expires  = formatDate(end);

  const win = window.open("", "_blank");
  if (!win) return;
  win.document.write(`<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8"/>
  <title>Certificate – ${user.fullName}</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Inter:wght@400;600&display=swap');
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { background: #fff; display: flex; justify-content: center; align-items: center; min-height: 100vh; font-family: 'Inter', sans-serif; }
    .cert {
      width: 900px; padding: 60px 70px;
      border: 12px solid #2563eb;
      outline: 4px solid #f59e0b;
      outline-offset: -20px;
      text-align: center;
      position: relative;
    }
    .cert-logo { font-size: 28px; font-weight: 800; color: #2563eb; letter-spacing: 3px; margin-bottom: 6px; }
    .cert-sub  { font-size: 13px; color: #64748b; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 30px; }
    .cert-title { font-family: 'Playfair Display', serif; font-size: 42px; color: #0f172a; margin-bottom: 10px; }
    .cert-presented { font-size: 14px; color: #64748b; margin-bottom: 6px; }
    .cert-name { font-family: 'Playfair Display', serif; font-size: 52px; color: #2563eb; margin-bottom: 20px; border-bottom: 2px solid #e2e8f0; padding-bottom: 16px; }
    .cert-body { font-size: 16px; color: #374151; line-height: 1.8; margin-bottom: 30px; }
    .cert-course { font-weight: 700; color: #0f172a; font-size: 20px; }
    .cert-meta { display: flex; justify-content: space-around; margin: 30px 0; }
    .cert-meta-item label { font-size: 11px; color: #94a3b8; text-transform: uppercase; letter-spacing: 1px; display: block; margin-bottom: 4px; }
    .cert-meta-item span  { font-size: 14px; font-weight: 600; color: #0f172a; }
    .cert-footer { display: flex; justify-content: space-between; align-items: flex-end; margin-top: 40px; }
    .cert-sig { text-align: center; }
    .cert-sig-line { width: 160px; border-top: 2px solid #0f172a; margin: 0 auto 6px; }
    .cert-sig-name { font-size: 13px; font-weight: 600; color: #0f172a; }
    .cert-sig-role { font-size: 11px; color: #94a3b8; }
    .cert-seal { width: 80px; height: 80px; border-radius: 50%; background: #2563eb; color: #fff; display: flex; flex-direction: column; align-items: center; justify-content: center; font-size: 10px; font-weight: 700; letter-spacing: 1px; }
    @media print { body { -webkit-print-color-adjust: exact; print-color-adjust: exact; } }
  </style>
</head>
<body>
  <div class="cert">
    <div class="cert-logo">IDTECH</div>
    <div class="cert-sub">Institute of Digital Technology</div>
    <div class="cert-title">Certificate of Completion</div>
    <div class="cert-presented">This is to certify that</div>
    <div class="cert-name">${user.fullName}</div>
    <div class="cert-body">
      has successfully completed the course<br/>
      <span class="cert-course">${user.course}</span>
    </div>
    <div class="cert-meta">
      <div class="cert-meta-item"><label>Duration</label><span>${duration}</span></div>
      <div class="cert-meta-item"><label>Issued</label><span>${issued}</span></div>
      <div class="cert-meta-item"><label>Expires</label><span>${expires}</span></div>
      <div class="cert-meta-item"><label>Certificate ID</label><span>IDTECH-${user._id.slice(-6).toUpperCase()}</span></div>
    </div>
    <div class="cert-footer">
      <div class="cert-sig">
        <div class="cert-sig-line"></div>
        <div class="cert-sig-name">Director, IDTECH</div>
        <div class="cert-sig-role">Authorized Signatory</div>
      </div>
      <div class="cert-seal">IDTECH<br/>CERTIFIED</div>
      <div class="cert-sig">
        <div class="cert-sig-line"></div>
        <div class="cert-sig-name">Lead Instructor</div>
        <div class="cert-sig-role">Course Facilitator</div>
      </div>
    </div>
  </div>
  <script>window.onload = () => { window.print(); }<\/script>
</body>
</html>`);
  win.document.close();
}

export default function Registration() {
  const [fullName, setFullName]   = useState("");
  const [email, setEmail]         = useState("");
  const [course, setCourse]       = useState("");
  const [amount, setAmount]       = useState("");
  const [duration, setDuration]   = useState("1");
  const [unlimited, setUnlimited] = useState(false);
  const [users, setUsers]         = useState<User[]>([]);
  const [courses, setCourses]     = useState<string[]>([]);
  const [search, setSearch]       = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [certLoading, setCertLoading] = useState<string | null>(null);
  const [submitting, setSubmitting]   = useState(false);
  const [toast, setToast] = useState<{ msg: string; type: "success" | "danger" } | null>(null);

  // Edit state
  const [editing, setEditing] = useState<User | null>(null);
  const [editAmount, setEditAmount]     = useState("");
  const [editDuration, setEditDuration] = useState("1");
  const [editUnlimited, setEditUnlimited] = useState(false);
  const [editSaving, setEditSaving]     = useState(false);

  const itemsPerPage = 10;

  useEffect(() => {
    fetchUsers();
    axios.get(`${apiurl}/api/mobile/courses/all`)
      .then((res) => setCourses((res.data.data ?? []).map((c: any) => c.title)))
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 3000);
    return () => clearTimeout(t);
  }, [toast]);

  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${apiurl}/api/mobile/students`);
      setUsers(res.data.data ?? []);
    } catch {
      setToast({ msg: "Error fetching students", type: "danger" });
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !course || !amount) {
      setToast({ msg: "Please fill all fields", type: "danger" });
      return;
    }
    setSubmitting(true);
    try {
      const res = await axios.post(`${apiurl}/api/mobile/register`, {
        fullName, email, course, amount: Number(amount),
        durationMonths: unlimited ? 12 : Number(duration),
        isUnlimited: unlimited,
      });
      setToast({ msg: res.data.message, type: res.data.success ? "success" : "danger" });
      if (res.data.success) {
        setFullName(""); setEmail(""); setCourse(""); setAmount("");
        setDuration("1"); setUnlimited(false);
        fetchUsers();
      }
    } catch {
      setToast({ msg: "Error registering student", type: "danger" });
    } finally {
      setSubmitting(false);
    }
  };

  const openEdit = (user: User) => {
    setEditing(user);
    setEditAmount(String(user.amount));
    setEditUnlimited(user.isUnlimited);
    setEditDuration(String(user.durationMonths || 1));
  };

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editing) return;
    setEditSaving(true);
    try {
      const res = await axios.put(`${apiurl}/api/mobile/student/${editing._id}`, {
        amount: Number(editAmount),
        durationMonths: editUnlimited ? 12 : Number(editDuration),
        isUnlimited: editUnlimited,
      });
      setToast({ msg: res.data.message, type: "success" });
      setEditing(null);
      fetchUsers();
    } catch {
      setToast({ msg: "Error updating student", type: "danger" });
    } finally {
      setEditSaving(false);
    }
  };

  const handleDelete = async (email: string) => {
    if (!confirm("Delete this student?")) return;
    try {
      const res = await axios.delete(`${apiurl}/api/mobile/student/${email}`);
      setToast({ msg: res.data.message, type: "success" });
      fetchUsers();
    } catch {
      setToast({ msg: "Error deleting student", type: "danger" });
    }
  };

  const handleToggleCertificate = async (user: User) => {
    const newStatus = user.certificate === "Completed" ? "Pending" : "Completed";
    const key = `${user.email}-${user.course}`;
    setCertLoading(key);
    try {
      const res = await axios.patch(`${apiurl}/api/mobile/certificate`, {
        email: user.email, course: user.course, status: newStatus,
      });
      if (res.data.success) {
        setUsers((prev) => prev.map((u) =>
          u.email === user.email && u.course === user.course ? { ...u, certificate: newStatus } : u
        ));
      }
    } catch {
      setToast({ msg: "Error updating certificate", type: "danger" });
    } finally {
      setCertLoading(null);
    }
  };

  const filteredUsers  = users.filter((u) =>
    u.fullName.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase()) ||
    u.course.toLowerCase().includes(search.toLowerCase())
  );
  const totalPages     = Math.ceil(filteredUsers.length / itemsPerPage);
  const displayedUsers = filteredUsers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const activeCount    = users.filter((u) => u.status === "Active").length;
  const certCount      = users.filter((u) => u.certificate === "Completed").length;
  const totalRevenue   = users.reduce((sum, u) => sum + Number(u.amount), 0);

  return (
    <div className="reg-container">
      {toast && <div className={`reg-toast reg-toast--${toast.type}`}>{toast.msg}</div>}

      <div className="reg-header">
        <div>
          <h1 className="reg-title">Student Management</h1>
          <p className="reg-subtitle">Register and manage IDTECH mobile app students</p>
        </div>
      </div>

      {/* Stats */}
      <div className="reg-stats">
        <div className="reg-stat-card">
          <div className="reg-stat-icon reg-stat-icon--blue"><i className="bi bi-people-fill"></i></div>
          <div><p className="reg-stat-label">Total Students</p><p className="reg-stat-value">{users.length}</p></div>
        </div>
        <div className="reg-stat-card">
          <div className="reg-stat-icon reg-stat-icon--green"><i className="bi bi-person-check-fill"></i></div>
          <div><p className="reg-stat-label">Active</p><p className="reg-stat-value">{activeCount}</p></div>
        </div>
        <div className="reg-stat-card">
          <div className="reg-stat-icon reg-stat-icon--orange"><i className="bi bi-award-fill"></i></div>
          <div><p className="reg-stat-label">Certificates</p><p className="reg-stat-value">{certCount}</p></div>
        </div>
        <div className="reg-stat-card">
          <div className="reg-stat-icon reg-stat-icon--purple"><i className="bi bi-cash-stack"></i></div>
          <div><p className="reg-stat-label">Total Revenue</p><p className="reg-stat-value">₦{totalRevenue.toLocaleString()}</p></div>
        </div>
      </div>

      {/* Register Form */}
      <div className="reg-card">
        <div className="reg-card-header"><i className="bi bi-person-plus-fill me-2"></i>Register New Student</div>
        <div className="reg-card-body">
          <form onSubmit={handleCreate} className="reg-form">
            <div className="reg-form-group">
              <label>Full Name</label>
              <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Enter full name" />
            </div>
            <div className="reg-form-group">
              <label>Email Address</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter email" />
            </div>
            <div className="reg-form-group">
              <label>Course</label>
              <select value={course} onChange={(e) => setCourse(e.target.value)}>
                <option value="">Select a course</option>
                {courses.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="reg-form-group">
              <label>Amount Paid (₦)</label>
              <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="0.00" />
            </div>
            <div className="reg-form-group">
              <label>Duration</label>
              <select value={unlimited ? "unlimited" : duration} onChange={(e) => {
                if (e.target.value === "unlimited") { setUnlimited(true); setDuration("12"); }
                else { setUnlimited(false); setDuration(e.target.value); }
              }}>
                {[1,2,3,4,5,6,7,8,9,10,11,12].map((m) => (
                  <option key={m} value={String(m)}>{m} Month{m > 1 ? "s" : ""}</option>
                ))}
                <option value="unlimited">Unlimited</option>
              </select>
            </div>
            <div className="reg-form-group reg-form-group--btn">
              <button type="submit" className="reg-btn-primary" disabled={submitting}>
                {submitting ? <><span className="reg-spinner"></span> Registering...</> : <><i className="bi bi-person-plus me-2"></i>Register</>}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Table */}
      <div className="reg-card">
        <div className="reg-card-header">
          <span><i className="bi bi-table me-2"></i>Students ({filteredUsers.length})</span>
          <div className="reg-search-wrapper">
            <i className="bi bi-search reg-search-icon"></i>
            <input type="text" placeholder="Search name, email or course..." value={search}
              onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }} className="reg-search" />
          </div>
        </div>
        <div className="reg-card-body reg-card-body--table">
          <table className="reg-table">
            <thead>
              <tr>
                <th>#</th><th>Student</th><th>Course</th><th>Amount</th>
                <th>Duration</th><th>Progress</th><th>Status</th><th>Certificate</th><th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {displayedUsers.length > 0 ? displayedUsers.map((user, index) => {
                const key         = `${user.email}-${user.course}`;
                const isUpdating  = certLoading === key;
                const isCompleted = user.certificate === "Completed";
                const { pct, daysLeft, end } = getDurationProgress(user);
                const barColor = pct >= 90 ? "#ef4444" : pct >= 60 ? "#f59e0b" : "#2563eb";

                return (
                  <tr key={user._id || index}>
                    <td className="reg-td-num">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                    <td>
                      <div className="reg-student-cell">
                        <div className="reg-avatar">{user.fullName.charAt(0).toUpperCase()}</div>
                        <div>
                          <p className="reg-student-name">{user.fullName}</p>
                          <p className="reg-student-email">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td><span className="reg-course-badge">{user.course}</span></td>
                    <td className="reg-amount">₦{Number(user.amount).toLocaleString()}</td>
                    <td>
                      <span style={{ fontSize: 12, fontWeight: 600, padding: "3px 10px", borderRadius: 20,
                        background: user.isUnlimited ? "#f0fdf4" : "#eff6ff",
                        color: user.isUnlimited ? "#16a34a" : "#2563eb", whiteSpace: "nowrap" }}>
                        {user.isUnlimited ? "♾ Unlimited" : `${user.durationMonths || 1}mo`}
                      </span>
                    </td>
                    <td style={{ minWidth: 130 }}>
                      <div style={{ fontSize: 11, color: "#64748b", marginBottom: 4, whiteSpace: "nowrap" }}>
                        {daysLeft > 0 ? `${daysLeft}d left · ends ${formatDate(end)}` : `Ended ${formatDate(end)}`}
                      </div>
                      <div style={{ height: 6, background: "#f1f5f9", borderRadius: 99, overflow: "hidden" }}>
                        <div style={{ width: `${pct}%`, height: "100%", background: barColor, borderRadius: 99 }} />
                      </div>
                      <div style={{ fontSize: 10, color: "#94a3b8", marginTop: 2 }}>{pct}%</div>
                    </td>
                    <td><span className={`reg-status reg-status--${user.status.toLowerCase()}`}>{user.status}</span></td>
                    <td>
                      <button onClick={() => handleToggleCertificate(user)} disabled={isUpdating}
                        className={`reg-cert-btn ${isCompleted ? "reg-cert-btn--done" : "reg-cert-btn--pending"}`}>
                        {isUpdating ? "..." : isCompleted ? "✓ Completed" : "Pending"}
                      </button>
                    </td>
                    <td>
                      <div style={{ display: "flex", gap: 6 }}>
                        {/* Edit */}
                        <button className="reg-delete-btn" style={{ background: "#eff6ff", color: "#2563eb", border: "1px solid #bfdbfe" }}
                          onClick={() => openEdit(user)} title="Edit">
                          <i className="bi bi-pencil"></i>
                        </button>
                        {/* Print Certificate */}
                        {isCompleted && (
                          <button className="reg-delete-btn" style={{ background: "#f0fdf4", color: "#16a34a", border: "1px solid #bbf7d0" }}
                            onClick={() => printCertificate(user)} title="Print Certificate">
                            <i className="bi bi-award"></i>
                          </button>
                        )}
                        {/* Delete */}
                        <button className="reg-delete-btn" onClick={() => handleDelete(user.email)} title="Delete">
                          <i className="bi bi-trash3"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              }) : (
                <tr>
                  <td colSpan={9} className="reg-empty">
                    <i className="bi bi-inbox" style={{ fontSize: 32, display: "block", marginBottom: 8 }}></i>
                    No students found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="reg-pagination">
            <button onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))} disabled={currentPage === 1} className="reg-page-btn">
              <i className="bi bi-chevron-left"></i>
            </button>
            {[...Array(totalPages)].map((_, i) => (
              <button key={i} onClick={() => setCurrentPage(i + 1)} className={`reg-page-btn ${currentPage === i + 1 ? "reg-page-btn--active" : ""}`}>
                {i + 1}
              </button>
            ))}
            <button onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))} disabled={currentPage === totalPages} className="reg-page-btn">
              <i className="bi bi-chevron-right"></i>
            </button>
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {editing && (
        <div className="adm-modal-backdrop" style={{ zIndex: 9999 }}>
          <div className="adm-modal" style={{ maxWidth: 420 }}>
            <h2 className="adm-modal__title">Edit Student</h2>
            <div style={{ marginBottom: 12, padding: "10px 14px", background: "#f8fafc", borderRadius: 8 }}>
              <p style={{ fontWeight: 600, fontSize: 14, color: "#0f172a" }}>{editing.fullName}</p>
              <p style={{ fontSize: 12, color: "#64748b" }}>{editing.email} · {editing.course}</p>
            </div>
            <form onSubmit={handleEdit}>
              <div style={{ marginBottom: 16 }}>
                <label className="adm-label">Amount Paid (₦)</label>
                <input className="adm-input" type="number" value={editAmount}
                  onChange={(e) => setEditAmount(e.target.value)} placeholder="Enter amount" />
              </div>
              <div style={{ marginBottom: 16 }}>
                <label className="adm-label">Duration</label>
                <select className="adm-select" value={editUnlimited ? "unlimited" : editDuration}
                  onChange={(e) => {
                    if (e.target.value === "unlimited") { setEditUnlimited(true); setEditDuration("12"); }
                    else { setEditUnlimited(false); setEditDuration(e.target.value); }
                  }}>
                  {[1,2,3,4,5,6,7,8,9,10,11,12].map((m) => (
                    <option key={m} value={String(m)}>{m} Month{m > 1 ? "s" : ""}</option>
                  ))}
                  <option value="unlimited">Unlimited</option>
                </select>
              </div>
              <div className="adm-modal__footer">
                <button className="adm-btn adm-btn--primary" type="submit" disabled={editSaving}>
                  {editSaving ? "Saving..." : "Save Changes"}
                </button>
                <button className="adm-btn adm-btn--ghost" type="button" onClick={() => setEditing(null)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

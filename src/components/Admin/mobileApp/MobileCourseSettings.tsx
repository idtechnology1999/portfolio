import { useState, useEffect, useRef } from "react";
import axios from "axios";
import "../admin.css";

const apiurl = import.meta.env.VITE_API_BASE_URL;

interface MobileCourse {
  _id: string;
  title: string;
  image?: string;
}

interface Editing extends MobileCourse {
  newImage?: File | null;
  newPreview?: string | null;
  newOutline?: File | null;
}

export default function MobileCourseSettings() {
  const [courses, setCourses]     = useState<MobileCourse[]>([]);
  const [toast, setToast]         = useState<{ msg: string; type: "success" | "danger" } | null>(null);
  const [editing, setEditing]     = useState<Editing | null>(null);
  const [loading, setLoading]     = useState(false);
  const [newTitle, setNewTitle]   = useState("");
  const [newImage, setNewImage]   = useState<File | null>(null);
  const [newPreview, setNewPreview] = useState<string | null>(null);
  const [newOutline, setNewOutline] = useState<File | null>(null);
  const fileRef    = useRef<HTMLInputElement>(null);
  const outlineRef = useRef<HTMLInputElement>(null);

  useEffect(() => { fetchCourses(); }, []);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 3000);
    return () => clearTimeout(t);
  }, [toast]);

  function notify(msg: string, type: "success" | "danger" = "success") {
    setToast({ msg, type });
  }

  function fetchCourses() {
    axios.get(`${apiurl}/api/mobile/courses/all`)
      .then((res) => setCourses(res.data.data ?? []))
      .catch(() => notify("Error fetching courses", "danger"));
  }

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    if (!newTitle || !newImage) { notify("Title and image are required", "danger"); return; }
    setLoading(true);
    const fd = new FormData();
    fd.append("title", newTitle);
    fd.append("image", newImage);
    if (newOutline) fd.append("outline", newOutline);
    try {
      const res = await axios.post(`${apiurl}/api/mobile/courses/add`, fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      notify(res.data.message);
      setNewTitle(""); setNewImage(null); setNewPreview(null); setNewOutline(null);
      if (fileRef.current) fileRef.current.value = "";
      if (outlineRef.current) outlineRef.current.value = "";
      fetchCourses();
    } catch {
      notify("Error adding course", "danger");
    } finally {
      setLoading(false);
    }
  }

  async function handleUpdate(e: React.FormEvent) {
    e.preventDefault();
    if (!editing) return;
    setLoading(true);
    const fd = new FormData();
    fd.append("title", editing.title);
    if (editing.newImage) fd.append("image", editing.newImage);
    if (editing.newOutline) fd.append("outline", editing.newOutline);
    try {
      const res = await axios.put(`${apiurl}/api/mobile/courses/edit/${editing._id}`, fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      notify(res.data.message);
      setEditing(null);
      fetchCourses();
    } catch {
      notify("Error updating course", "danger");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this course?")) return;
    try {
      const res = await axios.delete(`${apiurl}/api/mobile/courses/delete/${id}`);
      notify(res.data.message);
      fetchCourses();
    } catch {
      notify("Error deleting course", "danger");
    }
  }

  return (
    <div className="adm-page">

      {/* Toast */}
      {toast && (
        <div className={`adm-toast adm-toast--${toast.type}`}>{toast.msg}</div>
      )}

      {/* Header */}
      <div className="adm-breadcrumb">
        <a href="#">Dashboard</a> / <span>Mobile App Courses</span>
      </div>
      <div className="adm-header">
        <h1 className="adm-title">Mobile App Courses</h1>
        <p className="adm-subtitle">Manage course covers shown in the IDTECH mobile app</p>
      </div>

      {/* Add Form */}
      <div className="adm-card">
        <div className="adm-card-header">
          <span>➕ Add New Course</span>
        </div>
        <div className="adm-card-body">
          <form onSubmit={handleAdd}>
            <div className="adm-form-grid adm-form-grid--3" style={{ alignItems: "end" }}>
              <div>
                <label className="adm-label">Course Title</label>
                <input
                  className="adm-input"
                  type="text"
                  placeholder="e.g. Mobile App Development"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                />
              </div>
              <div>
                <label className="adm-label">Cover Image</label>
                <input
                  ref={fileRef}
                  className="adm-input"
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const f = e.target.files?.[0] ?? null;
                    setNewImage(f);
                    setNewPreview(f ? URL.createObjectURL(f) : null);
                  }}
                />
              </div>
              <div>
                <label className="adm-label">Course Outline <span style={{ color: "#94a3b8", fontWeight: 400 }}>(Excel, optional)</span></label>
                <input
                  ref={outlineRef}
                  className="adm-input"
                  type="file"
                  accept=".xlsx,.xls"
                  onChange={(e) => setNewOutline(e.target.files?.[0] ?? null)}
                />
              </div>
            </div>
            <div style={{ marginTop: 8, fontSize: 12, color: "#94a3b8" }}>
              📋 Excel format: columns <strong>Module</strong>, <strong>Week</strong>, <strong>Topic</strong>, <strong>Details</strong>
              &nbsp;—&nbsp;
              <a
                href="data:text/csv;charset=utf-8,Module%2CWeek%2CTopic%2CDetails%0AHTML%2CWeek%201%2CIntroduction%20to%20HTML%2CTags%2C%20structure%2C%20doctype%0AHTML%2CWeek%202%2CForms%20%26%20Tables%2CInput%20types%2C%20table%20layout%0ACSS%2CWeek%203%2CSelectors%20%26%20Box%20Model%2CMargin%2C%20padding%2C%20borders%0ACSS%2CWeek%204%2CFlexbox%20%26%20Grid%2CResponsive%20layouts%0AJavaScript%2CWeek%205%2CVariables%20%26%20Functions%2Cvar%2C%20let%2C%20const%2C%20arrow%20functions%0AJavaScript%2CWeek%206%2CDOM%20Manipulation%2CquerySelector%2C%20events"
                download="course_outline_template.csv"
                style={{ color: "#2563eb" }}
              >
                Download template
              </a>
            </div>
            <div style={{ display: "flex", gap: 12, marginTop: 14, alignItems: "center" }}>
              {newPreview && (
                <img src={newPreview} alt="preview" className="adm-preview" style={{ width: 120, height: 80 }} />
              )}
              <button className="adm-btn adm-btn--primary" type="submit" disabled={loading}>
                {loading ? <><span className="adm-spinner" /> Adding…</> : "Add Course"}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Course Grid */}
      <div className="adm-card">
        <div className="adm-card-header">
          <span>📱 All Courses</span>
          <span style={{ fontSize: 13, color: "#64748b", fontWeight: 400 }}>{courses.length} course{courses.length !== 1 ? "s" : ""}</span>
        </div>
        <div className="adm-card-body">
          {courses.length === 0 ? (
            <div className="adm-empty">
              <i className="bi bi-collection" />
              <p>No courses yet. Add one above.</p>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {courses.map((course, i) => (
                <div key={course._id} style={{
                  display: "flex", alignItems: "center", gap: 14,
                  padding: "12px 16px", borderRadius: 12,
                  border: "1px solid #f1f5f9", background: "#fafafa",
                }}>
                  {/* Index badge */}
                  <span style={{
                    width: 28, height: 28, borderRadius: "50%", background: "#eff6ff",
                    color: "#2563eb", fontSize: 12, fontWeight: 700,
                    display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                  }}>{i + 1}</span>

                  {/* Thumbnail */}
                  {course.image ? (
                    <img src={course.image} alt={course.title} style={{
                      width: 72, height: 52, objectFit: "cover", borderRadius: 8,
                      border: "1px solid #e2e8f0", flexShrink: 0,
                    }} />
                  ) : (
                    <div style={{
                      width: 72, height: 52, borderRadius: 8, background: "#f1f5f9",
                      display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                    }}>
                      <i className="bi bi-image" style={{ fontSize: 20, color: "#94a3b8" }} />
                    </div>
                  )}

                  {/* Title */}
                  <span style={{ flex: 1, fontSize: 14, fontWeight: 600, color: "#0f172a" }}>
                    {course.title}
                  </span>

                  {/* Actions */}
                  <div style={{ display: "flex", gap: 8, marginLeft: "auto" }}>
                    <button
                      className="adm-btn adm-btn--ghost"
                      style={{ fontSize: 13, padding: "6px 14px" }}
                      onClick={() => setEditing({ ...course, newImage: null, newPreview: null })}
                    >
                      ✏️ Edit
                    </button>
                    <button
                      className="adm-btn adm-btn--danger"
                      style={{ fontSize: 13, padding: "6px 14px" }}
                      onClick={() => handleDelete(course._id)}
                    >
                      🗑 Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Edit Modal */}
      {editing && (
        <div className="adm-modal-backdrop">
          <div className="adm-modal">
            <h2 className="adm-modal__title">Edit Course</h2>
            <form onSubmit={handleUpdate}>
              <div style={{ marginBottom: 16 }}>
                <label className="adm-label">Course Title</label>
                <input
                  className="adm-input"
                  type="text"
                  value={editing.title}
                  onChange={(e) => setEditing({ ...editing, title: e.target.value })}
                />
              </div>

              <div style={{ marginBottom: 16 }}>
                <img
                  src={editing.newPreview ?? editing.image}
                  alt="preview"
                  style={{ width: "100%", height: 160, objectFit: "cover", borderRadius: 10, border: "1px solid #e2e8f0" }}
                />
              </div>

              <div style={{ marginBottom: 16 }}>
                <label className="adm-label">Replace Cover Image</label>
                <input
                  className="adm-input"
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const f = e.target.files?.[0] ?? null;
                    setEditing({ ...editing, newImage: f, newPreview: f ? URL.createObjectURL(f) : null });
                  }}
                />
              </div>

              <div style={{ marginBottom: 16 }}>
                <label className="adm-label">Update Course Outline <span style={{ color: "#94a3b8", fontWeight: 400 }}>(Excel, optional)</span></label>
                <input
                  className="adm-input"
                  type="file"
                  accept=".xlsx,.xls"
                  onChange={(e) => setEditing({ ...editing, newOutline: e.target.files?.[0] ?? null })}
                />
                <p style={{ fontSize: 12, color: "#94a3b8", marginTop: 4 }}>Columns: <strong>Week</strong>, <strong>Topic</strong>, <strong>Details</strong></p>
              </div>

              <div className="adm-modal__footer">
                <button className="adm-btn adm-btn--success" type="submit" disabled={loading}>
                  {loading ? <><span className="adm-spinner" /> Saving…</> : "Save Changes"}
                </button>
                <button className="adm-btn adm-btn--ghost" type="button" onClick={() => setEditing(null)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

import { useState, useEffect } from "react";
import "./admin.css";
import axios from "axios";

const apiurl = import.meta.env.VITE_API_BASE_URL;

interface Course { _id: string; title: string; Description: string; image?: string; }
interface Editing extends Course { newImage?: File | null; }

export default function CourseSettings() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [editing, setEditing] = useState<Editing | null>(null);
  const [toast, setToast] = useState<{ msg: string; type: "success" | "danger" } | null>(null);

  useEffect(() => { fetchCourses(); }, []);
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 3000);
    return () => clearTimeout(t);
  }, [toast]);

  const fetchCourses = () => {
    axios.get(`${apiurl}/api/course/all`)
      .then((res) => setCourses(res.data.data ?? []))
      .catch(() => setToast({ msg: "Error fetching courses", type: "danger" }));
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editing?._id) return;
    const fd = new FormData();
    fd.append("title", editing.title); fd.append("Description", editing.Description);
    if (editing.newImage) fd.append("image", editing.newImage);
    axios.put(`${apiurl}/api/course/edit/${editing._id}`, fd, { headers: { "Content-Type": "multipart/form-data" } })
      .then((res) => { setToast({ msg: res.data.message, type: "success" }); setEditing(null); fetchCourses(); })
      .catch(() => setToast({ msg: "Error updating course", type: "danger" }));
  };

  const handleDelete = (id: string) => {
    if (!confirm("Delete this course?")) return;
    axios.delete(`${apiurl}/api/course/delete/${id}`)
      .then((res) => { setToast({ msg: res.data.message, type: "success" }); fetchCourses(); })
      .catch(() => setToast({ msg: "Error deleting course", type: "danger" }));
  };

  return (
    <div className="adm-page">
      {toast && <div className={`adm-toast adm-toast--${toast.type}`}>{toast.msg}</div>}
      <div className="adm-breadcrumb"><a href="#">Dashboard</a> / <span>Course Settings</span></div>
      <div className="adm-header">
        <h1 className="adm-title">Course Settings</h1>
        <p className="adm-subtitle">Edit or remove website courses</p>
      </div>

      <div className="adm-card">
        <div className="adm-card-header"><i className="bi bi-journal-text me-2"></i>Courses ({courses.length})</div>
        <div className="adm-card-body">
          {courses.length === 0 ? (
            <div className="adm-empty"><i className="bi bi-journal-x"></i><p>No courses yet</p></div>
          ) : (
            <div className="adm-grid adm-grid--3">
              {courses.map((c) => (
                <div key={c._id} className="adm-item-card">
                  {c.image
                    ? <img src={c.image} alt={c.title} className="adm-item-card__img" />
                    : <div style={{ height: 150, background: "#f1f5f9", display: "flex", alignItems: "center", justifyContent: "center" }}><i className="bi bi-image" style={{ fontSize: 32, color: "#94a3b8" }}></i></div>
                  }
                  <div className="adm-item-card__body">
                    <p className="adm-item-card__title">{c.title}</p>
                    <p className="adm-item-card__sub">{c.Description}</p>
                    <div className="adm-item-card__actions">
                      <button className="adm-btn adm-btn--warning" style={{ padding: "6px 14px", fontSize: 13 }} onClick={() => setEditing({ ...c, newImage: null })}>
                        <i className="bi bi-pencil"></i> Edit
                      </button>
                      <button className="adm-btn adm-btn--danger" style={{ padding: "6px 14px", fontSize: 13 }} onClick={() => handleDelete(c._id)}>
                        <i className="bi bi-trash3"></i> Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {editing && (
        <div className="adm-modal-backdrop">
          <div className="adm-modal">
            <p className="adm-modal__title"><i className="bi bi-pencil-square me-2"></i>Edit Course</p>
            <form onSubmit={handleUpdate}>
              <div style={{ marginBottom: 14 }}>
                <label className="adm-label">Title</label>
                <input className="adm-input" value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value })} />
              </div>
              <div style={{ marginBottom: 14 }}>
                <label className="adm-label">Description</label>
                <textarea className="adm-textarea" value={editing.Description} onChange={(e) => setEditing({ ...editing, Description: e.target.value })} />
              </div>
              <div style={{ textAlign: "center", marginBottom: 14 }}>
                <img src={editing.newImage ? URL.createObjectURL(editing.newImage) : editing.image} alt="preview" className="adm-preview" style={{ width: "100%", height: 130 }} />
              </div>
              <div style={{ marginBottom: 16 }}>
                <label className="adm-label">Replace Image</label>
                <input className="adm-input" type="file" accept="image/*" onChange={(e) => setEditing({ ...editing, newImage: e.target.files?.[0] ?? null })} />
              </div>
              <div className="adm-modal__footer">
                <button type="submit" className="adm-btn adm-btn--success"><i className="bi bi-check-lg me-1"></i>Save</button>
                <button type="button" className="adm-btn adm-btn--ghost" onClick={() => setEditing(null)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

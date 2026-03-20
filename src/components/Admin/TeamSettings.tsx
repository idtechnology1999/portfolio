import { useState, useEffect } from "react";
import "./admin.css";
import axios from "axios";

const apiurl = import.meta.env.VITE_API_BASE_URL;

interface Member { _id: string; full_name: string; profession: string; picture?: string; }
interface Editing extends Member { newPicture: File | null; }

export default function TeamSettings() {
  const [members, setMembers] = useState<Member[]>([]);
  const [editing, setEditing] = useState<Editing | null>(null);
  const [toast, setToast] = useState<{ msg: string; type: "success" | "danger" } | null>(null);

  useEffect(() => { fetchMembers(); }, []);
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 3000);
    return () => clearTimeout(t);
  }, [toast]);

  const fetchMembers = async () => {
    try {
      const res = await axios.get(`${apiurl}/api/team/all`);
      setMembers(res.data.data ?? []);
    } catch { setToast({ msg: "Error fetching members", type: "danger" }); }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editing) return;
    const fd = new FormData();
    fd.append("full_name", editing.full_name);
    fd.append("profession", editing.profession);
    if (editing.newPicture) fd.append("picture", editing.newPicture);
    try {
      const res = await axios.put(`${apiurl}/api/team/edit/${editing._id}`, fd, { headers: { "Content-Type": "multipart/form-data" } });
      setToast({ msg: res.data.message, type: "success" });
      setEditing(null); fetchMembers();
    } catch { setToast({ msg: "Error updating member", type: "danger" }); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this member?")) return;
    try {
      const res = await axios.delete(`${apiurl}/api/team/delete/${id}`);
      setToast({ msg: res.data.message, type: "success" });
      fetchMembers();
    } catch { setToast({ msg: "Error deleting member", type: "danger" }); }
  };

  return (
    <div className="adm-page">
      {toast && <div className={`adm-toast adm-toast--${toast.type}`}>{toast.msg}</div>}

      <div className="adm-breadcrumb"><a href="#">Dashboard</a> / <span>Team Settings</span></div>
      <div className="adm-header">
        <h1 className="adm-title">Team Settings</h1>
        <p className="adm-subtitle">Edit or remove team members</p>
      </div>

      <div className="adm-card">
        <div className="adm-card-header"><span><i className="bi bi-people-fill me-2"></i>Members ({members.length})</span></div>
        <div className="adm-card-body">
          {members.length === 0 ? (
            <div className="adm-empty"><i className="bi bi-people"></i><p>No members yet</p></div>
          ) : (
            <div className="adm-grid adm-grid--3">
              {members.map((m) => (
                <div key={m._id} className="adm-item-card">
                  {m.picture
                    ? <img src={m.picture} alt={m.full_name} className="adm-item-card__img--avatar" />
                    : <div style={{ width: 80, height: 80, borderRadius: "50%", background: "linear-gradient(135deg,#2563eb,#7c3aed)", display: "flex", alignItems: "center", justifyContent: "center", margin: "16px auto 0", color: "#fff", fontSize: 28, fontWeight: 700 }}>{m.full_name.charAt(0)}</div>
                  }
                  <div className="adm-item-card__body">
                    <p className="adm-item-card__title">{m.full_name}</p>
                    <p className="adm-item-card__sub">{m.profession}</p>
                    <div className="adm-item-card__actions">
                      <button className="adm-btn adm-btn--warning adm-btn" style={{ padding: "6px 14px", fontSize: 13 }} onClick={() => setEditing({ ...m, newPicture: null })}>
                        <i className="bi bi-pencil"></i> Edit
                      </button>
                      <button className="adm-btn adm-btn--danger" style={{ padding: "6px 14px", fontSize: 13 }} onClick={() => handleDelete(m._id)}>
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
            <p className="adm-modal__title"><i className="bi bi-pencil-square me-2"></i>Edit Member</p>
            <form onSubmit={handleUpdate}>
              <div className="adm-form-grid" style={{ marginBottom: 14 }}>
                <div>
                  <label className="adm-label">Full Name</label>
                  <input className="adm-input" value={editing.full_name} onChange={(e) => setEditing({ ...editing, full_name: e.target.value })} />
                </div>
                <div style={{ marginTop: 14 }}>
                  <label className="adm-label">Profession</label>
                  <input className="adm-input" value={editing.profession} onChange={(e) => setEditing({ ...editing, profession: e.target.value })} />
                </div>
              </div>
              <div style={{ textAlign: "center", marginBottom: 14 }}>
                <img
                  src={editing.newPicture ? URL.createObjectURL(editing.newPicture) : editing.picture}
                  alt="preview" className="adm-preview adm-preview--circle"
                  style={{ width: 90, height: 90 }}
                />
              </div>
              <div style={{ marginBottom: 16 }}>
                <label className="adm-label">Replace Image</label>
                <input className="adm-input" type="file" accept="image/*" onChange={(e) => setEditing({ ...editing, newPicture: e.target.files?.[0] ?? null })} />
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

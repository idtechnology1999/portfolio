import { useState, useRef, useEffect } from "react";
import "./admin.css";
import axios from "axios";

const apiurl = import.meta.env.VITE_API_BASE_URL;

export default function TeamPage() {
  const [name, setName] = useState("");
  const [profession, setProfession] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ msg: string; type: "success" | "danger" | "warning" } | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 3000);
    return () => clearTimeout(t);
  }, [toast]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!image) { setToast({ msg: "Please upload an image", type: "danger" }); return; }
    setLoading(true);
    const fd = new FormData();
    fd.append("name", name);
    fd.append("profession", profession);
    fd.append("image", image);
    try {
      const res = await axios.post(`${apiurl}/api/team/add`, fd, { headers: { "Content-Type": "multipart/form-data" } });
      setToast({ msg: res.data.message, type: res.data.success ? "success" : "warning" });
      if (res.data.success) {
        setName(""); setProfession(""); setImage(null); setPreview(null);
        if (fileRef.current) fileRef.current.value = "";
      }
    } catch {
      setToast({ msg: "Unable to connect to API", type: "danger" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="adm-page">
      {toast && <div className={`adm-toast adm-toast--${toast.type}`}>{toast.msg}</div>}

      <div className="adm-breadcrumb">
        <a href="#">Dashboard</a> / <span>Team Management</span>
      </div>

      <div className="adm-header">
        <h1 className="adm-title">Team Management</h1>
        <p className="adm-subtitle">Add new members to your team</p>
      </div>

      <div className="adm-card">
        <div className="adm-card-header">
          <span><i className="bi bi-person-plus-fill me-2"></i>Add Team Member</span>
        </div>
        <div className="adm-card-body">
          <form onSubmit={handleSubmit}>
            <div className="adm-form-grid adm-form-grid--3">
              <div>
                <label className="adm-label">Full Name</label>
                <input className="adm-input" type="text" placeholder="John Doe" value={name} onChange={(e) => setName(e.target.value)} required />
              </div>
              <div>
                <label className="adm-label">Profession</label>
                <input className="adm-input" type="text" placeholder="e.g. Frontend Developer" value={profession} onChange={(e) => setProfession(e.target.value)} required />
              </div>
              <div>
                <label className="adm-label">Profile Image</label>
                <input ref={fileRef} className="adm-input" type="file" accept="image/*"
                  onChange={(e) => {
                    const f = e.target.files?.[0] ?? null;
                    const allowed = ["image/jpeg", "image/png", "image/jpg", "image/webp"];
                    if (f && !allowed.includes(f.type)) { setToast({ msg: "Only JPG, PNG, WEBP allowed", type: "danger" }); return; }
                    setImage(f); setPreview(f ? URL.createObjectURL(f) : null);
                  }} required />
              </div>
            </div>

            {preview && <img src={preview} alt="preview" className="adm-preview adm-preview--circle" />}

            <div style={{ marginTop: 20 }}>
              <button type="submit" className="adm-btn adm-btn--primary" disabled={loading}>
                {loading ? <><span className="adm-spinner"></span> Adding...</> : <><i className="bi bi-lightning me-1"></i>Add Member</>}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

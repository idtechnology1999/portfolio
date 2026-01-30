import axios from "axios";
import { useState, useEffect } from "react";

const apiurl = import.meta.env.VITE_API_BASE_URL;

// -----------------------------
// TYPES
// -----------------------------
interface TeamMember {
  _id: string;
  full_name: string;
  profession: string;
  picture?: string;
}

interface EditingMember extends TeamMember {
  newPicture: File | null;
}

// -----------------------------
// COMPONENT
// -----------------------------
export default function Settings() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [editingMember, setEditingMember] = useState<EditingMember | null>(null);
  const [message, setMessage] = useState<string>("");

  // -----------------------------
  // FETCH MEMBERS
  // -----------------------------
  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const res = await axios.get<TeamMember[]>(`${apiurl}/api/Team/Fetch`);
      setMembers(res.data);
    } catch (err) {
      console.error("Error fetching members:", err);
      setMessage("Error fetching team members");
    }
  };

  // -----------------------------
  // EDIT MEMBER
  // -----------------------------
  const handleEdit = (member: TeamMember) => {
    setEditingMember({
      ...member,
      newPicture: null,
    });
  };

  // -----------------------------
  // UPDATE MEMBER
  // -----------------------------
  const handleUpdate = async () => {
    if (!editingMember) return;

    try {
      const formData = new FormData();
      formData.append("full_name", editingMember.full_name);
      formData.append("profession", editingMember.profession);

      if (editingMember.newPicture) {
        formData.append("picture", editingMember.newPicture);
      }

      const res = await axios.put(
        `${apiurl}/api/Team/edit/${editingMember._id}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      setMessage(res.data.message);
      setEditingMember(null);
      fetchMembers();
    } catch (err) {
      console.error("Error updating member:", err);
      setMessage("Error updating member");
    }
  };

  // -----------------------------
  // DELETE MEMBER
  // -----------------------------
  const handleDelete = async (memberId: string) => {
    try {
      const res = await axios.delete(`${apiurl}/api/Team/delete/${memberId}`);
      setMessage(res.data.message);
      fetchMembers();
    } catch {
      setMessage("Error deleting member");
    }
  };

  // -----------------------------
  // ALERT
  // -----------------------------
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => setMessage(""), 2500);
    return () => clearTimeout(timer);
  }, [message]);

  // -----------------------------
  // RENDER
  // -----------------------------
  return (
    <section className="p-4">
      {/* ALERT */}
      {message && (
        <div
          className="alert alert-success text-center position-fixed top-50 start-50 translate-middle"
          role="alert"
          style={{ zIndex: 9999, minWidth: "250px" }}
        >
          {message}
        </div>
      )}

      {/* BREADCRUMB */}
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb mb-4">
          <li className="breadcrumb-item"><a>Dashboard</a></li>
          <li className="breadcrumb-item active">Settings</li>
        </ol>
      </nav>

      {/* TEAM MEMBERS LIST */}
      <div className="card shadow-sm p-4 form-card">
        <h5 className="text-primary mb-3 fw-semibold">Team Members</h5>
        <div className="row">
          {members.length === 0 ? (
            <div className="alert alert-warning">Loading...</div>
          ) : (
            members.map((member) => (
              <div key={member._id} className="col-md-4 mb-3">
                <div className="card shadow-sm p-3 text-center">
                  {member.picture && (
                    <img
                      src={member.picture}  // ✅ FIXED: Direct Cloudinary URL
                      alt={member.full_name}
                      className="rounded-circle mb-3"
                      style={{ width: "100px", height: "100px", objectFit: "cover" }}
                    />
                  )}
                  <h6 className="fw-semibold">{member.full_name}</h6>
                  <p className="text-muted">{member.profession}</p>
                  <div className="d-flex gap-2 mt-2 justify-content-center">
                    <button
                      className="btn btn-sm btn-outline-warning"
                      onClick={() => handleEdit(member)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => handleDelete(member._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* EDIT FORM */}
        {editingMember && (
          <div className="card shadow p-4 mt-4">
            <h5>Edit Member</h5>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleUpdate();
              }}
            >
              <input
                type="text"
                className="form-control mb-2"
                value={editingMember.full_name}
                onChange={(e) =>
                  setEditingMember({ ...editingMember, full_name: e.target.value })
                }
                placeholder="Full Name"
              />
              <input
                type="text"
                className="form-control mb-2"
                value={editingMember.profession}
                onChange={(e) =>
                  setEditingMember({ ...editingMember, profession: e.target.value })
                }
                placeholder="Profession"
              />

              {/* IMAGE PREVIEW */}
              <div className="text-center mb-3">
                {editingMember.newPicture ? (
                  <img
                    src={URL.createObjectURL(editingMember.newPicture)}
                    alt="Preview"
                    style={{ width: "100px", height: "100px", objectFit: "cover", borderRadius: "50%" }}
                  />
                ) : editingMember.picture ? (
                  <img
                    src={editingMember.picture}  // ✅ FIXED: Direct Cloudinary URL
                    alt="Preview"
                    style={{ width: "100px", height: "100px", objectFit: "cover", borderRadius: "50%" }}
                  />
                ) : null}
              </div>

              {/* FILE INPUT */}
              <input
                type="file"
                className="form-control mb-3"
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files?.[0]) {
                    setEditingMember({ ...editingMember, newPicture: e.target.files[0] });
                  }
                }}
              />

              <button type="submit" className="btn btn-success">Save Changes</button>
              <button
                type="button"
                className="btn btn-secondary ms-2"
                onClick={() => setEditingMember(null)}
              >
                Cancel
              </button>
            </form>
          </div>
        )}
      </div>
    </section>
  );
}
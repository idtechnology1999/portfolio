import axios from "axios";
import { useState, useEffect } from "react";
// import type { FormEvent } from "react";

const apiurl = import.meta.env.VITE_API_BASE_URL;

// ✅ Team member type
interface TeamMember {
  _id: string;
  full_name: string;
  profession: string;
  picture?: string;
}

// ✅ Extend for editing to include new image
interface EditingMember extends TeamMember {
  newPicture?: File | null;
}

export default function Settings() {
  const [message, setMessage] = useState<string>("");
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [editingMember, setEditingMember] = useState<EditingMember | null>(null);

// ✅ Fetch members on load
useEffect(() => {
  fetchMembers();
}, []);

function fetchMembers() {
  axios
    .get<TeamMember[]>(`${apiurl}/api/Team/Fetch`) // <-- directly an array
    .then((res) => setMembers(res.data))           // <-- no .message
    .catch((err) => console.error("Error fetching members:", err));
}

  // ✅ Edit member
  function handleEdit(member: TeamMember) {
    setEditingMember(member);
  }

  // ✅ Update member with optional new image
  function handleUpdateWithImage() {
    if (!editingMember || !editingMember._id) return;

    const formData = new FormData();
    formData.append("full_name", editingMember.full_name);
    formData.append("profession", editingMember.profession);

    if (editingMember.newPicture) {
      formData.append("picture", editingMember.newPicture);
    }

    axios
      .put(`${apiurl}/api/Team/edit/${editingMember._id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        setMessage(res.data.message);
        setEditingMember(null);
        fetchMembers();
      })
      .catch((err) => {
        console.error(err);
        setMessage("Error updating member");
      });
  }

  // ✅ Delete member
  function handleDelete(memberId: string) {
    axios
      .delete(`${apiurl}/api/Team/delete/${memberId}`)
      .then((res) => {
        setMessage(res.data.message);
        fetchMembers();
      })
      .catch((err) => {
        console.error(err);
        setMessage("Error deleting member");
      });
  }

  // ✅ Auto-hide success alert
  function Alert() {
    useEffect(() => {
      if (message) {
        const timer = setTimeout(() => setMessage(""), 3000);
        return () => clearTimeout(timer);
      }
    }, []);

    return message ? (
      <div
        className="alert alert-success text-center position-fixed top-50 start-50 translate-middle"
        role="alert"
        style={{ zIndex: 1050, minWidth: "250px" }}
      >
        {message}
      </div>
    ) : null;
  }

  // ✅ Buttons for each member
  function MemberButton({ memberId }: { memberId?: string }) {
    return (
      <div className="d-flex gap-2 mt-2 justify-content-center">
        <button
          onClick={() => {
            const member = members.find((m) => m._id === memberId);
            if (member) handleEdit(member);
          }}
          className="btn btn-sm btn-outline-warning"
        >
          Edit
        </button>
        <button
          onClick={() => memberId && handleDelete(memberId)}
          className="btn btn-sm btn-outline-danger"
        >
          Delete
        </button>
      </div>
    );
  }

  return (
    <section className="p-4">
      <Alert />

      <nav aria-label="breadcrumb">
        <ol className="breadcrumb mb-4">
          <li className="breadcrumb-item">
            <a href="#">Dashboard</a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Settings
          </li>
        </ol>
      </nav>

      <div className="card shadow-sm p-4 form-card">
        <h5 className="text-primary mb-3 fw-semibold">Team Members</h5>

        {/* ✅ Display all members */}
        <div className="row">
          
         {members.length == 0?
         <>
         <div className="alert alert-warning">
          Loading
         </div>
         </>
        :

        <> {members.map((member) => (
            <div key={member._id} className="col-md-4 mb-3">
              <div className="card shadow-sm p-3 text-center">
                {member.picture && (
                  <img
                    src={`${apiurl}/imgTeam/${member.picture}`}
                    alt={member.full_name}
                    className="team-img mb-3 rounded-circle"
                    style={{
                      width: "100px",
                      height: "100px",
                      objectFit: "cover",
                      margin: "0 auto",
                    }}
                  />
                )}
                <h6 className="fw-semibold">{member.full_name}</h6>
                <p className="text-muted mb-2">{member.profession}</p>
                <MemberButton memberId={member._id} />
              </div>
            </div>
          ))}</>
        
        }



        </div>

        {/* ✅ Edit Member Form */}
        {editingMember && (
          <div className="card shadow p-4 mt-4">
            <h5>Edit Member</h5>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleUpdateWithImage();
              }}
            >
              {/* Name & Profession */}
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

              {/* Image Preview */}
              <div className="mb-2 text-center">
                {editingMember.newPicture ? (
                  <img
                    src={URL.createObjectURL(editingMember.newPicture)}
                    alt="Preview"
                    style={{
                      width: "100px",
                      height: "100px",
                      objectFit: "cover",
                      borderRadius: "50%",
                    }}
                  />
                ) : editingMember.picture ? (
                  <img
                    src={`${apiurl}/imgTeam/${editingMember.picture}`}
                    alt={editingMember.full_name}
                    style={{
                      width: "100px",
                      height: "100px",
                      objectFit: "cover",
                      borderRadius: "50%",
                    }}
                  />
                ) : null}
              </div>

              {/* File Input */}
              <input
                type="file"
                className="form-control mb-3"
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    setEditingMember({
                      ...editingMember,
                      newPicture: e.target.files[0],
                    });
                  }
                }}
              />

              <button type="submit" className="btn btn-success">
                Save Changes
              </button>
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

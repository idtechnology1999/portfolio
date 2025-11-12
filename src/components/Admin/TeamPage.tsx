import { useState, useEffect } from "react";
import type { ChangeEvent, FormEvent } from "react";
import "./FormPage.css";
import axios from "axios";

const apiurl = import.meta.env.VITE_API_BASE_URL;

interface FormData {
  name: string;
  profession: string;
  image: File | null;
}

export default function TeamPage() {
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    profession: "",
    image: null,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;

    // ✅ Image file validation
    if (name === "image" && files && files[0]) {
      const file = files[0];
      const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp"];
      if (!allowedTypes.includes(file.type)) {
        setFeedback("Only image files (JPG, PNG, WEBP) are allowed!");
        setFormData({ ...formData, image: null });
        e.target.value = ""; // reset file input
        return;
      }
      setFormData({ ...formData, image: file });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.image) {
      setFeedback("Please upload a valid image before submitting.");
      return;
    }

    setLoading(true);
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("profession", formData.profession);
      formDataToSend.append("image", formData.image);

      const response = await axios.post(`${apiurl}/api/Team/add`, formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setFeedback(response.data.message || "Team member added successfully!");
    } catch (error) {
      console.error(error);
      setFeedback("Unable to connect to API");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (feedback) {
      const timer = setTimeout(() => setFeedback(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [feedback]);

  return (
    <div className="content p-4">
      {feedback && (
        <div
          className="alert alert-info shake-alert mt-3"
          role="alert"
          style={{
            position: "absolute",
            top: "30%",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 32,
          }}
        >
          {feedback}
        </div>
      )}

      <nav aria-label="breadcrumb">
        <ol className="breadcrumb mb-4">
          <li className="breadcrumb-item">
            <a href="#">Dashboard</a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Team Management
          </li>
        </ol>
      </nav>

      <p className="text-muted mb-4">Add and manage your team members</p>
      <div className="card shadow-sm p-4 form-card">
        <h5 className="text-primary mb-3 fw-semibold">Add Team Member</h5>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-semibold">Full Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              placeholder="John Doe"
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Profession</label>
            <input
              type="text"
              className="form-control"
              name="profession"
              placeholder="Software Engineer, Graphics Designer..."
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Profile Image</label>
            <input
              type="file"
              className="form-control"
              name="image"
              accept="image/*"
              onChange={handleChange}
              required
            />
          </div>
   {/* ✅ Preview */}
          {formData.image && (
            <div className="mt-3 text-center">
              <img
                src={URL.createObjectURL(formData.image)}
                alt="Preview"
                style={{
                  maxWidth: "80px",
                  borderRadius: "10px",
                  border: "1px solid #ddd",
                }}
              />
            </div>
          )}
          

          <div className="text-center">
            <button
              type="submit"
              className="btn btn-primary w-sm-100 w-md-50 w-lg-25"
              disabled={loading}
            >
              {loading ? (
                <span className="d-flex align-items-center justify-content-center">
                  <div className="dots-loader">
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>
                  <span className="ms-2">loading</span>
                </span>
              ) : (
                <>
                  <i className="bi bi-lightning me-2"></i>Add Team
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

import { useState, useEffect } from "react";
import type { ChangeEvent, FormEvent } from "react";

import axios from "axios";
import "./FormPage.css";

const apiurl = import.meta.env.VITE_API_BASE_URL;

interface SkillFormData {
  title: string;
  image: File | null;
  description: string;
}

export default function SkillsPage() {
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<SkillFormData>({
    title: "",
    image: null,
    description: "",
  });

  // ✅ Handle input changes
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const target = e.target as HTMLInputElement | HTMLTextAreaElement;

    // Handle file input
    if (target instanceof HTMLInputElement && target.type === "file") {
      const file = target.files?.[0] || null;

      if (file) {
        const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp"];
        const maxSize = 30 * 1024 * 1024; // 30MB

        if (!allowedTypes.includes(file.type)) {
          setFeedback("❌ Only image files (JPG, PNG, WEBP) are allowed!");
          target.value = "";
          setFormData({ ...formData, image: null });
          return;
        }

        if (file.size > maxSize) {
          setFeedback("❌ File too large! Please upload an image under 30MB.");
          target.value = "";
          setFormData({ ...formData, image: null });
          return;
        }

        // ✅ Valid image
        setFeedback("");
        setFormData({ ...formData, image: file });
      }
    } else {
      // Handle text and textarea
      const { name, value } = target;
      setFormData({ ...formData, [name]: value });
    }
  };

  // ✅ Handle form submit (IMPROVED ERROR HANDLING)
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.image) {
      setFeedback("❌ Please upload a valid image before submitting.");
      return;
    }

    setLoading(true);
    try {
      const data = new FormData();
      data.append("title", formData.title);
      data.append("description", formData.description);
      if (formData.image) data.append("image", formData.image);

      const response = await axios.post(`${apiurl}/api/Course/add`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setFeedback(response.data.message || "✅ Skill added successfully!");

      // ✅ Only reset form if successfully created
      if (response.data.message?.toLowerCase().includes("success") || 
          response.data.message?.toLowerCase().includes("created")) {
        setFormData({ title: "", image: null, description: "" });
        (e.target as HTMLFormElement).reset();
      }
    } catch (error) {
      console.error("❌ Upload error:", error);
      
      // Better error handling
      if (axios.isAxiosError(error)) {
        if (error.response) {
          // Server responded with error status
          setFeedback(error.response.data.message || "⚠️ Server error occurred");
        } else if (error.request) {
          // Request made but no response received
          setFeedback("⚠️ Unable to connect to the API. Please check your connection.");
        } else {
          // Something else happened
          setFeedback("⚠️ An unexpected error occurred");
        }
      } else {
        setFeedback("⚠️ An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  // ✅ Auto clear feedback
  useEffect(() => {
    if (feedback) {
      const timer = setTimeout(() => setFeedback(""), 4000);
      return () => clearTimeout(timer);
    }
  }, [feedback]);

  return (
    <div className="content p-4">
      {/* ✅ Feedback alert */}
      {feedback && (
        <div
          className={`alert ${
            feedback.toLowerCase().includes("success") || feedback.toLowerCase().includes("created")
              ? "alert-success" 
              : feedback.toLowerCase().includes("already")
              ? "alert-warning"
              : "alert-danger"
          } shake-alert mt-3`}
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

      {/* ✅ Breadcrumb */}
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb mb-4">
          <li className="breadcrumb-item">
            <a href="#">Dashboard</a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Skills Management
          </li>
        </ol>
      </nav>

      <p className="text-muted mb-4">Add and manage your skills</p>

      <div className="card shadow-sm p-4 form-card">
        <h5 className="text-primary mb-3 fw-semibold">Add Skill</h5>

        <form onSubmit={handleSubmit}>
          {/* ✅ Title input */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Title</label>
            <input
              type="text"
              className="form-control"
              name="title"
              value={formData.title}
              placeholder="React, Photoshop, Marketing..."
              onChange={handleChange}
              required
            />
          </div>

          {/* ✅ Image input */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Image</label>
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

          {/* ✅ Description input */}
          <div className="mb-3 mt-3">
            <label className="form-label fw-semibold">Description</label>
            <textarea
              className="form-control"
              name="description"
              value={formData.description}
              rows={3}
              placeholder="Write a short description..."
              onChange={handleChange}
              required
            ></textarea>
          </div>

          {/* ✅ Submit button */}
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
                  <span className="ms-2">Loading...</span>
                </span>
              ) : (
                <>
                  <i className="bi bi-lightning me-2"></i>Add Skill
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
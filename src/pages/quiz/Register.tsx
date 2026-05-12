import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerStudent } from "../../services/quizApi";

export default function Register() {
  const [first_name, setFirst_name] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!first_name.trim()) return setError("First name is required");
    if (password.length < 4) return setError("Password must be at least 4 characters");
    setLoading(true);
    try {
      const { data } = await registerStudent(first_name, password);
      localStorage.setItem("quiz_token", data.token);
      localStorage.setItem("quiz_user", data.student.first_name);
      nav("/quiz/take");
    } catch (err: any) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center" style={{ background: "linear-gradient(135deg, #0f0c29, #302b63, #24243e)" }}>
      <div className="card border-0 shadow-lg p-4" style={{ width: "100%", maxWidth: 420, borderRadius: 20, background: "#fff" }}>
        <div className="text-center mb-4">
          <h2 style={{ color: "#302b63", fontWeight: 800 }}>IDTECH</h2>
          <p style={{ color: "#FF8C00", fontWeight: 600, letterSpacing: 1, fontSize: "0.8rem", textTransform: "uppercase" }}>JavaScript Quiz</p>
          <h4 className="fw-bold mt-3">Create Account</h4>
          <p className="text-muted small mt-2 mb-0">One attempt only. Make it count!</p>
        </div>
        {error && <div className="alert alert-danger py-2 small">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-semibold small">First Name</label>
            <input className="form-control form-control-lg" placeholder="Enter your first name" value={first_name} onChange={e => setFirst_name(e.target.value)} />
          </div>
          <div className="mb-4">
            <label className="form-label fw-semibold small">Password</label>
            <input type="password" className="form-control form-control-lg" placeholder="Min 4 characters" value={password} onChange={e => setPassword(e.target.value)} />
          </div>
          <button className="btn btn-lg w-100 text-white fw-bold border-0" style={{ background: "linear-gradient(135deg, #FF8C00, #FFA500)", borderRadius: 12, padding: "12px" }} disabled={loading}>
            {loading ? "Creating..." : "Register & Start Quiz"}
          </button>
        </form>
        <p className="text-center mt-4 mb-0 small">
          Already have an account? <Link to="/quiz/login" style={{ color: "#FF8C00", fontWeight: 600 }}>Login</Link>
        </p>
      </div>
    </div>
  );
}

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginStudent, checkSubmitted } from "../../services/quizApi";

export default function Login() {
  const [first_name, setFirst_name] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!first_name.trim() || !password) return setError("All fields are required");
    setLoading(true);
    try {
      const { data } = await loginStudent(first_name, password);
      localStorage.setItem("quiz_token", data.token);
      localStorage.setItem("quiz_user", data.student.first_name);

      const check = await checkSubmitted(data.student.first_name);
      if (check.data.alreadySubmitted) {
        localStorage.removeItem("quiz_token");
        localStorage.setItem("quiz_result", JSON.stringify(check.data.result));
        nav("/quiz/result");
      } else {
        nav("/quiz/take");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed");
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
          <h4 className="fw-bold mt-3">Welcome Back</h4>
        </div>
        {error && <div className="alert alert-danger py-2 small">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-semibold small">First Name</label>
            <input className="form-control form-control-lg" placeholder="Enter your first name" value={first_name} onChange={e => setFirst_name(e.target.value)} />
          </div>
          <div className="mb-4">
            <label className="form-label fw-semibold small">Password</label>
            <input type="password" className="form-control form-control-lg" placeholder="Enter your password" value={password} onChange={e => setPassword(e.target.value)} />
          </div>
          <button className="btn btn-lg w-100 text-white fw-bold border-0" style={{ background: "linear-gradient(135deg, #FF8C00, #FFA500)", borderRadius: 12, padding: "12px" }} disabled={loading}>
            {loading ? "Logging in..." : "Login & Start Quiz"}
          </button>
        </form>
        <p className="text-center mt-4 mb-0 small">
          Don't have an account? <Link to="/quiz/register" style={{ color: "#FF8C00", fontWeight: 600 }}>Register</Link>
        </p>
      </div>
    </div>
  );
}

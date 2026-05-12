import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

interface ResultData {
  student_name: string;
  score: number;
  total: number;
  correct_answers: number;
  wrong_answers: number;
  percentage: string;
}

export default function Result() {
  const [result, setResult] = useState<ResultData | null>(null);
  const nav = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem("quiz_result");
    if (!stored) { nav("/quiz/login"); return; }
    setResult(JSON.parse(stored));
  }, [nav]);

  if (!result) return null;

  const passed = parseInt(result.percentage) >= 50;
  const grade = parseInt(result.percentage) >= 80 ? "A" : parseInt(result.percentage) >= 65 ? "B" : parseInt(result.percentage) >= 50 ? "C" : "F";
  const icon = passed ? String.fromCodePoint(0x1F389) : String.fromCodePoint(0x1F614);
  const title = passed ? "Congratulations!" : "Keep Trying!";
  const subtitle = passed ? "You passed the JavaScript loop quiz." : "Review your answers and try again.";
  const scoreColor = passed ? "#28a745" : "#dc3545";

  const whatsappMessage =
    "IDTECH JavaScript Quiz Result%0A" +
    "%0AStudent: " + encodeURIComponent(result.student_name) +
    "%0AScore: " + result.score + "/" + result.total +
    "%0APercentage: " + result.percentage +
    "%0ACorrect: " + result.correct_answers +
    "%0AWrong: " + result.wrong_answers +
    "%0AGrade: " + grade +
    "%0ADate: " + new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });

  const whatsappUrl = "https://api.whatsapp.com/send?text=" + whatsappMessage;

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center p-3" style={{ background: "linear-gradient(135deg, #0f0c29, #302b63, #24243e)" }}>
      <div className="card border-0 shadow-lg p-4" style={{ width: "100%", maxWidth: 480, borderRadius: 24, background: "#fff" }}>
        <div className="text-center">
          <div className={`rounded-circle d-inline-flex align-items-center justify-content-center mb-3 ${passed ? "bg-success bg-opacity-10" : "bg-danger bg-opacity-10"}`} style={{ width: 80, height: 80 }}>
            <span className="fs-1">{icon}</span>
          </div>
          <h3 className="fw-bold" style={{ color: "#302b63" }}>{title}</h3>
          <p className="text-muted small">{subtitle}</p>
        </div>

        <div className="d-flex justify-content-center my-4">
          <div className="rounded-circle d-flex flex-column align-items-center justify-content-center" style={{
            width: 140,
            height: 140,
            background: "conic-gradient(" + scoreColor + " " + (parseInt(result.percentage) * 3.6) + "deg, #e9ecef 0deg)",
            borderRadius: "50%",
            position: "relative",
          }}>
            <div className="rounded-circle bg-white d-flex flex-column align-items-center justify-content-center" style={{ width: 120, height: 120, position: "absolute" }}>
              <span className="fw-bold" style={{ fontSize: "2rem", color: scoreColor }}>{result.percentage}</span>
              <small className="text-muted">Score</small>
            </div>
          </div>
        </div>

        <div className="row g-2 mb-4">
          <div className="col-4">
            <div className="p-3 rounded-3 text-center bg-light">
              <small className="text-muted d-block">Total</small>
              <span className="fw-bold fs-5">{result.total}</span>
            </div>
          </div>
          <div className="col-4">
            <div className="p-3 rounded-3 text-center bg-success bg-opacity-10">
              <small className="text-muted d-block">Correct</small>
              <span className="fw-bold fs-5 text-success">{result.correct_answers}</span>
            </div>
          </div>
          <div className="col-4">
            <div className="p-3 rounded-3 text-center bg-danger bg-opacity-10">
              <small className="text-muted d-block">Wrong</small>
              <span className="fw-bold fs-5 text-danger">{result.wrong_answers}</span>
            </div>
          </div>
        </div>

        <div className="text-center mb-4">
          <span className="badge fs-6 px-4 py-2" style={{
            background: grade === "A" ? "linear-gradient(135deg, #28a745, #20c997)" : grade === "B" ? "linear-gradient(135deg, #007bff, #0d6efd)" : grade === "C" ? "linear-gradient(135deg, #ffc107, #fd7e14)" : "linear-gradient(135deg, #dc3545, #c82333)",
            borderRadius: 20,
          }}>
            {"Grade: " + grade}
          </span>
        </div>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn w-100 fw-bold text-white mb-3 border-0"
          style={{ background: "#25D366", borderRadius: 12, padding: "12px" }}
        >
          {"Share Result on WhatsApp " + String.fromCodePoint(0x1F4AC)}
        </a>

        <div className="d-flex gap-2">
          <Link to="/quiz/login" className="btn w-50 fw-bold" style={{ background: "#f0f2f5", color: "#333", borderRadius: 12 }}>
            Back to Login
          </Link>
          <Link to="/" className="btn w-50 fw-bold text-white border-0" style={{ background: "linear-gradient(135deg, #FF8C00, #FFA500)", borderRadius: 12 }}>
            Home
          </Link>
        </div>
      </div>
    </div>
  );
}

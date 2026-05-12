import { Link } from "react-router-dom";

export default function QuizHome() {
  const token = localStorage.getItem("quiz_token");
  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center p-3" style={{ background: "linear-gradient(135deg, #0f0c29, #302b63, #24243e)" }}>
      <div className="text-center" style={{ maxWidth: 520 }}>
        <div className="mb-4">
          <span style={{ fontSize: "4rem" }}>{String.fromCodePoint(0x1F4DD)}</span>
        </div>
        <h1 className="text-white fw-bold mb-2" style={{ fontSize: "2.5rem" }}>JavaScript Quiz</h1>
        <p className="text-white-50 mb-1" style={{ fontSize: "1.1rem" }}>Test your JavaScript knowledge</p>
        <p className="text-white-50 mb-4" style={{ fontSize: "0.9rem" }}>
          {String(50) + " Questions \u2022 30 Minutes \u2022 Multiple Choice"}
        </p>
        <div className="d-flex flex-wrap gap-3 justify-content-center">
          {token ? (
            <Link to="/quiz/take" className="btn btn-lg fw-bold text-white border-0 px-5 py-3" style={{ background: "linear-gradient(135deg, #FF8C00, #FFA500)", borderRadius: 16, fontSize: "1.1rem" }}>
              {"Continue Quiz " + String.fromCodePoint(0x2192)}
            </Link>
          ) : (
            <>
              <Link to="/quiz/register" className="btn btn-lg fw-bold text-white border-0 px-5 py-3" style={{ background: "linear-gradient(135deg, #FF8C00, #FFA500)", borderRadius: 16, fontSize: "1.1rem" }}>
                {"Get Started " + String.fromCodePoint(0x2192)}
              </Link>
              <Link to="/quiz/login" className="btn btn-lg fw-bold px-5 py-3" style={{ background: "rgba(255,255,255,0.1)", color: "#fff", borderRadius: 16, border: "2px solid rgba(255,255,255,0.2)", fontSize: "1.1rem" }}>
                Login
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

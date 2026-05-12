import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { fetchQuestions, submitQuiz, checkSubmitted } from "../../services/quizApi";

const NUMBER_OF_QUESTIONS = 15;
const MINUTES = 15;
const ARROW_LEFT = String.fromCodePoint(0x2190);
const ARROW_RIGHT = String.fromCodePoint(0x2192);

export default function Quiz() {
  const [questions, setQuestions] = useState<any[]>([]);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [timeLeft, setTimeLeft] = useState(MINUTES * 60);
  const [submitting, setSubmitting] = useState(false);
  const nav = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("quiz_token");
    const user = localStorage.getItem("quiz_user");
    if (!token || !user) { nav("/quiz/login"); return; }

    const load = async () => {
      try {
        const { data: check } = await checkSubmitted(user);
        if (check.alreadySubmitted) {
          localStorage.removeItem("quiz_token");
          localStorage.setItem("quiz_result", JSON.stringify(check.result));
          nav("/quiz/result");
        } else {
          const { data: q } = await fetchQuestions();
          setQuestions(q.questions);
        }
      } catch {
        nav("/quiz/login");
      }
    };
    load();
  }, [nav]);

  const handleSubmit = useCallback(() => {
    if (submitting) return;
    setSubmitting(true);
    const token = localStorage.getItem("quiz_token");
    if (!token) return nav("/quiz/login");
    submitQuiz(token, answers).then(function (response) {
      var data = response.data;
      localStorage.removeItem("quiz_token");
      localStorage.setItem("quiz_result", JSON.stringify(data.result));
      nav("/quiz/result");
    }).catch(function (err) {
      var msg = (err.response && err.response.data && err.response.data.message) || "Submission failed. Try again.";
      alert(msg);
      if (msg.indexOf("already taken") !== -1) {
        nav("/quiz/login");
      }
      setSubmitting(false);
    });
  }, [answers, nav, submitting]);

  useEffect(function () {
    if (timeLeft <= 0) { handleSubmit(); return; }
    var t = setInterval(function () { setTimeLeft(function (p) { return p - 1; }); }, 1000);
    return function () { clearInterval(t); };
  }, [timeLeft]);

  const handleOption = (qId: number, opt: string) => {
    setAnswers(prev => ({ ...prev, [qId]: opt }));
  };

  const answered = Object.keys(answers).length;
  const progress = Math.round((answered / NUMBER_OF_QUESTIONS) * 100);
  const mins = Math.floor(timeLeft / 60);
  const secs = timeLeft % 60;

  if (!questions.length) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center" style={{ background: "linear-gradient(135deg, #0f0c29, #302b63, #24243e)" }}>
        <div className="spinner-border text-warning" role="status" />
      </div>
    );
  }

  const q = questions[current];
  const selected = answers[q.id] || "";
  return (
    <div style={{ background: "#f0f2f5", minHeight: "100vh" }}>
      <div className="sticky-top shadow-sm" style={{ background: "linear-gradient(135deg, #302b63, #24243e)", padding: "10px 20px" }}>
        <div className="d-flex justify-content-between align-items-center" style={{ maxWidth: 800, margin: "0 auto" }}>
          <div>
            <span className="text-white fw-bold small">IDTECH QUIZ</span>
            <span className="text-white-50 ms-2 small">| {localStorage.getItem("quiz_user")}</span>
          </div>
          <div className="d-flex align-items-center gap-3">
            <span className="text-white small d-none d-sm-inline">{answered}/{NUMBER_OF_QUESTIONS} answered</span>
            <span className={`badge ${timeLeft < 120 ? "bg-danger" : "bg-warning text-dark"} fs-6 px-3 py-2`}>
              {String(mins).padStart(2, "0")}:{String(secs).padStart(2, "0")}
            </span>
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="btn btn-sm text-white fw-bold px-3 border-0"
              style={{ background: "#dc3545", borderRadius: 8, fontSize: "0.8rem" }}
            >
              {submitting ? "..." : "Submit"}
            </button>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 800, margin: "0 auto", padding: "20px" }}>
        <div className="mb-3">
          <div className="d-flex justify-content-between mb-1">
            <small className="fw-semibold">Progress</small>
            <small className="fw-semibold">{progress}%</small>
          </div>
          <div className="progress" style={{ height: 8, borderRadius: 10 }}>
            <div className="progress-bar" style={{ width: `${progress}%`, background: "linear-gradient(90deg, #FF8C00, #FFA500)", borderRadius: 10 }} />
          </div>
        </div>

        <div className="card border-0 shadow-sm mb-3" style={{ borderRadius: 16 }}>
          <div className="card-body p-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <span className="badge bg-secondary px-3 py-2">Question {current + 1} of {NUMBER_OF_QUESTIONS}</span>
            </div>
            <h5 className="fw-bold mb-4" style={{ color: "#302b63", lineHeight: 1.5 }}>{q.question}</h5>
            <div className="d-flex flex-column gap-2">
              {q.options.map((opt: string, i: number) => {
                const letter = String.fromCharCode(65 + i);
                return (
                  <button
                    key={i}
                    onClick={() => handleOption(q.id, opt)}
                    className={`btn btn-lg text-start d-block w-100 border ${selected === opt ? "text-white border-0" : "border-secondary-subtle"}`}
                    style={{
                      borderRadius: 12,
                      padding: "12px 18px",
                      background: selected === opt ? "linear-gradient(135deg, #FF8C00, #FFA500)" : "#fff",
                      color: selected === opt ? "#fff" : "#333",
                      transition: "all 0.2s",
                    }}
                  >
                    <span className="fw-semibold me-2">{letter}.</span> {opt}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="d-flex justify-content-between gap-2 flex-wrap">
          <div className="d-flex gap-2 flex-wrap">
            <button
              onClick={() => setCurrent(p => Math.max(0, p - 1))}
              disabled={current === 0}
              className="btn btn-outline-secondary px-4"
              style={{ borderRadius: 10 }}
            >
              {ARROW_LEFT + " Previous"}
            </button>
            <button
              onClick={() => setCurrent(p => Math.min(NUMBER_OF_QUESTIONS - 1, p + 1))}
              disabled={current === NUMBER_OF_QUESTIONS - 1}
              className="btn btn-outline-secondary px-4"
              style={{ borderRadius: 10 }}
            >
              {"Next " + ARROW_RIGHT}
            </button>
          </div>
        </div>

        <div className="mt-4">
          <small className="fw-semibold text-muted">Question Navigator</small>
          <div className="d-flex flex-wrap gap-1 mt-1">
            {questions.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`btn btn-sm ${answers[questions[i]?.id] ? "text-white" : "btn-outline-secondary"} ${current === i ? "border-warning border-2" : ""}`}
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: 8,
                  fontSize: "0.75rem",
                  background: answers[questions[i]?.id] ? "linear-gradient(135deg, #FF8C00, #FFA500)" : undefined,
                  borderColor: current === i ? "#FF8C00" : undefined,
                }}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

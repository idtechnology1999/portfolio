import { useEffect, useState } from "react";
import { fetchResults, fetchStudents, deleteResult } from "../../services/quizApi";

export default function QuizAdmin() {
  const [results, setResults] = useState<any[]>([]);
  const [students, setStudents] = useState<any[]>([]);
  const [tab, setTab] = useState<"results" | "students">("results");
  const [search, setSearch] = useState("");

  useEffect(() => { loadData(); }, []);

  const loadData = async () => {
    try {
      const [r, s] = await Promise.all([fetchResults(), fetchStudents()]);
      setResults(r.data.results);
      setStudents(s.data.students);
    } catch { alert("Failed to load data"); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this result?")) return;
    await deleteResult(id);
    loadData();
  };

  const filteredResults = results.filter(r =>
    r.student_name?.toLowerCase().includes(search.toLowerCase())
  );

  const avg = results.length
    ? (results.reduce((sum, r) => sum + parseInt(r.percentage), 0) / results.length).toFixed(1)
    : "0";

  const exportCSV = () => {
    const header = "Student,Score,Correct,Wrong,Percentage,Date\n";
    const rows = results.map(r =>
      `"${r.student_name}",${r.score},${r.correct_answers},${r.wrong_answers},${r.percentage},"${new Date(r.submitted_at).toLocaleDateString()}"`
    ).join("\n");
    const blob = new Blob([header + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "quiz-results.csv"; a.click();
  };

  return (
    <div style={{ background: "#f0f2f5", minHeight: "100vh" }}>
      <div className="sticky-top shadow-sm" style={{ background: "linear-gradient(135deg, #302b63, #24243e)", padding: "12px 20px" }}>
        <div className="d-flex justify-content-between align-items-center" style={{ maxWidth: 1000, margin: "0 auto" }}>
          <h5 className="text-white fw-bold mb-0">Quiz Admin Dashboard</h5>
          <button className="btn btn-sm btn-outline-light" onClick={exportCSV}>Export CSV</button>
        </div>
      </div>

      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "20px" }}>
        {/* Stats Cards */}
        <div className="row g-3 mb-4">
          <div className="col-md-3 col-6">
            <div className="card border-0 shadow-sm p-3 text-center" style={{ borderRadius: 16 }}>
              <h2 className="fw-bold" style={{ color: "#302b63" }}>{students.length}</h2>
              <small className="text-muted">Students</small>
            </div>
          </div>
          <div className="col-md-3 col-6">
            <div className="card border-0 shadow-sm p-3 text-center" style={{ borderRadius: 16 }}>
              <h2 className="fw-bold" style={{ color: "#FF8C00" }}>{results.length}</h2>
              <small className="text-muted">Submissions</small>
            </div>
          </div>
          <div className="col-md-3 col-6">
            <div className="card border-0 shadow-sm p-3 text-center" style={{ borderRadius: 16 }}>
              <h2 className="fw-bold" style={{ color: "#28a745" }}>{avg}%</h2>
              <small className="text-muted">Avg Score</small>
            </div>
          </div>
          <div className="col-md-3 col-6">
            <div className="card border-0 shadow-sm p-3 text-center" style={{ borderRadius: 16 }}>
              <h2 className="fw-bold" style={{ color: "#dc3545" }}>
                {results.filter(r => parseInt(r.percentage) < 50).length}
              </h2>
              <small className="text-muted">Failed</small>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="d-flex gap-2 mb-3">
          <button onClick={() => setTab("results")} className={`btn fw-semibold ${tab === "results" ? "text-white" : "btn-light"}`} style={tab === "results" ? { background: "linear-gradient(135deg, #FF8C00, #FFA500)", borderRadius: 10, border: "none" } : { borderRadius: 10 }}>
            Results
          </button>
          <button onClick={() => setTab("students")} className={`btn fw-semibold ${tab === "students" ? "text-white" : "btn-light"}`} style={tab === "students" ? { background: "linear-gradient(135deg, #FF8C00, #FFA500)", borderRadius: 10, border: "none" } : { borderRadius: 10 }}>
            Students
          </button>
          <input className="form-control form-control-sm ms-auto" style={{ maxWidth: 200, borderRadius: 10 }} placeholder="Search student..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>

        {/* Results Table */}
        {tab === "results" && (
          <div className="card border-0 shadow-sm" style={{ borderRadius: 16, overflow: "hidden" }}>
            <div className="table-responsive">
              <table className="table table-hover mb-0 align-middle">
                <thead style={{ background: "#302b63", color: "#fff" }}>
                  <tr>
                    <th className="py-3 ps-3">Student</th>
                    <th className="py-3">Score</th>
                    <th className="py-3">Correct</th>
                    <th className="py-3">Wrong</th>
                    <th className="py-3">Percentage</th>
                    <th className="py-3">Date</th>
                    <th className="py-3 pe-3">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredResults.map(r => (
                    <tr key={r._id}>
                      <td className="ps-3 fw-semibold">{r.student_name}</td>
                      <td>{r.score}/{r.correct_answers + r.wrong_answers}</td>
                      <td><span className="text-success fw-semibold">{r.correct_answers}</span></td>
                      <td><span className="text-danger fw-semibold">{r.wrong_answers}</span></td>
                      <td><span className={`badge ${parseInt(r.percentage) >= 50 ? "bg-success" : "bg-danger"} px-3 py-2`}>{r.percentage}</span></td>
                      <td style={{ fontSize: "0.85rem" }}>{new Date(r.submitted_at).toLocaleDateString()}</td>
                      <td className="pe-3">
                        <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(r._id)}>Delete</button>
                      </td>
                    </tr>
                  ))}
                  {!filteredResults.length && (
                    <tr><td colSpan={7} className="text-center py-4 text-muted">No results found</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Students Table */}
        {tab === "students" && (
          <div className="card border-0 shadow-sm" style={{ borderRadius: 16, overflow: "hidden" }}>
            <div className="table-responsive">
              <table className="table table-hover mb-0 align-middle">
                <thead style={{ background: "#302b63", color: "#fff" }}>
                  <tr>
                    <th className="py-3 ps-3">#</th>
                    <th className="py-3">First Name</th>
                    <th className="py-3">Registered</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((s, i) => (
                    <tr key={s._id}>
                      <td className="ps-3">{i + 1}</td>
                      <td className="fw-semibold">{s.first_name}</td>
                      <td style={{ fontSize: "0.85rem" }}>{new Date(s.created_at).toLocaleDateString()}</td>
                    </tr>
                  ))}
                  {!students.length && (
                    <tr><td colSpan={3} className="text-center py-4 text-muted">No students registered</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

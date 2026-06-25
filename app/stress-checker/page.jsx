'use client';
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../lib/supabase";

const questions = [
  {
    id: "mood",
    question: "How would you describe your overall mood today?",
    options: [
      { label: "Very low — feeling sad or empty", score: 1 },
      { label: "Low — not quite myself", score: 2 },
      { label: "Okay — managing fine", score: 3 },
      { label: "Good — feeling positive", score: 4 },
    ]
  },
  {
    id: "energy",
    question: "How are your energy levels today?",
    options: [
      { label: "Exhausted — no energy at all", score: 1 },
      { label: "Tired — low energy", score: 2 },
      { label: "Moderate — getting through the day", score: 3 },
      { label: "Energetic — feeling active", score: 4 },
    ]
  },
  {
    id: "sleep",
    question: "How did you sleep last night?",
    options: [
      { label: "Very poorly — barely slept", score: 1 },
      { label: "Poorly — woke up many times", score: 2 },
      { label: "Okay — could have been better", score: 3 },
      { label: "Well — felt rested", score: 4 },
    ]
  },
  {
    id: "pressure",
    question: "How much pressure or stress are you feeling today?",
    options: [
      { label: "Overwhelming — can barely cope", score: 1 },
      { label: "High — feeling very stressed", score: 2 },
      { label: "Moderate — manageable", score: 3 },
      { label: "Low — feeling calm", score: 4 },
    ]
  },
  {
    id: "connection",
    question: "How connected do you feel to the people around you?",
    options: [
      { label: "Very isolated — completely alone", score: 1 },
      { label: "Disconnected — not reaching out", score: 2 },
      { label: "Somewhat connected", score: 3 },
      { label: "Very connected — supported", score: 4 },
    ]
  },
];

const getResult = (score) => {
  if (score <= 8) return {
    level: "High stress",
    color: "#e53e3e",
    bg: "#FFF5F5",
    border: "#FEB2B2",
    message: "You seem to be going through a very difficult time. Please know that support is available and reaching out is a sign of strength. We strongly encourage you to speak with one of our counsellors.",
    recommendation: "book",
    emoji: "🔴",
  };
  if (score <= 12) return {
    level: "Moderate stress",
    color: "#D97706",
    bg: "#FFFBEB",
    border: "#FCD34D",
    message: "You are experiencing some emotional difficulty. This is normal — many people go through periods like this. Talking to someone, even for one session, can make a real difference.",
    recommendation: "chat",
    emoji: "🟡",
  };
  if (score <= 16) return {
    level: "Mild stress",
    color: "#0F6E56",
    bg: "#E1F5EE",
    border: "#9FE1CB",
    message: "You seem to be coping reasonably well. Keep checking in with yourself — our peer chat rooms and wellness content are great ways to stay grounded.",
    recommendation: "content",
    emoji: "🟢",
  };
  return {
    level: "Doing well",
    color: "#0F6E56",
    bg: "#E1F5EE",
    border: "#9FE1CB",
    message: "You are doing well today. Keep up the good habits and remember Solace is here whenever you need it.",
    recommendation: "content",
    emoji: "✅",
  };
};

export default function StressChecker() {
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [totalScore, setTotalScore] = useState(0);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    const { data } = await supabase
      .from("stress_checkins")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(7);
    if (data) setHistory(data);
  };

  const handleAnswer = (questionId, score) => {
    const newAnswers = { ...answers, [questionId]: score };
    setAnswers(newAnswers);
    if (currentQ < questions.length - 1) {
      setTimeout(() => setCurrentQ(currentQ + 1), 300);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    const score = Object.values(answers).reduce((a, b) => a + b, 0);
    setTotalScore(score);
    const { data: { user } } = await supabase.auth.getUser();
    await supabase.from("stress_checkins").insert({
      user_id: user ? user.id : "anonymous",
      mood: answers.mood || 0,
      energy: answers.energy || 0,
      sleep: answers.sleep || 0,
      pressure: answers.pressure || 0,
      connection: answers.connection || 0,
      total_score: score,
      created_at: new Date().toISOString(),
    });
    setLoading(false);
    setSubmitted(true);
    fetchHistory();
  };

  const progress = ((currentQ + 1) / questions.length) * 100;
  const allAnswered = Object.keys(answers).length === questions.length;
  const result = getResult(totalScore);

  return (
    <main style={{ fontFamily: "Arial, sans-serif", background: "#f5f5f5", minHeight: "100vh" }}>

      {/* NAV */}
      <nav style={{ background: "#fff", padding: "14px 32px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #e0e0e0", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
        <img src="/logo.png" alt="Solace" style={{ height: "40px", objectFit: "contain" }} />
        <div style={{ display: "flex", gap: "16px" }}>
          {[
            { label: "Dashboard", path: "/dashboard" },
            { label: "Counsellors", path: "/counsellors" },
            { label: "Group Therapy", path: "/group-therapy" },
            { label: "Peer Chat", path: "/chat" },
            { label: "Stress Checker", path: "/stress-checker" },
          ].map((item) => (
            <button key={item.path} onClick={() => router.push(item.path)}
              style={{ background: "none", border: "none", color: "#0F6E56", fontSize: "14px", cursor: "pointer", fontWeight: "500" }}>
              {item.label}
            </button>
          ))}
        </div>
      </nav>

      <div style={{ maxWidth: "640px", margin: "0 auto", padding: "32px 24px" }}>

        {!submitted ? (
          <>
            <h2 style={{ fontSize: "22px", fontWeight: "600", color: "#1a1a1a", marginBottom: "4px" }}>Daily wellbeing check-in</h2>
            <p style={{ fontSize: "14px", color: "#666", marginBottom: "24px" }}>5 quick questions to help you understand how you are feeling. Completely private.</p>

            {/* PROGRESS BAR */}
            <div style={{ background: "#e0e0e0", borderRadius: "4px", height: "6px", marginBottom: "28px", overflow: "hidden" }}>
              <div style={{ background: "#0F6E56", height: "100%", width: `${progress}%`, borderRadius: "4px", transition: "width 0.3s" }} />
            </div>

            {/* QUESTION */}
            <div style={{ background: "#fff", borderRadius: "16px", padding: "28px", border: "1px solid #e0e0e0", marginBottom: "16px" }}>
              <p style={{ fontSize: "11px", fontWeight: "500", color: "#888", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "12px" }}>
                Question {currentQ + 1} of {questions.length}
              </p>
              <h3 style={{ fontSize: "17px", fontWeight: "600", color: "#1a1a1a", marginBottom: "20px", lineHeight: "1.5" }}>
                {questions[currentQ].question}
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {questions[currentQ].options.map((opt, i) => (
                  <button key={i}
                    onClick={() => handleAnswer(questions[currentQ].id, opt.score)}
                    style={{
                      padding: "14px 16px", borderRadius: "10px", textAlign: "left", fontSize: "14px", cursor: "pointer",
                      border: `1px solid ${answers[questions[currentQ].id] === opt.score ? "#0F6E56" : "#e0e0e0"}`,
                      background: answers[questions[currentQ].id] === opt.score ? "#E1F5EE" : "#fff",
                      color: answers[questions[currentQ].id] === opt.score ? "#0F4A3A" : "#444",
                      fontWeight: answers[questions[currentQ].id] === opt.score ? "500" : "400",
                    }}>
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* NAVIGATION */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <button onClick={() => currentQ > 0 && setCurrentQ(currentQ - 1)}
                style={{ background: "none", border: "none", color: currentQ > 0 ? "#0F6E56" : "#ccc", fontSize: "14px", cursor: currentQ > 0 ? "pointer" : "not-allowed", fontWeight: "500" }}>
                ← Previous
              </button>
              {currentQ < questions.length - 1 ? (
                <button onClick={() => answers[questions[currentQ].id] && setCurrentQ(currentQ + 1)}
                  style={{ background: answers[questions[currentQ].id] ? "#0F6E56" : "#ccc", color: "#fff", border: "none", padding: "10px 20px", borderRadius: "8px", fontSize: "14px", fontWeight: "500", cursor: answers[questions[currentQ].id] ? "pointer" : "not-allowed" }}>
                  Next →
                </button>
              ) : (
                <button onClick={handleSubmit}
                  disabled={!allAnswered || loading}
                  style={{ background: allAnswered ? "#0F6E56" : "#ccc", color: "#fff", border: "none", padding: "10px 20px", borderRadius: "8px", fontSize: "14px", fontWeight: "500", cursor: allAnswered ? "pointer" : "not-allowed" }}>
                  {loading ? "Saving..." : "See my results →"}
                </button>
              )}
            </div>

            {/* PAST CHECK-INS */}
            {history.length > 0 && (
              <div style={{ marginTop: "40px" }}>
                <p style={{ fontSize: "11px", fontWeight: "500", color: "#888", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "12px" }}>Your recent check-ins</p>
                <div style={{ background: "#fff", borderRadius: "12px", padding: "20px", border: "1px solid #e0e0e0" }}>
                  <div style={{ display: "flex", gap: "8px", alignItems: "flex-end", height: "80px" }}>
                    {history.slice().reverse().map((h, i) => {
                      const heightPct = (h.total_score / 20) * 100;
                      const barColor = h.total_score <= 8 ? "#e53e3e" : h.total_score <= 12 ? "#D97706" : "#0F6E56";
                      return (
                        <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}>
                          <div style={{ width: "100%", background: barColor, borderRadius: "4px 4px 0 0", height: `${heightPct}%`, minHeight: "4px" }} />
                          <span style={{ fontSize: "10px", color: "#999" }}>{h.total_score}</span>
                        </div>
                      );
                    })}
                  </div>
                  <p style={{ fontSize: "12px", color: "#999", textAlign: "center", marginTop: "8px" }}>Last {history.length} check-ins — higher score means lower stress</p>
                </div>
              </div>
            )}
          </>
        ) : (
          <>
            {/* RESULTS */}
            <div style={{ background: result.bg, borderRadius: "16px", padding: "32px", border: `1px solid ${result.border}`, marginBottom: "24px", textAlign: "center" }}>
              <div style={{ fontSize: "48px", marginBottom: "12px" }}>{result.emoji}</div>
              <h2 style={{ fontSize: "22px", fontWeight: "600", color: result.color, marginBottom: "8px" }}>{result.level}</h2>
              <p style={{ fontSize: "15px", color: result.color, lineHeight: "1.7", marginBottom: "8px" }}>
                Your score: <strong>{totalScore} / 20</strong>
              </p>
              <p style={{ fontSize: "14px", color: "#444", lineHeight: "1.7" }}>{result.message}</p>
            </div>

            {/* SCORE BREAKDOWN */}
            <div style={{ background: "#fff", borderRadius: "12px", padding: "20px", border: "1px solid #e0e0e0", marginBottom: "20px" }}>
              <p style={{ fontSize: "13px", fontWeight: "600", color: "#444", marginBottom: "14px" }}>Your breakdown</p>
              {questions.map((q) => {
                const score = answers[q.id] || 0;
                const pct = (score / 4) * 100;
                const barColor = score <= 1 ? "#e53e3e" : score <= 2 ? "#D97706" : "#0F6E56";
                return (
                  <div key={q.id} style={{ marginBottom: "12px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                      <span style={{ fontSize: "13px", color: "#666" }}>{q.id.charAt(0).toUpperCase() + q.id.slice(1)}</span>
                      <span style={{ fontSize: "13px", fontWeight: "500", color: barColor }}>{score}/4</span>
                    </div>
                    <div style={{ background: "#e0e0e0", borderRadius: "4px", height: "6px", overflow: "hidden" }}>
                      <div style={{ background: barColor, height: "100%", width: `${pct}%`, borderRadius: "4px" }} />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* RECOMMENDATIONS */}
            <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "20px" }}>
              {result.recommendation === "book" && (
                <button onClick={() => router.push("/counsellors")}
                  style={{ background: "#0F6E56", color: "#fff", border: "none", padding: "14px", borderRadius: "10px", fontSize: "15px", fontWeight: "600", cursor: "pointer" }}>
                  🎧 Book a counselling session
                </button>
              )}
              {(result.recommendation === "chat" || result.recommendation === "book") && (
                <button onClick={() => router.push("/chat")}
                  style={{ background: result.recommendation === "book" ? "#fff" : "#0F6E56", color: result.recommendation === "book" ? "#0F6E56" : "#fff", border: "1px solid #0F6E56", padding: "14px", borderRadius: "10px", fontSize: "15px", fontWeight: "600", cursor: "pointer" }}>
                  💬 Join a peer support room
                </button>
              )}
              <button onClick={() => window.open("https://www.youtube.com/@solace.et_official", "_blank")}
                style={{ background: "#fff", color: "#444", border: "1px solid #e0e0e0", padding: "14px", borderRadius: "10px", fontSize: "15px", fontWeight: "500", cursor: "pointer" }}>
                ▶ Watch free wellness content
              </button>
            </div>

            <button onClick={() => { setSubmitted(false); setCurrentQ(0); setAnswers({}); }}
              style={{ width: "100%", background: "none", border: "none", color: "#0F6E56", fontSize: "14px", cursor: "pointer", fontWeight: "500", padding: "8px" }}>
              ← Check in again
            </button>

            <button onClick={() => router.push("/dashboard")}
              style={{ width: "100%", background: "none", border: "none", color: "#888", fontSize: "13px", cursor: "pointer", padding: "8px" }}>
              Back to dashboard
            </button>
          </>
        )}
      </div>
    </main>
  );
}
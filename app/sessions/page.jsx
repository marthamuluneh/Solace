'use client';
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../lib/supabase";

export default function Sessions() {
  const [upcoming, setUpcoming] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancelling, setCancelling] = useState(null);
  const router = useRouter();

  useEffect(() => {
    fetchSessions();
  }, []);

  const fetchSessions = async () => {
    setLoading(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      router.push("/onboarding");
      return;
    }
    const { data } = await supabase
      .from("bookings")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (data) {
      setUpcoming(data.filter(b => b.status === "upcoming"));
      setCompleted(data.filter(b => b.status === "completed"));
    }
    setLoading(false);
  };

  const cancelSession = async (id) => {
    setCancelling(id);
    await supabase
      .from("bookings")
      .delete()
      .eq("id", id);
    await fetchSessions();
    setCancelling(null);
  };

  const getInitials = (name) => {
    return name.split(" ").map(n => n[0]).join("").toUpperCase();
  };

  const colors = ["#0F6E56", "#185FA5", "#854F0B", "#993356"];

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

      <div style={{ maxWidth: "760px", margin: "0 auto", padding: "32px 24px" }}>

        {/* HEADER */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "28px" }}>
          <div>
            <h2 style={{ fontSize: "22px", fontWeight: "600", color: "#1a1a1a", marginBottom: "4px" }}>My sessions</h2>
            <p style={{ fontSize: "14px", color: "#666" }}>All your booked and completed sessions</p>
          </div>
          <button onClick={() => router.push("/counsellors")}
            style={{ background: "#0F6E56", color: "#fff", border: "none", padding: "10px 20px", borderRadius: "8px", fontSize: "14px", fontWeight: "500", cursor: "pointer" }}>
            + Book new session
          </button>
        </div>

        {loading ? (
          <p style={{ textAlign: "center", color: "#888", fontSize: "14px", padding: "40px" }}>Loading your sessions...</p>
        ) : (
          <>
            {/* UPCOMING SESSIONS */}
            <p style={{ fontSize: "11px", fontWeight: "600", color: "#888", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "12px" }}>
              Upcoming sessions ({upcoming.length})
            </p>

            {upcoming.length === 0 ? (
              <div style={{ background: "#fff", borderRadius: "12px", padding: "32px", border: "1px solid #e0e0e0", textAlign: "center", marginBottom: "28px" }}>
                <div style={{ fontSize: "32px", marginBottom: "10px" }}>📅</div>
                <p style={{ fontSize: "15px", fontWeight: "500", color: "#444", marginBottom: "6px" }}>No upcoming sessions</p>
                <p style={{ fontSize: "13px", color: "#888", marginBottom: "16px" }}>Book a session with one of our licensed counsellors</p>
                <button onClick={() => router.push("/counsellors")}
                  style={{ background: "#0F6E56", color: "#fff", border: "none", padding: "10px 20px", borderRadius: "8px", fontSize: "13px", fontWeight: "500", cursor: "pointer" }}>
                  Find a counsellor
                </button>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "32px" }}>
                {upcoming.map((session, i) => (
                  <div key={session.id} style={{ background: "#fff", borderRadius: "12px", padding: "20px", border: "1px solid #e0e0e0", display: "flex", alignItems: "center", gap: "14px" }}>
                    <div style={{ width: "46px", height: "46px", borderRadius: "50%", background: colors[i % colors.length], display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: "600", fontSize: "14px", minWidth: "46px" }}>
                      {getInitials(session.counsellor_name)}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: "15px", fontWeight: "600", color: "#1a1a1a", marginBottom: "4px" }}>
                        {session.counsellor_name}
                      </div>
                      <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                        <span style={{ fontSize: "12px", color: "#666" }}>
                          {session.session_type === "group" ? "👥 Group therapy" : session.session_type === "online" ? "🎧 Online session" : "📍 In-person session"}
                        </span>
                        <span style={{ fontSize: "12px", color: "#666" }}>📅 {session.slot}</span>
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                      <span style={{ background: "#E1F5EE", color: "#0F6E56", fontSize: "11px", fontWeight: "500", padding: "4px 10px", borderRadius: "20px" }}>
                        Upcoming
                      </span>
                      <button
                        onClick={() => cancelSession(session.id)}
                        disabled={cancelling === session.id}
                        style={{ background: cancelling === session.id ? "#f5f5f5" : "#fff", color: cancelling === session.id ? "#ccc" : "#e53e3e", border: "1px solid", borderColor: cancelling === session.id ? "#e0e0e0" : "#e53e3e", padding: "6px 14px", borderRadius: "8px", fontSize: "12px", fontWeight: "500", cursor: cancelling === session.id ? "not-allowed" : "pointer" }}>
                        {cancelling === session.id ? "Cancelling..." : "Cancel"}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* COMPLETED SESSIONS */}
            <p style={{ fontSize: "11px", fontWeight: "600", color: "#888", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "12px" }}>
              Completed sessions ({completed.length})
            </p>

            {completed.length === 0 ? (
              <div style={{ background: "#fff", borderRadius: "12px", padding: "24px", border: "1px solid #e0e0e0", textAlign: "center" }}>
                <p style={{ fontSize: "14px", color: "#888" }}>No completed sessions yet</p>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {completed.map((session, i) => (
                  <div key={session.id} style={{ background: "#fff", borderRadius: "12px", padding: "20px", border: "1px solid #e0e0e0", display: "flex", alignItems: "center", gap: "14px", opacity: 0.7 }}>
                    <div style={{ width: "46px", height: "46px", borderRadius: "50%", background: "#ccc", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: "600", fontSize: "14px", minWidth: "46px" }}>
                      {getInitials(session.counsellor_name)}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: "15px", fontWeight: "600", color: "#1a1a1a", marginBottom: "4px" }}>
                        {session.counsellor_name}
                      </div>
                      <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                        <span style={{ fontSize: "12px", color: "#666" }}>
                          {session.session_type === "group" ? "👥 Group therapy" : session.session_type === "online" ? "🎧 Online session" : "📍 In-person session"}
                        </span>
                        <span style={{ fontSize: "12px", color: "#666" }}>📅 {session.slot}</span>
                      </div>
                    </div>
                    <span style={{ background: "#f5f5f5", color: "#888", fontSize: "11px", fontWeight: "500", padding: "4px 10px", borderRadius: "20px" }}>
                      Completed
                    </span>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}
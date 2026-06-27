'use client';
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../lib/supabase";

export default function Dashboard() {
  const router = useRouter();
  const [upcoming, setUpcoming] = useState(0);
  const [completed, setCompleted] = useState(0);
  const [days, setDays] = useState(0);
  const [nextSession, setNextSession] = useState(null);
  const [username, setUsername] = useState("");

  const fetchData = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { router.push("/onboarding"); return; }

    // Get username
    if (user.user_metadata?.username) {
      setUsername(user.user_metadata.username);
    }

    // Get bookings
    const { data: bookingData } = await supabase
      .from("bookings")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (bookingData) {
      const upcomingList = bookingData.filter(b => b.status === "upcoming");
      const completedList = bookingData.filter(b => b.status === "completed");
      setUpcoming(upcomingList.length);
      setCompleted(completedList.length);
      if (upcomingList.length > 0) setNextSession(upcomingList[0]);
      else setNextSession(null);
    }

    // Get days with Solace
    const { data: profileData } = await supabase
      .from("user_profiles")
      .select("joined_at")
      .eq("user_id", user.id)
      .single();

    if (profileData?.joined_at) {
      const joinDate = new Date(profileData.joined_at);
      const today = new Date();
      const diffTime = Math.abs(today - joinDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setDays(diffDays);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const navItems = [
    { label: "Dashboard", path: "/dashboard" },
    { label: "Counsellors", path: "/counsellors" },
    { label: "Group Therapy", path: "/group-therapy" },
    { label: "Peer Chat", path: "/chat" },
    { label: "Stress Checker", path: "/stress-checker" },
  ];

  return (
    <main style={{ fontFamily: "Arial, sans-serif", background: "#f5f5f5", minHeight: "100vh" }}>

      {/* NAV */}
      <nav style={{ background: "#fff", padding: "14px 32px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #e0e0e0", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
        <img src="/logo.png" alt="Solace" style={{ height: "40px", objectFit: "contain", cursor: "pointer" }} onClick={() => router.push("/")} />
        <div style={{ display: "flex", gap: "16px" }}>
          {navItems.map((item) => (
            <button key={item.path} onClick={() => router.push(item.path)}
              style={{ background: "none", border: "none", color: "#0F6E56", fontSize: "14px", cursor: "pointer", fontWeight: "500" }}>
              {item.label}
            </button>
          ))}
        </div>
      </nav>

      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "32px 24px" }}>

        {/* HEADER */}
        <div style={{ marginBottom: "24px" }}>
          <h2 style={{ fontSize: "22px", fontWeight: "600", color: "#1a1a1a", marginBottom: "4px" }}>
            Welcome back{username ? `, ${username}` : ""}
          </h2>
          <p style={{ fontSize: "14px", color: "#666" }}>Here is what is available for you today</p>
        </div>

        {/* STATS */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px", marginBottom: "28px" }}>
          {[
            { val: String(completed), label: "Sessions completed", icon: "✅" },
            { val: String(upcoming), label: "Upcoming sessions", icon: "📅" },
            { val: String(days), label: "Days with Solace", icon: "🌱" },
          ].map((s, i) => (
            <div key={i} style={{ background: "#fff", borderRadius: "12px", padding: "20px", border: "1px solid #e0e0e0" }}>
              <div style={{ fontSize: "20px", marginBottom: "6px" }}>{s.icon}</div>
              <div style={{ fontSize: "28px", fontWeight: "600", color: "#0F6E56" }}>{s.val}</div>
              <div style={{ fontSize: "13px", color: "#666", marginTop: "4px" }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* NEXT SESSION */}
        <p style={{ fontSize: "11px", fontWeight: "500", color: "#888", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "12px" }}>Next session</p>
        <div style={{ background: "#fff", borderRadius: "12px", padding: "20px", border: `1px solid ${nextSession ? "#9FE1CB" : "#e0e0e0"}`, display: "flex", alignItems: "center", gap: "16px", marginBottom: "28px" }}>
          <div style={{ width: "48px", height: "48px", borderRadius: "50%", background: nextSession ? "#0F6E56" : "#E1F5EE", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "600", color: nextSession ? "#fff" : "#0F6E56", fontSize: "14px", minWidth: "48px" }}>
            {nextSession ? nextSession.counsellor_name.split(" ").map(n => n[0]).join("") : "?"}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: "15px", fontWeight: "500", color: "#1a1a1a" }}>
              {nextSession ? nextSession.counsellor_name : "No sessions booked yet"}
            </div>
            <div style={{ fontSize: "13px", color: "#666" }}>
              {nextSession
                ? `${
      nextSession.session_type === "online" ? "🎧 Online" :
      nextSession.session_type === "group" ? "👥 Group therapy" :
      "📍 In-person"
    } · ${nextSession.slot}`
                : "Book your first session with a licensed counsellor"}
            </div>
          </div>
          <button
            onClick={() => router.push(nextSession ? "/sessions" : "/counsellors")}
            style={{ background: "#0F6E56", color: "#fff", border: "none", padding: "8px 16px", borderRadius: "8px", fontSize: "13px", fontWeight: "500", cursor: "pointer", whiteSpace: "nowrap" }}>
            {nextSession ? "View sessions" : "Book now"}
          </button>
        </div>

        {/* DAILY STRESS CHECKER */}
        <p style={{ fontSize: "11px", fontWeight: "500", color: "#888", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "12px" }}>Daily check-in</p>
        <div style={{ background: "#0F6E56", borderRadius: "12px", padding: "24px", marginBottom: "28px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px" }}>
          <div>
            <div style={{ fontSize: "16px", fontWeight: "600", color: "#fff", marginBottom: "4px" }}>How are you feeling today?</div>
            <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.8)" }}>Take 2 minutes to check in with yourself. Track your wellbeing over time.</div>
          </div>
          <button onClick={() => router.push("/stress-checker")}
            style={{ background: "#fff", color: "#0F6E56", border: "none", padding: "10px 20px", borderRadius: "8px", fontSize: "14px", fontWeight: "600", cursor: "pointer", whiteSpace: "nowrap" }}>
            Check in →
          </button>
        </div>

        {/* YOUTUBE CONTENT */}
        <p style={{ fontSize: "11px", fontWeight: "500", color: "#888", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "12px" }}>Free wellness content</p>
        <div style={{ background: "#fff", borderRadius: "12px", padding: "20px", border: "1px solid #e0e0e0", display: "flex", alignItems: "center", gap: "16px", marginBottom: "28px" }}>
          <div style={{ width: "48px", height: "48px", borderRadius: "12px", background: "#FF0000", display: "flex", alignItems: "center", justifyContent: "center", minWidth: "48px" }}>
            <span style={{ color: "#fff", fontSize: "20px" }}>▶</span>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: "15px", fontWeight: "500", color: "#1a1a1a", marginBottom: "2px" }}>Watch free mental health content</div>
            <div style={{ fontSize: "13px", color: "#666" }}>Free videos in Amharic and English — relationships, anxiety, family, grief, and more</div>
          </div>
          <button onClick={() => window.open("https://www.youtube.com/@solace.et_official", "_blank")}
            style={{ background: "#FF0000", color: "#fff", border: "none", padding: "8px 16px", borderRadius: "8px", fontSize: "13px", fontWeight: "500", cursor: "pointer", whiteSpace: "nowrap" }}>
            Watch now
          </button>
        </div>

        {/* QUICK ACTIONS */}
        <p style={{ fontSize: "11px", fontWeight: "500", color: "#888", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "12px" }}>Quick actions</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px" }}>
          {[
            { icon: "🎧", label: "Book a session", path: "/counsellors" },
            { icon: "💬", label: "Peer chat", path: "/chat" },
            { icon: "📋", label: "My sessions", path: "/sessions" },
          ].map((action, i) => (
            <button key={i} onClick={() => router.push(action.path)}
              style={{ background: "#fff", border: "1px solid #e0e0e0", borderRadius: "12px", padding: "18px", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
              <span style={{ fontSize: "24px" }}>{action.icon}</span>
              <span style={{ fontSize: "13px", fontWeight: "500", color: "#1a1a1a" }}>{action.label}</span>
            </button>
          ))}
        </div>

      </div>
    </main>
  );
}
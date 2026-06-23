'use client';
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();

  const stats = [
    { val: "0", label: "Sessions completed" },
    { val: "0", label: "Upcoming sessions" },
    { val: "1", label: "Days with Solace" },
  ];

  const resources = [
    { tag: "Amharic", title: "Understanding anxiety in everyday life" },
    { tag: "Video", title: "How to talk to your family about how you feel" },
    { tag: "Article", title: "Healing from childhood wounds as an adult" },
    { tag: "Exercise", title: "5-minute breathing technique for stress relief" },
  ];

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
            { label: "Content", path: "/content" },
          ].map((item) => (
            <button
              key={item.path}
              onClick={() => router.push(item.path)}
              style={{ background: "none", border: "none", color: "#0F6E56", fontSize: "14px", cursor: "pointer", fontWeight: "500" }}>
              {item.label}
            </button>
          ))}
        </div>
      </nav>

      {/* CONTENT */}
      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "32px 24px" }}>

        {/* HEADER */}
        <div style={{ marginBottom: "24px" }}>
          <h2 style={{ fontSize: "22px", fontWeight: "600", color: "#1a1a1a", marginBottom: "4px" }}>Welcome back</h2>
          <p style={{ fontSize: "14px", color: "#666" }}>Here is what is available for you today</p>
        </div>

        {/* STATS */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px", marginBottom: "28px" }}>
          {stats.map((s, i) => (
            <div key={i} style={{ background: "#fff", borderRadius: "12px", padding: "20px", border: "1px solid #e0e0e0" }}>
              <div style={{ fontSize: "28px", fontWeight: "600", color: "#0F6E56" }}>{s.val}</div>
              <div style={{ fontSize: "13px", color: "#666", marginTop: "4px" }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* NEXT SESSION */}
        <div style={{ marginBottom: "8px" }}>
          <p style={{ fontSize: "11px", fontWeight: "500", color: "#888", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "12px" }}>Next session</p>
          <div style={{ background: "#fff", borderRadius: "12px", padding: "20px", border: "1px solid #e0e0e0", display: "flex", alignItems: "center", gap: "16px" }}>
            <div style={{ width: "48px", height: "48px", borderRadius: "50%", background: "#E1F5EE", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "600", color: "#0F6E56", fontSize: "14px" }}>HE</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: "15px", fontWeight: "500", color: "#1a1a1a" }}>Hiwet Eyob</div>
              <div style={{ fontSize: "13px", color: "#666" }}>Individual counselling</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: "13px", fontWeight: "500", color: "#0F6E56" }}>No sessions yet</div>
            </div>
            <button
              onClick={() => router.push("/counsellors")}
              style={{ background: "#0F6E56", color: "#fff", border: "none", padding: "8px 16px", borderRadius: "8px", fontSize: "13px", fontWeight: "500", cursor: "pointer" }}>
              Book now
            </button>
          </div>
        </div>

        {/* RESOURCES */}
        <p style={{ fontSize: "11px", fontWeight: "500", color: "#888", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "12px", marginTop: "28px" }}>Recommended for you</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "12px" }}>
          {resources.map((r, i) => (
            <div key={i} style={{ background: "#fff", borderRadius: "12px", padding: "16px", border: "1px solid #e0e0e0", cursor: "pointer" }}>
              <div style={{ background: "#E1F5EE", color: "#0F6E56", fontSize: "11px", fontWeight: "500", padding: "2px 10px", borderRadius: "20px", display: "inline-block", marginBottom: "8px" }}>{r.tag}</div>
              <div style={{ fontSize: "14px", fontWeight: "500", color: "#1a1a1a", lineHeight: "1.4" }}>{r.title}</div>
            </div>
          ))}
        </div>

      </div>
    </main>
  );
}
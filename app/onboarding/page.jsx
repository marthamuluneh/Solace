'use client';
import { useState } from "react";
import { supabase } from "../lib/supabase";
import { useRouter } from "next/navigation";

export default function Onboarding() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [lang, setLang] = useState("en");
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async () => {
    if (!username.trim()) {
      setError("Please choose a username");
      return;
    }
    if (!email.trim()) {
      setError("Please enter your email address");
      return;
    }
    if (!email.includes("@")) {
      setError("Please enter a valid email address");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const { data, error } = await supabase.auth.signInAnonymously();
      if (error) throw error;
      await supabase.auth.updateUser({
        email,
        data: { username, language: lang, reason }
      });
      router.push("/dashboard");
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
    setLoading(false);
  };

  return (
    <main style={{ fontFamily: "Arial, sans-serif", background: "#f5f5f5", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px" }}>

      {/* NAV */}
      <div style={{ position: "fixed", top: 0, left: 0, right: 0, background: "#fff", padding: "14px 32px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #e0e0e0", boxShadow: "0 2px 8px rgba(0,0,0,0.06)", zIndex: 100 }}>
        <img src="/logo.png" alt="Solace" style={{ height: "40px", objectFit: "contain" }} />
      </div>

      {/* FORM */}
      <div style={{ background: "#fff", borderRadius: "16px", padding: "40px", maxWidth: "440px", width: "100%", marginTop: "60px", border: "1px solid #e0e0e0" }}>

        <h2 style={{ fontSize: "22px", fontWeight: "600", color: "#1a1a1a", marginBottom: "6px" }}>
          Create your private account
        </h2>
        <p style={{ fontSize: "14px", color: "#666", marginBottom: "24px" }}>
          No real name needed. Your email is only used for session notifications.
        </p>

        {/* ANONYMOUS NOTICE */}
        <div style={{ background: "#E1F5EE", borderRadius: "8px", padding: "14px", display: "flex", gap: "10px", marginBottom: "24px" }}>
          <span style={{ fontSize: "18px" }}>🔒</span>
          <p style={{ fontSize: "13px", color: "#0F4A3A", lineHeight: "1.6", margin: 0 }}>
            Your identity is never shared with other users. Your email is kept private and used only to send you booking confirmations and session reminders.
          </p>
        </div>

        {/* USERNAME */}
        <div style={{ marginBottom: "18px" }}>
          <label style={{ display: "block", fontSize: "13px", fontWeight: "500", color: "#444", marginBottom: "6px" }}>
            Choose a username <span style={{ color: "#e53e3e" }}>*</span>
          </label>
          <input
            type="text"
            placeholder="e.g. peacefulbird_22"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ width: "100%", padding: "10px 14px", border: "1px solid #e0e0e0", borderRadius: "8px", fontSize: "14px", outline: "none", boxSizing: "border-box" }}
          />
        </div>

        {/* EMAIL */}
        <div style={{ marginBottom: "18px" }}>
          <label style={{ display: "block", fontSize: "13px", fontWeight: "500", color: "#444", marginBottom: "6px" }}>
            Email address <span style={{ color: "#e53e3e" }}>*</span>
          </label>
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: "100%", padding: "10px 14px", border: "1px solid #e0e0e0", borderRadius: "8px", fontSize: "14px", outline: "none", boxSizing: "border-box" }}
          />
          <p style={{ fontSize: "11px", color: "#999", marginTop: "4px" }}>
            Used only for booking confirmations and session reminders. Never shared.
          </p>
        </div>

        {/* LANGUAGE */}
        <div style={{ marginBottom: "18px" }}>
          <label style={{ display: "block", fontSize: "13px", fontWeight: "500", color: "#444", marginBottom: "6px" }}>
            Preferred language
          </label>
          <div style={{ display: "flex", gap: "8px" }}>
            {["en", "am", "both"].map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                style={{ flex: 1, padding: "9px", border: `1px solid ${lang === l ? "#0F6E56" : "#e0e0e0"}`, borderRadius: "8px", background: lang === l ? "#E1F5EE" : "#fff", color: lang === l ? "#0F6E56" : "#666", fontWeight: lang === l ? "600" : "400", cursor: "pointer", fontSize: "13px" }}>
                {l === "en" ? "English" : l === "am" ? "አማርኛ" : "Both"}
              </button>
            ))}
          </div>
        </div>

        {/* REASON */}
        <div style={{ marginBottom: "24px" }}>
          <label style={{ display: "block", fontSize: "13px", fontWeight: "500", color: "#444", marginBottom: "6px" }}>
            What brings you here today? (optional)
          </label>
          <select
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            style={{ width: "100%", padding: "10px 14px", border: "1px solid #e0e0e0", borderRadius: "8px", fontSize: "14px", background: "#fff", outline: "none" }}>
            <option value="">I'd rather not say</option>
            <option value="relationship">Relationship or marriage difficulties</option>
            <option value="family">Family conflict</option>
            <option value="anxiety">Anxiety or stress</option>
            <option value="trauma">Childhood trauma or past experiences</option>
            <option value="grief">Grief or loss</option>
            <option value="identity">Self-esteem or identity</option>
            <option value="work">Work or career pressure</option>
            <option value="financial">Financial stress</option>
            <option value="academic">Academic pressure</option>
            <option value="loneliness">Loneliness</option>
            <option value="social_media">Social media harm</option>
            <option value="exploring">Just exploring</option>
          </select>
        </div>

        {/* ERROR */}
        {error && (
          <p style={{ color: "#e53e3e", fontSize: "13px", marginBottom: "12px" }}>{error}</p>
        )}

        {/* SUBMIT */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          style={{ width: "100%", background: loading ? "#ccc" : "#0F6E56", color: "#fff", border: "none", padding: "13px", borderRadius: "8px", fontSize: "15px", fontWeight: "600", cursor: loading ? "not-allowed" : "pointer" }}>
          {loading ? "Setting up your account..." : "Enter Solace →"}
        </button>

        <p style={{ fontSize: "12px", color: "#999", textAlign: "center", marginTop: "16px" }}>
          By continuing you agree that Solace will keep your information private and confidential.
        </p>
      </div>
    </main>
  );
}
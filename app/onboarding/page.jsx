'use client';
import { useState } from "react";
import { supabase } from "../lib/supabase";
import { useRouter } from "next/navigation";

export default function Onboarding() {
  const [mode, setMode] = useState("signup");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSignup = async () => {
    if (!username.trim()) { setError("Please choose a username"); return; }
    if (!email.trim() || !email.includes("@")) { setError("Please enter a valid email address"); return; }
    if (!password || password.length < 6) { setError("Please choose a password with at least 6 characters"); return; }
    setLoading(true);
    setError("");
    try {
      const { error: signInError } = await supabase.auth.signInAnonymously();
      if (signInError) throw signInError;
      const { error: updateError } = await supabase.auth.updateUser({
        email,
        password,
        data: { username, reason }
      });
      if (updateError) throw updateError;
      const { data: { user: currentUser } } = await supabase.auth.getUser();
      await supabase.from("user_profiles").insert({
        user_id: currentUser ? currentUser.id : "anonymous",
        joined_at: new Date().toISOString(),
      });
      router.push("/dashboard");
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    }
    setLoading(false);
  };

  const handleLogin = async () => {
    if (!email.trim() || !email.includes("@")) { setError("Please enter a valid email address"); return; }
    if (!password) { setError("Please enter your password"); return; }
    setLoading(true);
    setError("");
    try {
      const { error: loginError } = await supabase.auth.signInWithPassword({ email, password });
      if (loginError) throw loginError;
      router.push("/dashboard");
    } catch (err) {
      setError("Incorrect email or password. Please try again.");
    }
    setLoading(false);
  };

  const switchMode = (newMode) => { setMode(newMode); setError(""); setPassword(""); };

  return (
    <main style={{ fontFamily: "Arial, sans-serif", background: "#f5f5f5", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px" }}>

      {/* NAV */}
      <div style={{ position: "fixed", top: 0, left: 0, right: 0, background: "#fff", padding: "14px 32px", display: "flex", alignItems: "center", borderBottom: "1px solid #e0e0e0", boxShadow: "0 2px 8px rgba(0,0,0,0.06)", zIndex: 100 }}>
        <img src="/logo.png" alt="Solace" style={{ height: "40px", objectFit: "contain", cursor: "pointer" }} onClick={() => router.push("/")} />
      </div>

      {/* FORM */}
      <div style={{ background: "#fff", borderRadius: "16px", padding: "40px", maxWidth: "440px", width: "100%", marginTop: "60px", border: "1px solid #e0e0e0" }}>

        {/* MODE TOGGLE */}
        <div style={{ display: "flex", gap: "4px", background: "#f0f0f0", borderRadius: "10px", padding: "4px", marginBottom: "28px" }}>
          {["signup", "login"].map((m) => (
            <button key={m} onClick={() => switchMode(m)}
              style={{ flex: 1, padding: "9px", border: "none", borderRadius: "8px", background: mode === m ? "#fff" : "transparent", color: mode === m ? "#0F6E56" : "#888", fontWeight: mode === m ? "600" : "500", cursor: "pointer", fontSize: "14px", boxShadow: mode === m ? "0 1px 4px rgba(0,0,0,0.08)" : "none", transition: "all 0.2s" }}>
              {m === "signup" ? "Create Account" : "Log In"}
            </button>
          ))}
        </div>

        {/* TITLE */}
        <h2 style={{ fontSize: "22px", fontWeight: "600", color: "#1a1a1a", marginBottom: "6px" }}>
          {mode === "signup" ? "Create your private account" : "Welcome back"}
        </h2>
        <p style={{ fontSize: "14px", color: "#666", marginBottom: "24px" }}>
          {mode === "login" ? "Log in to continue where you left off." : ""}
        </p>

        {/* ANONYMOUS NOTICE — signup only */}
        {mode === "signup" && (
          <div style={{ background: "#E1F5EE", borderRadius: "8px", padding: "14px", display: "flex", gap: "10px", marginBottom: "24px" }}>
            <span style={{ fontSize: "18px" }}>🔒</span>
            <p style={{ fontSize: "13px", color: "#0F4A3A", lineHeight: "1.6", margin: 0 }}>
              Your identity is never shared with other users. Your email is kept private and used only to send you booking confirmations and session reminders.
            </p>
          </div>
        )}

        {/* USERNAME — signup only */}
        {mode === "signup" && (
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
        )}

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
          {mode === "signup" && (
            <p style={{ fontSize: "11px", color: "#999", marginTop: "4px" }}>
              Used only for booking confirmations and session reminders. Never shared.
            </p>
          )}
        </div>

        {/* PASSWORD */}
        <div style={{ marginBottom: "18px" }}>
          <label style={{ display: "block", fontSize: "13px", fontWeight: "500", color: "#444", marginBottom: "6px" }}>
            Password <span style={{ color: "#e53e3e" }}>*</span>
          </label>
          <div style={{ position: "relative" }}>
            <input
              type={showPassword ? "text" : "password"}
              placeholder={mode === "signup" ? "At least 6 characters" : "Enter your password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && (mode === "signup" ? handleSignup() : handleLogin())}
              style={{ width: "100%", padding: "10px 42px 10px 14px", border: "1px solid #e0e0e0", borderRadius: "8px", fontSize: "14px", outline: "none", boxSizing: "border-box" }}
            />
            <button
              onClick={() => setShowPassword(!showPassword)}
              style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", fontSize: "16px", color: "#888" }}>
            </button>
          </div>
          {mode === "login" && (
            <p style={{ fontSize: "11px", color: "#0F6E56", marginTop: "6px", cursor: "pointer", textAlign: "right" }}>
              Forgot password?
            </p>
          )}
        </div>

        {/* REASON — signup only */}
        {mode === "signup" && (
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
        )}

        {/* ERROR */}
        {error && (
          <div style={{ background: "#FFF5F5", border: "1px solid #FEB2B2", borderRadius: "8px", padding: "10px 14px", marginBottom: "14px" }}>
            <p style={{ color: "#e53e3e", fontSize: "13px", margin: 0 }}>⚠️ {error}</p>
          </div>
        )}

        {/* SUBMIT */}
        <button
          onClick={mode === "signup" ? handleSignup : handleLogin}
          disabled={loading}
          style={{ width: "100%", background: loading ? "#ccc" : "#0F6E56", color: "#fff", border: "none", padding: "13px", borderRadius: "8px", fontSize: "15px", fontWeight: "600", cursor: loading ? "not-allowed" : "pointer", transition: "background 0.2s" }}>
          {loading
            ? (mode === "signup" ? "Setting up your account..." : "Logging in...")
            : (mode === "signup" ? "Enter Solace →" : "Log In")}
        </button>

        <p style={{ fontSize: "12px", color: "#999", textAlign: "center", marginTop: "16px" }}>
          {mode === "signup"
            ? "By continuing you agree that Solace will keep your information private and confidential."
            : <span>New to Solace? <span onClick={() => switchMode("signup")} style={{ color: "#0F6E56", fontWeight: "600", cursor: "pointer" }}>Create an account</span></span>}
        </p>
      </div>
    </main>
  );
}
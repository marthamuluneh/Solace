'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../lib/supabase";

const counsellors = [
  { init: "HE", color: "#0F6E56", name: "Hiwet Eyob", bio: "Licensed psychologist with over 10 years of experience working with individuals across a wide range of personal and emotional challenges. Fluent in Amharic and English.", lang: "Amharic + English", experience: "10+ years", rating: "4.9", sessions: "320+" },
  { init: "TT", color: "#185FA5", name: "Tirsit Tiruneh", bio: "Psychiatric nurse with a BSc with Distinction. Brings a warm, non-judgmental approach to supporting individuals through difficult emotional and mental health experiences.", lang: "Amharic + English", experience: "3+ years", rating: "4.8", sessions: "150+" },
  { init: "GS", color: "#854F0B", name: "Dr. Girma Selassie", bio: "Counselling psychologist with an MSc and extensive experience supporting individuals, couples, and families. Known for creating a safe and trusting therapeutic space.", lang: "Amharic + English", experience: "8+ years", rating: "4.8", sessions: "210+" },
  { init: "MK", color: "#993356", name: "Meron Kifle", bio: "Experienced therapist with a compassionate and culturally sensitive approach. Works with individuals and families navigating life transitions and personal challenges.", lang: "Amharic", experience: "6+ years", rating: "4.7", sessions: "180+" },
];

const groupSessions = [
  { title: "Finding peace in difficult times", facilitator: "Hiwet Eyob", day: "Saturdays, 10:00 AM", spots: 3, filled: 7, desc: "A safe, supportive space for those navigating emotional difficulty. Open to all. Voice-masked for full privacy." },
  { title: "Managing anxiety and daily stress", facilitator: "Tirsit Tiruneh", day: "Tuesdays, 6:00 PM", spots: 0, filled: 10, desc: "Learn practical coping tools for anxiety and everyday stress. Facilitated in Amharic and English." },
  { title: "Healing relationships and family bonds", facilitator: "Dr. Girma Selassie", day: "Wednesdays, 5:30 PM", spots: 4, filled: 6, desc: "For those navigating difficult family dynamics or relationship challenges. Confidential and anonymous." },
  { title: "Processing grief and loss", facilitator: "Hiwet Eyob", day: "Thursdays, 7:00 PM", spots: 2, filled: 8, desc: "A compassionate group for those who have experienced any form of loss. Facilitated with care." },
];

export default function Counsellors() {
  const [step, setStep] = useState("choose");
  const [showModal, setShowModal] = useState(false);
  const [selectedCounsellor, setSelectedCounsellor] = useState(null);
  const [selectedType, setSelectedType] = useState("online");
  const [selectedSlot, setSelectedSlot] = useState("Mon 2pm");
  const [booked, setBooked] = useState(false);
  const [bookingLoading, setBookingLoading] = useState(false);
  const router = useRouter();

  const slots = ["Mon 9am", "Mon 2pm", "Tue 10am", "Tue 3pm", "Wed 9am", "Wed 4pm", "Thu 11am", "Fri 10am", "Fri 2pm"];
  const taken = ["Mon 9am", "Tue 3pm", "Thu 11am"];

  const confirmBooking = async () => {
  setBookingLoading(true);
  try {
    let userId = "anonymous";
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      userId = user.id;
    } else {
      const { data } = await supabase.auth.signInAnonymously();
      if (data?.user) userId = data.user.id;
    }
    const { error } = await supabase.from("bookings").insert({
      user_id: userId,
      counsellor_name: selectedCounsellor.name,
      session_type: selectedType,
      slot: selectedSlot,
      status: "upcoming",
      created_at: new Date().toISOString(),
    });
    if (error) {
      console.error("Booking error:", error);
      alert("Booking failed. Please try again.");
      setBookingLoading(false);
      return;
    }
  } catch (err) {
    console.error("Unexpected error:", err);
  }
  setBookingLoading(false);
  setBooked(true);
};

const confirmGroupBooking = async (group) => {
  try {
    let userId = "anonymous";
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      userId = user.id;
    } else {
      const { data } = await supabase.auth.signInAnonymously();
      if (data?.user) userId = data.user.id;
    }
    const { error } = await supabase.from("bookings").insert({
      user_id: userId,
      counsellor_name: group.facilitator,
      session_type: "group",
      slot: group.day,
      status: "upcoming",
      created_at: new Date().toISOString(),
    });
    if (error) {
      console.error("Group booking error:", error);
      alert("Booking failed. Please try again.");
      return;
    }
    alert(`You're booked into "${group.title}". A confirmation has been sent to your email.`);
    router.push("/dashboard");
  } catch (err) {
    console.error("Unexpected error:", err);
  }
};

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

      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "32px 24px" }}>

        {/* STEP 1 — CHOOSE */}
        {step === "choose" && (
          <>
            <h2 style={{ fontSize: "22px", fontWeight: "600", color: "#1a1a1a", marginBottom: "6px" }}>Book a session</h2>
            <p style={{ fontSize: "14px", color: "#666", marginBottom: "32px" }}>All sessions are private, anonymous, and with licensed Ethiopian professionals.</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "20px" }}>

              <div onClick={() => setStep("individual")}
                style={{ background: "#fff", borderRadius: "16px", padding: "32px", border: "1px solid #e0e0e0", cursor: "pointer" }}>
                <div style={{ fontSize: "36px", marginBottom: "16px" }}>🎧</div>
                <h3 style={{ fontSize: "18px", fontWeight: "600", color: "#1a1a1a", marginBottom: "8px" }}>Individual counselling</h3>
                <p style={{ fontSize: "14px", color: "#666", lineHeight: "1.6", marginBottom: "20px" }}>A private one-on-one session with a licensed counsellor. Available online or in-person at our Addis Ababa office.</p>
                <div style={{ background: "#E1F5EE", borderRadius: "8px", padding: "10px 14px" }}>
                  <p style={{ fontSize: "13px", color: "#0F4A3A", margin: 0 }}>🔒 Fully anonymous · 45–60 minutes · Online or in-person</p>
                </div>
              </div>

              <div onClick={() => setStep("group")}
                style={{ background: "#fff", borderRadius: "16px", padding: "32px", border: "1px solid #e0e0e0", cursor: "pointer" }}>
                <div style={{ fontSize: "36px", marginBottom: "16px" }}>👥</div>
                <h3 style={{ fontSize: "18px", fontWeight: "600", color: "#1a1a1a", marginBottom: "8px" }}>Group therapy</h3>
                <p style={{ fontSize: "14px", color: "#666", lineHeight: "1.6", marginBottom: "20px" }}>A small group of 6–10 people facilitated by a licensed psychologist. Voice-masked so no one can identify you.</p>
                <div style={{ background: "#E1F5EE", borderRadius: "8px", padding: "10px 14px" }}>
                  <p style={{ fontSize: "13px", color: "#0F4A3A", margin: 0 }}>🎙️ Voice masked · 75–90 minutes · Online or in-person</p>
                </div>
              </div>

            </div>
          </>
        )}

        {/* STEP 2A — INDIVIDUAL */}
        {step === "individual" && (
          <>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "6px" }}>
              <button onClick={() => setStep("choose")}
                style={{ background: "none", border: "none", color: "#0F6E56", fontSize: "14px", cursor: "pointer", fontWeight: "500" }}>
                Back
              </button>
              <h2 style={{ fontSize: "22px", fontWeight: "600", color: "#1a1a1a" }}>Choose a counsellor</h2>
            </div>
            <p style={{ fontSize: "14px", color: "#666", marginBottom: "24px" }}>Browse our licensed counsellors and choose who you feel most comfortable with.</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {counsellors.map((c, i) => (
                <div key={i} style={{ background: "#fff", borderRadius: "12px", padding: "20px", border: "1px solid #e0e0e0", display: "flex", gap: "16px", alignItems: "flex-start" }}>
                  <div style={{ width: "52px", height: "52px", borderRadius: "50%", background: c.color, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: "600", fontSize: "15px", minWidth: "52px" }}>{c.init}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: "16px", fontWeight: "600", color: "#1a1a1a", marginBottom: "4px" }}>{c.name}</div>
                    <div style={{ fontSize: "13px", color: "#666", lineHeight: "1.6", marginBottom: "10px" }}>{c.bio}</div>
                    <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
                      <span style={{ fontSize: "12px", color: "#666" }}>🌐 {c.lang}</span>
                      <span style={{ fontSize: "12px", color: "#666" }}>🕐 {c.experience}</span>
                      <span style={{ fontSize: "12px", color: "#666" }}>⭐ {c.rating}</span>
                      <span style={{ fontSize: "12px", color: "#666" }}>👥 {c.sessions} sessions</span>
                    </div>
                  </div>
                  <button onClick={() => { setSelectedCounsellor(c); setShowModal(true); setBooked(false); }}
                    style={{ background: "#0F6E56", color: "#fff", border: "none", padding: "10px 18px", borderRadius: "8px", fontSize: "13px", fontWeight: "500", cursor: "pointer", whiteSpace: "nowrap" }}>
                    Book session
                  </button>
                </div>
              ))}
            </div>
          </>
        )}

        {/* STEP 2B — GROUP */}
        {step === "group" && (
          <>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "6px" }}>
              <button onClick={() => setStep("choose")}
                style={{ background: "none", border: "none", color: "#0F6E56", fontSize: "14px", cursor: "pointer", fontWeight: "500" }}>
                Back
              </button>
              <h2 style={{ fontSize: "22px", fontWeight: "600", color: "#1a1a1a" }}>Group therapy sessions</h2>
            </div>
            <p style={{ fontSize: "14px", color: "#666", marginBottom: "24px" }}>Small groups of 6–10 with a licensed psychologist. Voice masking active in all sessions.</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {groupSessions.map((g, i) => (
                <div key={i} style={{ background: "#fff", borderRadius: "12px", padding: "20px", border: "1px solid #e0e0e0" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
                    <h3 style={{ fontSize: "16px", fontWeight: "600", color: "#1a1a1a" }}>{g.title}</h3>
                    <span style={{ background: g.spots > 0 ? "#E1F5EE" : "#FFF3CD", color: g.spots > 0 ? "#0F6E56" : "#856404", fontSize: "12px", fontWeight: "500", padding: "3px 10px", borderRadius: "20px", whiteSpace: "nowrap", marginLeft: "12px" }}>
                      {g.spots > 0 ? `${g.spots} spots left` : "Full"}
                    </span>
                  </div>
                  <p style={{ fontSize: "13px", color: "#666", lineHeight: "1.6", marginBottom: "12px" }}>{g.desc}</p>
                  <div style={{ display: "flex", gap: "16px", marginBottom: "14px", flexWrap: "wrap" }}>
                    <span style={{ fontSize: "12px", color: "#666" }}>👤 {g.facilitator}</span>
                    <span style={{ fontSize: "12px", color: "#666" }}>📅 {g.day}</span>
                    <span style={{ fontSize: "12px", color: "#666" }}>👥 {g.filled}/10 joined</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <p style={{ fontSize: "12px", color: "#0F6E56", margin: 0 }}>🎙️ Voice masking active — your voice is not recognizable</p>
                    <button 
                     onClick={() => g.spots > 0 && confirmGroupBooking(g)}
                      disabled={g.spots === 0}
                      style={{ background: g.spots > 0 ? "#0F6E56" : "#ccc", color: "#fff", border: "none", padding: "8px 16px", borderRadius: "8px", fontSize: "13px", fontWeight: "500", cursor: g.spots > 0 ? "pointer" : "not-allowed" }}>
                      {g.spots > 0 ? "Join group" : "Join waitlist"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

      </div>

      {/* BOOKING MODAL */}
      {showModal && selectedCounsellor && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 200, padding: "24px" }}>
          <div style={{ background: "#fff", borderRadius: "16px", padding: "28px", width: "100%", maxWidth: "380px", maxHeight: "90vh", overflowY: "auto" }}>

            {!booked ? (
              <>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                  <h3 style={{ fontSize: "17px", fontWeight: "600", color: "#1a1a1a" }}>Book with {selectedCounsellor.name}</h3>
                  <button onClick={() => setShowModal(false)} style={{ background: "none", border: "none", fontSize: "22px", cursor: "pointer", color: "#666" }}>×</button>
                </div>

                <p style={{ fontSize: "13px", color: "#666", marginBottom: "12px" }}>Session type</p>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "20px" }}>
                  {[
                    { type: "online", label: "Online session", desc: "Private video or audio call, 45–60 min" },
                    { type: "inperson", label: "In-person session", desc: "At Solace office, Addis Ababa, 45–60 min" }
                  ].map(s => (
                    <div key={s.type} onClick={() => setSelectedType(s.type)}
                      style={{ border: `1px solid ${selectedType === s.type ? "#0F6E56" : "#e0e0e0"}`, background: selectedType === s.type ? "#E1F5EE" : "#fff", borderRadius: "8px", padding: "12px", cursor: "pointer" }}>
                      <div style={{ fontSize: "14px", fontWeight: "500", color: "#1a1a1a" }}>{s.label}</div>
                      <div style={{ fontSize: "12px", color: "#666" }}>{s.desc}</div>
                    </div>
                  ))}
                </div>

                <p style={{ fontSize: "13px", color: "#666", marginBottom: "10px" }}>Available slots — this week</p>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "6px", marginBottom: "20px" }}>
                  {slots.map(slot => (
                    <button key={slot} onClick={() => !taken.includes(slot) && setSelectedSlot(slot)}
                      style={{ padding: "8px", borderRadius: "8px", border: `1px solid ${selectedSlot === slot ? "#0F6E56" : "#e0e0e0"}`, background: taken.includes(slot) ? "#f5f5f5" : selectedSlot === slot ? "#0F6E56" : "#fff", color: taken.includes(slot) ? "#ccc" : selectedSlot === slot ? "#fff" : "#444", fontSize: "12px", cursor: taken.includes(slot) ? "not-allowed" : "pointer" }}>
                      {slot}
                    </button>
                  ))}
                </div>

                <div style={{ background: "#E1F5EE", borderRadius: "8px", padding: "10px 12px", display: "flex", gap: "8px", alignItems: "center", marginBottom: "16px" }}>
                  <span>🔒</span>
                  <span style={{ fontSize: "12px", color: "#0F4A3A" }}>Your identity remains anonymous. No personal info is shared with the counsellor.</span>
                </div>

                <button onClick={confirmBooking}
                  disabled={bookingLoading}
                  style={{ width: "100%", background: bookingLoading ? "#ccc" : "#0F6E56", color: "#fff", border: "none", padding: "13px", borderRadius: "8px", fontSize: "15px", fontWeight: "600", cursor: bookingLoading ? "not-allowed" : "pointer" }}>
                  {bookingLoading ? "Confirming..." : "Confirm booking"}
                </button>
              </>
            ) : (
              <div style={{ textAlign: "center", padding: "20px 0" }}>
                <div style={{ fontSize: "48px", marginBottom: "16px" }}>✅</div>
                <h3 style={{ fontSize: "18px", fontWeight: "600", color: "#0F6E56", marginBottom: "8px" }}>Session booked!</h3>
                <p style={{ fontSize: "14px", color: "#666", lineHeight: "1.6", marginBottom: "24px" }}>A confirmation has been sent to your email. You will receive a private session link 1 hour before your appointment. Your identity remains anonymous throughout.</p>
                <button onClick={() => { setShowModal(false); router.push("/dashboard"); }}
                  style={{ width: "100%", background: "#0F6E56", color: "#fff", border: "none", padding: "12px", borderRadius: "8px", fontSize: "14px", fontWeight: "600", cursor: "pointer" }}>
                  Back to dashboard
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
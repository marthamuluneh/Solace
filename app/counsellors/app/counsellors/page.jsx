'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";

const counsellors = [
  { init: "HE", color: "#0F6E56", name: "Hiwet Eyob", spec: "Grief, loss & trauma", bio: "Licensed clinical psychologist with 10+ years experience. Specialises in grief processing, childhood trauma, and social psychology.", lang: "Amharic + English", rating: "4.9", sessions: "320+", online: 1200, inperson: 1500, tags: ["grief", "trauma", "anxiety"] },
  { init: "TT", color: "#185FA5", name: "Tirsit Tiruneh", spec: "Anxiety, depression & youth mental health", bio: "BSc Psychiatric Nursing with Distinction. Specialises in anxiety, depression, youth distress, and social media harm.", lang: "Amharic + English", rating: "4.8", sessions: "150+", online: 1200, inperson: 1500, tags: ["anxiety", "youth", "depression"] },
  { init: "GS", color: "#854F0B", name: "Dr. Girma Selassie", spec: "Relationships & family therapy", bio: "MSc in Counselling Psychology. Works with couples, families, and individuals on communication, conflict, and relationship healing.", lang: "Amharic + English", rating: "4.8", sessions: "210+", online: 1200, inperson: 1500, tags: ["relationship", "family"] },
  { init: "MK", color: "#993356", name: "Meron Kifle", spec: "Family, parenting & women's health", bio: "Family systems therapist. Supports parents, caregivers, and women navigating family conflict, postpartum challenges, and life transitions.", lang: "Amharic", rating: "4.7", sessions: "180+", online: 1200, inperson: 1500, tags: ["family", "relationship"] },
];

const filters = ["All", "anxiety", "trauma", "relationship", "family", "grief", "youth"];

export default function Counsellors() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [selectedCounsellor, setSelectedCounsellor] = useState(null);
  const [selectedType, setSelectedType] = useState("online");
  const [selectedSlot, setSelectedSlot] = useState("Mon 2pm");
  const [booked, setBooked] = useState(false);
  const router = useRouter();

  const filtered = activeFilter === "All" ? counsellors : counsellors.filter(c => c.tags.includes(activeFilter));

  const slots = ["Mon 9am", "Mon 2pm", "Tue 10am", "Tue 3pm", "Wed 9am", "Wed 4pm", "Thu 11am", "Fri 10am", "Fri 2pm"];
  const taken = ["Mon 9am", "Tue 3pm", "Thu 11am"];

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
            <button key={item.path} onClick={() => router.push(item.path)}
              style={{ background: "none", border: "none", color: "#0F6E56", fontSize: "14px", cursor: "pointer", fontWeight: "500" }}>
              {item.label}
            </button>
          ))}
        </div>
      </nav>

      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "32px 24px" }}>
        <h2 style={{ fontSize: "22px", fontWeight: "600", color: "#1a1a1a", marginBottom: "4px" }}>Find a counsellor</h2>
        <p style={{ fontSize: "14px", color: "#666", marginBottom: "20px" }}>All sessions are private and anonymous</p>

        {/* FILTERS */}
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "20px" }}>
          {filters.map(f => (
            <button key={f} onClick={() => setActiveFilter(f)}
              style={{ padding: "6px 14px", borderRadius: "20px", border: `1px solid ${activeFilter === f ? "#0F6E56" : "#e0e0e0"}`, background: activeFilter === f ? "#E1F5EE" : "#fff", color: activeFilter === f ? "#0F6E56" : "#666", fontSize: "13px", fontWeight: activeFilter === f ? "600" : "400", cursor: "pointer" }}>
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        {/* COUNSELLOR LIST */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {filtered.map((c, i) => (
            <div key={i} style={{ background: "#fff", borderRadius: "12px", padding: "20px", border: "1px solid #e0e0e0", display: "flex", gap: "16px" }}>
              <div style={{ width: "52px", height: "52px", borderRadius: "50%", background: c.color, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: "600", fontSize: "15px", minWidth: "52px" }}>{c.init}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: "16px", fontWeight: "600", color: "#1a1a1a", marginBottom: "2px" }}>{c.name}</div>
                <div style={{ fontSize: "13px", color: "#0F6E56", marginBottom: "6px" }}>{c.spec}</div>
                <div style={{ fontSize: "13px", color: "#666", lineHeight: "1.5", marginBottom: "10px" }}>{c.bio}</div>
                <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
                  <span style={{ fontSize: "12px", color: "#666" }}>🌐 {c.lang}</span>
                  <span style={{ fontSize: "12px", color: "#666" }}>⭐ {c.rating}</span>
                  <span style={{ fontSize: "12px", color: "#666" }}>👥 {c.sessions} sessions</span>
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", justifyContent: "space-between", minWidth: "120px" }}>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: "14px", fontWeight: "600", color: "#0F6E56" }}>1,200 ETB</div>
                  <div style={{ fontSize: "11px", color: "#999" }}>online / session</div>
                </div>
                <button
                  onClick={() => { setSelectedCounsellor(c); setShowModal(true); setBooked(false); }}
                  style={{ background: "#0F6E56", color: "#fff", border: "none", padding: "8px 16px", borderRadius: "8px", fontSize: "13px", fontWeight: "500", cursor: "pointer", marginTop: "12px" }}>
                  Book session
                </button>
              </div>
            </div>
          ))}
        </div>
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
                  {[{ type: "online", label: "Individual online", price: "1,200 ETB", desc: "Private video/audio, 45–60 min" },
                    { type: "inperson", label: "Individual in-person", price: "1,500 ETB", desc: "At Solace office, Addis Ababa" }].map(s => (
                    <div key={s.type} onClick={() => setSelectedType(s.type)}
                      style={{ border: `1px solid ${selectedType === s.type ? "#0F6E56" : "#e0e0e0"}`, background: selectedType === s.type ? "#E1F5EE" : "#fff", borderRadius: "8px", padding: "12px", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div>
                        <div style={{ fontSize: "14px", fontWeight: "500", color: "#1a1a1a" }}>{s.label}</div>
                        <div style={{ fontSize: "12px", color: "#666" }}>{s.desc}</div>
                      </div>
                      <div style={{ fontSize: "14px", fontWeight: "600", color: "#0F6E56" }}>{s.price}</div>
                    </div>
                  ))}
                </div>

                <p style={{ fontSize: "13px", color: "#666", marginBottom: "10px" }}>Available slots</p>
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
                  <span style={{ fontSize: "12px", color: "#0F4A3A" }}>Your identity remains anonymous. No personal info shared.</span>
                </div>

                <button onClick={() => setBooked(true)}
                  style={{ width: "100%", background: "#0F6E56", color: "#fff", border: "none", padding: "13px", borderRadius: "8px", fontSize: "15px", fontWeight: "600", cursor: "pointer" }}>
                  Confirm booking
                </button>
              </>
            ) : (
              <div style={{ textAlign: "center", padding: "20px 0" }}>
                <div style={{ fontSize: "48px", marginBottom: "16px" }}>✅</div>
                <h3 style={{ fontSize: "18px", fontWeight: "600", color: "#0F6E56", marginBottom: "8px" }}>Session booked!</h3>
                <p style={{ fontSize: "14px", color: "#666", lineHeight: "1.6", marginBottom: "24px" }}>You will receive a private session link 1 hour before your appointment. Your identity remains anonymous throughout.</p>
                <button onClick={() => setShowModal(false)}
                  style={{ width: "100%", background: "#0F6E56", color: "#fff", border: "none", padding: "12px", borderRadius: "8px", fontSize: "14px", fontWeight: "600", cursor: "pointer" }}>
                  Done
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
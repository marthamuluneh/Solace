'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [lang, setLang] = useState<"en" | "am">("en");
  const router = useRouter();

  const text = {
    en: {
      tagline: "Private · Bilingual · Ethiopian",
      headline: "Mental health support for every Ethiopian — privately.",
      sub: "Connect with licensed Ethiopian psychologists for any personal challenge — relationships, family, trauma, grief, identity, work stress, and more. In Amharic or English.",
      btn1: "Get started — it's free",
      btn2: "Learn more",
      s1title: "Individual Counselling",
      s1desc: "Private video or audio sessions with verified Ethiopian psychologists. Pay per session.",
      s2title: "Group Therapy",
      s2desc: "Small groups of 6–10 with a licensed psychologist. Voice-masked for full privacy.",
      s3title: "Peer Support Chat",
      s3desc: "Anonymous topic rooms. Free, moderated, safe.",
      s4title: "Wellness Content",
      s4desc: "Free mental health videos in Amharic and English on YouTube.",
      t1: "Fully anonymous",
      t2: "Amharic + English",
      t3: "Licensed psychologists",
      t4: "Voice masking",
      t5: "Daily stress checker",
    },
    am: {
      tagline: "ግላዊ · ሁለት ቋንቋ · ኢትዮጵያዊ",
      headline: "ለእያንዳንዱ ኢትዮጵያዊ የአዕምሮ ጤና ድጋፍ — በሚስጥር።",
      sub: "ከፈቃድ ካላቸው ኢትዮጵያዊ ሳይኮሎጂስቶች ጋር ይገናኙ — ለግንኙነት፣ ለቤተሰብ፣ ለጭንቀት፣ ለሀዘን፣ እና ለሌሎች ችግሮች።",
      btn1: "ይጀምሩ — ነፃ ነው",
      btn2: "ተጨማሪ ይወቁ",
      s1title: "የግል ምክር",
      s1desc: "ከተረጋገጡ ኢትዮጵያዊ ሳይኮሎጂስቶች ጋር የግል የቪዲዮ ወይም የድምፅ ክፍለ ጊዜ።",
      s2title: "የቡድን ሕክምና",
      s2desc: "ከ6-10 ሰዎች ጋር በፈቃድ ካለው ሳይኮሎጂስት። ድምፅ ተደብቋል።",
      s3title: "የእኩያ ድጋፍ ቻት",
      s3desc: "ስም-አልባ የርዕስ ክፍሎች። ነፃ፣ ቁጥጥር የሚደረግበት፣ ደህንነቱ የተጠበቀ።",
      s4title: "የጤና ይዘት",
      s4desc: "በአማርኛ እና እንግሊዝኛ ነፃ የአዕምሮ ጤና ቪዲዮዎች።",
      t1: "ሙሉ በሙሉ ስም-አልባ",
      t2: "አማርኛ + እንግሊዝኛ",
      t3: "ፈቃድ ያላቸው ሳይኮሎጂስቶች",
      t4: "የድምፅ ደበቃ",
      t5: "የዕለት ጭንቀት መለኪያ",
    }
  };

  const t = text[lang];

  const services = [
    { icon: "🎧", title: t.s1title, desc: t.s1desc },
    { icon: "👥", title: t.s2title, desc: t.s2desc },
    { icon: "💬", title: t.s3title, desc: t.s3desc },
    { icon: "▶️", title: t.s4title, desc: t.s4desc },
  ];

  const trust = [t.t1, t.t2, t.t3, t.t4, t.t5];

  return (
    <main style={{ fontFamily: "Arial, sans-serif", background: "#f9f9f9", minHeight: "100vh" }}>

      {/* NAV */}
      <nav style={{ background: "#fff", padding: "14px 32px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #e0e0e0", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <img src="/logo.png" alt="Solace" style={{ height: "40px", objectFit: "contain" }} />
        </div>
        <div style={{ display: "flex", gap: "8px" }}>
          <button
            onClick={() => setLang("en")}
            style={{ background: lang === "en" ? "#0F6E56" : "transparent", color: lang === "en" ? "#fff" : "#0F6E56", border: "1px solid #0F6E56", padding: "5px 14px", borderRadius: "20px", cursor: "pointer", fontSize: "13px" }}>
            English
          </button>
          <button
            onClick={() => setLang("am")}
            style={{ background: lang === "am" ? "#0F6E56" : "transparent", color: lang === "am" ? "#fff" : "#0F6E56", border: "1px solid #0F6E56", padding: "5px 14px", borderRadius: "20px", cursor: "pointer", fontSize: "13px" }}>
            አማርኛ
          </button>
        </div>
      </nav>

      {/* HERO */}
      <div style={{ background: "#0F6E56", padding: "48px 32px 56px", color: "#fff" }}>
        <div style={{ maxWidth: "600px", margin: "0 auto", textAlign: "center" }}>
          <div style={{ background: "rgba(255,255,255,0.2)", display: "inline-block", padding: "4px 16px", borderRadius: "20px", fontSize: "13px", marginBottom: "16px" }}>
            {t.tagline}
          </div>
          <h1 style={{ fontSize: "28px", fontWeight: "600", lineHeight: "1.4", marginBottom: "16px" }}>
            {t.headline}
          </h1>
          <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.85)", lineHeight: "1.7", marginBottom: "28px" }}>
            {t.sub}
          </p>
          <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
            <button
  onClick={() => router.push("/onboarding")}
  style={{ background: "#fff", color: "#0F6E56", border: "none", padding: "12px 24px", borderRadius: "8px", fontSize: "15px", fontWeight: "600", cursor: "pointer" }}>
              {t.btn1}
            </button>
            <button style={{ background: "transparent", color: "#fff", border: "1.5px solid rgba(255,255,255,0.6)", padding: "12px 24px", borderRadius: "8px", fontSize: "15px", cursor: "pointer" }}>
              {t.btn2}
            </button>
          </div>
        </div>
      </div>

      {/* TRUST BAR */}
      <div style={{ background: "#E1F5EE", padding: "14px 32px", display: "flex", gap: "24px", flexWrap: "wrap", justifyContent: "center" }}>
        {trust.map((item, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "13px", color: "#0F6E56" }}>
            <span>✓</span> {item}
          </div>
        ))}
      </div>

      {/* SERVICES */}
      <div style={{ maxWidth: "800px", margin: "40px auto", padding: "0 24px", display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "16px" }}>
        {services.map((s, i) => (
          <div key={i} style={{ background: "#fff", borderRadius: "12px", padding: "24px", border: "1px solid #e0e0e0", cursor: "pointer" }}>
            <div style={{ fontSize: "28px", marginBottom: "10px" }}>{s.icon}</div>
            <h3 style={{ fontSize: "16px", fontWeight: "600", marginBottom: "6px", color: "#1a1a1a" }}>{s.title}</h3>
            <p style={{ fontSize: "13px", color: "#666", lineHeight: "1.6" }}>{s.desc}</p>
          </div>
        ))}
      </div>

      {/* FOOTER */}
      <div style={{ background: "#0F6E56", padding: "32px", textAlign: "center", marginTop: "40px" }}>
        <p style={{ color: "#fff", fontWeight: "bold", fontSize: "18px", marginBottom: "6px" }}>Solace</p>
        <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "13px", marginBottom: "16px" }}>marthamuluneh2022@gmail.com · +251 913 818 430 · solace.et</p>
        <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "12px" }}>© 2026 Solace. Addis Ababa, Ethiopia. All rights reserved.</p>
      </div>

    </main>
  );
}
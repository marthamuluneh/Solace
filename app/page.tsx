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
      learnTitle: "Ethiopia's first private mental & psychosocial support platform",
      learnSub: "Built for you, in your language, by Ethiopian professionals who understand your life.",
      step1title: "Create your anonymous account",
      step1desc: "No real name needed. Just a username and email for session notifications. Your identity is never shared.",
      step2title: "Choose your support",
      step2desc: "Individual counselling, group therapy, peer chat rooms, or free wellness content — you decide what feels right.",
      step3title: "Connect privately",
      step3desc: "Meet with a licensed Ethiopian psychologist online or in-person at our Addis Ababa office. In Amharic or English.",
      whyTitle: "Why Solace?",
      w1title: "40–50% cheaper",
      w1desc: "Than private clinics in Addis Ababa — without compromising on quality.",
      w2title: "Fully anonymous",
      w2desc: "No real name required. Your identity is never shared with counsellors or other users.",
      w3title: "Ethiopian professionals",
      w3desc: "Licensed psychologists who understand Ethiopian culture, family dynamics, and language.",
      w4title: "Online & in-person",
      w4desc: "Book a session from anywhere in Ethiopia or visit our Addis Ababa office in person.",
      w5title: "Voice masked",
      w5desc: "Group therapy sessions use voice masking so no participant can identify another.",
      w6title: "Daily stress tracking",
      w6desc: "Check in daily, track your wellbeing over time, and get personalised recommendations.",
      s1title: "Individual Counselling",
      s1desc: "Private one-on-one sessions with verified Ethiopian psychologists. Online or in-person.",
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
      learnTitle: "የኢትዮጵያ የመጀመሪያ ግላዊ የአዕምሮ ጤና መድረክ",
      learnSub: "ለእርስዎ፣ በቋንቋዎ፣ በኢትዮጵያዊ ባለሙያዎች የተሰራ።",
      step1title: "ስም-አልባ መለያ ይፍጠሩ",
      step1desc: "ትክክለኛ ስም አያስፈልግም። ማንነትዎ ፈጽሞ አይጋራም።",
      step2title: "ድጋፍዎን ይምረጡ",
      step2desc: "የግል ምክር፣ የቡድን ሕክምና፣ የእኩያ ቻት — እርስዎ ይወስናሉ።",
      step3title: "በሚስጥር ይገናኙ",
      step3desc: "ከፈቃድ ካለው ኢትዮጵያዊ ሳይኮሎጂስት ጋር በቪዲዮ ወይም በአካል።",
      whyTitle: "ለምን ሶላስ?",
      w1title: "40-50% ርካሽ",
      w1desc: "ከአዲስ አበባ የግል ክሊኒኮች ያነሰ።",
      w2title: "ሙሉ በሙሉ ስም-አልባ",
      w2desc: "ትክክለኛ ስም አያስፈልግም። ማንነትዎ አይጋራም።",
      w3title: "ኢትዮጵያዊ ባለሙያዎች",
      w3desc: "የኢትዮጵያን ባህል እና ቋንቋ የሚረዱ ሳይኮሎጂስቶች።",
      w4title: "በመስመር እና በአካል",
      w4desc: "ከኢትዮጵያ ማንኛውም ቦታ ወይም ጽ/ቤታችንን ይጎብኙ።",
      w5title: "ድምፅ ተደብቋል",
      w5desc: "የቡድን ሕክምና ክፍለ ጊዜዎች ድምፅ ደበቃ ይጠቀማሉ።",
      w6title: "የዕለት ጭንቀት መከታተያ",
      w6desc: "በየዕለቱ ይመዝግቡ እና የጤንነትዎን ሁኔታ ይከታተሉ።",
      s1title: "የግል ምክር",
      s1desc: "ከተረጋገጡ ኢትዮጵያዊ ሳይኮሎጂስቶች ጋር የግል ክፍለ ጊዜ።",
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

  const steps = [
    { icon: "🔒", title: t.step1title, desc: t.step1desc },
    { icon: "🎧", title: t.step2title, desc: t.step2desc },
    { icon: "💬", title: t.step3title, desc: t.step3desc },
  ];

  const whys = [
    { icon: "💰", title: t.w1title, desc: t.w1desc },
    { icon: "🔒", title: t.w2title, desc: t.w2desc },
    { icon: "🇪🇹", title: t.w3title, desc: t.w3desc },
    { icon: "📍", title: t.w4title, desc: t.w4desc },
    { icon: "🎙️", title: t.w5title, desc: t.w5desc },
    { icon: "📊", title: t.w6title, desc: t.w6desc },
  ];

  return (
    <main style={{ fontFamily: "Arial, sans-serif", background: "#f9f9f9", minHeight: "100vh" }}>

      {/* NAV */}
      <nav style={{ background: "#fff", padding: "14px 32px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #e0e0e0", boxShadow: "0 2px 8px rgba(0,0,0,0.06)", position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <img src="/logo.png" alt="Solace" style={{ height: "40px", objectFit: "contain" }} />
        </div>
        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
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
      <div style={{ background: "#0F6E56", padding: "64px 32px", color: "#fff" }}>
        <div style={{ maxWidth: "640px", margin: "0 auto", textAlign: "center" }}>
          <div style={{ background: "rgba(255,255,255,0.2)", display: "inline-block", padding: "4px 16px", borderRadius: "20px", fontSize: "13px", marginBottom: "20px" }}>
            {t.tagline}
          </div>
          <h1 style={{ fontSize: "32px", fontWeight: "600", lineHeight: "1.4", marginBottom: "16px" }}>
            {t.headline}
          </h1>
          <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.85)", lineHeight: "1.7", marginBottom: "32px" }}>
            {t.sub}
          </p>
          <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
            <button
              onClick={() => router.push("/onboarding")}
              style={{ background: "#fff", color: "#0F6E56", border: "none", padding: "14px 28px", borderRadius: "8px", fontSize: "15px", fontWeight: "600", cursor: "pointer" }}>
              {t.btn1}
            </button>
            <button
              onClick={() => document.getElementById("learn-more")?.scrollIntoView({ behavior: "smooth" })}
              style={{ background: "transparent", color: "#fff", border: "1.5px solid rgba(255,255,255,0.6)", padding: "14px 28px", borderRadius: "8px", fontSize: "15px", cursor: "pointer" }}>
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
      <div style={{ maxWidth: "860px", margin: "48px auto", padding: "0 24px", display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "16px" }}>
        {services.map((s, i) => (
          <div key={i} style={{ background: "#fff", borderRadius: "12px", padding: "24px", border: "1px solid #e0e0e0", cursor: "pointer" }}
            onClick={() => router.push("/onboarding")}>
            <div style={{ fontSize: "28px", marginBottom: "10px" }}>{s.icon}</div>
            <h3 style={{ fontSize: "16px", fontWeight: "600", marginBottom: "6px", color: "#1a1a1a" }}>{s.title}</h3>
            <p style={{ fontSize: "13px", color: "#666", lineHeight: "1.6" }}>{s.desc}</p>
          </div>
        ))}
      </div>

      {/* LEARN MORE SECTION */}
      <div id="learn-more" style={{ background: "#fff", padding: "64px 32px", borderTop: "1px solid #e0e0e0" }}>
        <div style={{ maxWidth: "860px", margin: "0 auto" }}>

          {/* INTRO */}
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <h2 style={{ fontSize: "26px", fontWeight: "600", color: "#1a1a1a", marginBottom: "12px" }}>{t.learnTitle}</h2>
            <p style={{ fontSize: "15px", color: "#666", lineHeight: "1.7", maxWidth: "560px", margin: "0 auto" }}>{t.learnSub}</p>
          </div>

          {/* HOW IT WORKS */}
          <h3 style={{ fontSize: "16px", fontWeight: "600", color: "#0F6E56", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "24px", textAlign: "center" }}>How it works</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px", marginBottom: "56px" }}>
            {steps.map((s, i) => (
              <div key={i} style={{ textAlign: "center", padding: "24px 16px" }}>
                <div style={{ width: "56px", height: "56px", borderRadius: "50%", background: "#E1F5EE", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "24px", margin: "0 auto 16px" }}>
                  {s.icon}
                </div>
                <div style={{ width: "24px", height: "24px", borderRadius: "50%", background: "#0F6E56", color: "#fff", fontSize: "13px", fontWeight: "600", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px" }}>
                  {i + 1}
                </div>
                <h4 style={{ fontSize: "15px", fontWeight: "600", color: "#1a1a1a", marginBottom: "8px" }}>{s.title}</h4>
                <p style={{ fontSize: "13px", color: "#666", lineHeight: "1.6" }}>{s.desc}</p>
              </div>
            ))}
          </div>

          {/* WHY SOLACE */}
          <h3 style={{ fontSize: "16px", fontWeight: "600", color: "#0F6E56", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "24px", textAlign: "center" }}>{t.whyTitle}</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px", marginBottom: "48px" }}>
            {whys.map((w, i) => (
              <div key={i} style={{ background: "#f9f9f9", borderRadius: "12px", padding: "20px", border: "1px solid #e0e0e0" }}>
                <div style={{ fontSize: "24px", marginBottom: "10px" }}>{w.icon}</div>
                <h4 style={{ fontSize: "14px", fontWeight: "600", color: "#1a1a1a", marginBottom: "6px" }}>{w.title}</h4>
                <p style={{ fontSize: "13px", color: "#666", lineHeight: "1.5" }}>{w.desc}</p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div style={{ textAlign: "center" }}>
            <button
              onClick={() => router.push("/onboarding")}
              style={{ background: "#0F6E56", color: "#fff", border: "none", padding: "14px 32px", borderRadius: "8px", fontSize: "15px", fontWeight: "600", cursor: "pointer" }}>
              {t.btn1}
            </button>
          </div>

        </div>
      </div>

      {/* FOOTER */}
      <div style={{ background: "#0F6E56", padding: "32px", textAlign: "center" }}>
        <p style={{ color: "#fff", fontWeight: "bold", fontSize: "18px", marginBottom: "6px" }}>Solace</p>
        <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "13px", marginBottom: "16px" }}>marthamuluneh2022@gmail.com · +251 913 818 430 · solace.et</p>
        <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "12px" }}>© 2026 Solace. Addis Ababa, Ethiopia. All rights reserved.</p>
      </div>

    </main>
  );
}
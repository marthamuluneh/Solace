'use client';
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../lib/supabase";

const rooms = [
  { id: "anxiety", label: "Anxiety & worry", emoji: "😔" },
  { id: "relationships", label: "Relationships", emoji: "💔" },
  { id: "family", label: "Family & parenting", emoji: "👨‍👩‍👧" },
  { id: "grief", label: "Grief & loss", emoji: "🕊️" },
  { id: "trauma", label: "Childhood & trauma", emoji: "🌱" },
  { id: "identity", label: "Self & identity", emoji: "🪞" },
  { id: "work", label: "Work & career", emoji: "💼" },
  { id: "financial", label: "Financial stress", emoji: "💸" },
  { id: "academic", label: "Academic pressure", emoji: "📚" },
  { id: "social_media", label: "Social media harm", emoji: "📱" },
];

export default function Chat() {
  const [activeRoom, setActiveRoom] = useState(rooms[0]);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [username, setUsername] = useState("Anonymous");
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    getUsername();
  }, []);

  useEffect(() => {
    fetchMessages();
    const channel = supabase
      .channel(`room:${activeRoom.id}`)
      .on("postgres_changes", {
        event: "INSERT",
        schema: "public",
        table: "messages",
        filter: `room=eq.${activeRoom.id}`,
      }, (payload) => {
        setMessages((prev) => [...prev, payload.new]);
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [activeRoom]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const getUsername = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user?.user_metadata?.username) {
      setUsername(user.user_metadata.username);
    }
  };

  const fetchMessages = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("messages")
      .select("*")
      .eq("room", activeRoom.id)
      .order("created_at", { ascending: true })
      .limit(50);
    if (data) setMessages(data);
    setLoading(false);
  };

  const sendMessage = async () => {
    if (!newMessage.trim()) return;
    const msg = newMessage.trim();
    setNewMessage("");
    await supabase.from("messages").insert({
      room: activeRoom.id,
      username,
      message: msg,
      created_at: new Date().toISOString(),
    });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
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

      {/* CHAT LAYOUT */}
      <div style={{ maxWidth: "1000px", margin: "24px auto", padding: "0 24px", display: "flex", gap: "20px", height: "calc(100vh - 120px)" }}>

        {/* ROOMS PANEL */}
        <div style={{ width: "220px", minWidth: "220px", background: "#fff", borderRadius: "16px", border: "1px solid #e0e0e0", overflow: "hidden", display: "flex", flexDirection: "column" }}>
          <div style={{ padding: "16px", borderBottom: "1px solid #e0e0e0" }}>
            <p style={{ fontSize: "11px", fontWeight: "600", color: "#888", textTransform: "uppercase", letterSpacing: "0.5px", margin: 0 }}>Support rooms</p>
          </div>
          <div style={{ overflowY: "auto", flex: 1 }}>
            {rooms.map((room) => (
              <div key={room.id}
                onClick={() => setActiveRoom(room)}
                style={{
                  padding: "12px 16px", cursor: "pointer", display: "flex", alignItems: "center", gap: "10px",
                  borderLeft: `3px solid ${activeRoom.id === room.id ? "#0F6E56" : "transparent"}`,
                  background: activeRoom.id === room.id ? "#E1F5EE" : "transparent",
                }}>
                <span style={{ fontSize: "16px" }}>{room.emoji}</span>
                <span style={{ fontSize: "13px", fontWeight: activeRoom.id === room.id ? "600" : "400", color: activeRoom.id === room.id ? "#0F6E56" : "#444" }}>
                  {room.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* CHAT PANEL */}
        <div style={{ flex: 1, background: "#fff", borderRadius: "16px", border: "1px solid #e0e0e0", display: "flex", flexDirection: "column", overflow: "hidden" }}>

          {/* CHAT HEADER */}
          <div style={{ padding: "16px 20px", borderBottom: "1px solid #e0e0e0", display: "flex", alignItems: "center", gap: "10px" }}>
            <span style={{ fontSize: "20px" }}>{activeRoom.emoji}</span>
            <div>
              <h3 style={{ fontSize: "15px", fontWeight: "600", color: "#1a1a1a", margin: 0 }}>{activeRoom.label}</h3>
              <p style={{ fontSize: "12px", color: "#888", margin: 0 }}>Anonymous · Moderated · Safe</p>
            </div>
          </div>

          {/* ANONYMOUS NOTICE */}
          <div style={{ background: "#E1F5EE", padding: "10px 20px", display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ fontSize: "14px" }}>🔒</span>
            <span style={{ fontSize: "12px", color: "#0F4A3A" }}>You are anonymous in this room. Your username is the only identifier visible to others.</span>
          </div>

          {/* MESSAGES */}
          <div style={{ flex: 1, overflowY: "auto", padding: "20px", display: "flex", flexDirection: "column", gap: "12px" }}>
            {loading ? (
              <p style={{ textAlign: "center", color: "#888", fontSize: "14px" }}>Loading messages...</p>
            ) : messages.length === 0 ? (
              <div style={{ textAlign: "center", padding: "40px 20px" }}>
                <div style={{ fontSize: "36px", marginBottom: "12px" }}>{activeRoom.emoji}</div>
                <p style={{ fontSize: "15px", fontWeight: "500", color: "#444", marginBottom: "6px" }}>Be the first to share</p>
                <p style={{ fontSize: "13px", color: "#888" }}>This room is quiet right now. Start the conversation — you are not alone.</p>
              </div>
            ) : (
              messages.map((msg, i) => {
                const isOwn = msg.username === username;
                return (
                  <div key={i} style={{ display: "flex", flexDirection: isOwn ? "row-reverse" : "row", gap: "8px", alignItems: "flex-end" }}>
                    <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: isOwn ? "#0F6E56" : "#E1F5EE", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: "600", color: isOwn ? "#fff" : "#0F6E56", minWidth: "32px" }}>
                      {msg.username.slice(0, 2).toUpperCase()}
                    </div>
                    <div style={{ maxWidth: "65%" }}>
                      <div style={{ fontSize: "11px", color: "#888", marginBottom: "3px", textAlign: isOwn ? "right" : "left" }}>
                        {isOwn ? "You" : msg.username} · {formatTime(msg.created_at)}
                      </div>
                      <div style={{
                        background: isOwn ? "#0F6E56" : "#f5f5f5",
                        color: isOwn ? "#fff" : "#1a1a1a",
                        padding: "10px 14px", borderRadius: isOwn ? "12px 12px 0 12px" : "12px 12px 12px 0",
                        fontSize: "14px", lineHeight: "1.5"
                      }}>
                        {msg.message}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* INPUT */}
          <div style={{ padding: "14px 20px", borderTop: "1px solid #e0e0e0", display: "flex", gap: "10px", alignItems: "center" }}>
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Share something... (Press Enter to send)"
              style={{ flex: 1, padding: "10px 14px", border: "1px solid #e0e0e0", borderRadius: "10px", fontSize: "14px", outline: "none" }}
            />
            <button onClick={sendMessage}
              style={{ background: "#0F6E56", color: "#fff", border: "none", padding: "10px 18px", borderRadius: "10px", fontSize: "14px", fontWeight: "500", cursor: "pointer" }}>
              Send
            </button>
          </div>

        </div>
      </div>
    </main>
  );
}
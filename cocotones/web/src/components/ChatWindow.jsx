import React, { useEffect, useRef, useState } from "react";
import { sendChat } from "../api.js";
import MessageBubble from "./MessageBubble.jsx";

export default function ChatWindow({ systemPrompt }) {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Oi! Eu sou o COCOTONES. Como posso te ajudar hoje?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const listRef = useRef(null);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages, loading]);

  async function handleSend() {
    const text = input.trim();
    if (!text || loading) return;

    const next = [...messages, { role: "user", content: text }];
    setMessages(next);
    setInput("");
    setLoading(true);
    setError("");

    try {
      const { reply } = await sendChat(next, systemPrompt);
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch (e) {
      setError("Algo deu errado. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  return (
    <div className="chat-wrapper">
      <div className="chat-bg-gradient" />
      <div className="chat-card glass">
        <div className="chat-header">
          <div className="avatar assistant">🐣</div>
          <div>
            <h2>COCOTONES</h2>
            <p>Conversas inteligentes, visual moderno</p>
          </div>
        </div>

        <div className="messages" ref={listRef}>
          {messages.map((m, i) => (
            <MessageBubble key={i} role={m.role} content={m.content} />
          ))}

          {loading && (
            <div className="typing">
              <span className="dot" />
              <span className="dot" />
              <span className="dot" />
            </div>
          )}
        </div>

        <div className="composer">
          <textarea
            className="input"
            placeholder="Escreva sua mensagem..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={2}
          />
          <button className="send-btn" onClick={handleSend} disabled={loading}>
            {loading ? "Enviando..." : "Enviar"}
          </button>
        </div>

        {error && <div className="error">{error}</div>}
      </div>
    </div>
  );
}

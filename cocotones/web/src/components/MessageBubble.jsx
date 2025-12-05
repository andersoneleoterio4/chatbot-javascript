import React from "react";

export default function MessageBubble({ role, content }) {
  const isUser = role === "user";
  return (
    <div className={`bubble-row ${isUser ? "right" : "left"}`}>
      {!isUser && <div className="avatar bubble-avatar">🐣</div>}
      <div className={`bubble ${isUser ? "user" : "assistant"}`}>
        <div className="bubble-content">{content}</div>
        <div className="bubble-meta">
          <span>{isUser ? "Você" : "COCOTONES"}</span>
          <span>
            {" "}
            •{" "}
            {new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>
      </div>
      {isUser && <div className="avatar bubble-avatar user">🧑</div>}
    </div>
  );
}

import React, { useState } from "react";
import ChatWindow from "./components/ChatWindow.jsx";

export default function App() {
  const [theme, setTheme] = useState("violet");

  const systemPrompt = `
Você é o COCOTONES: um chatbot moderno, acolhedor e direto ao ponto.
Use respostas claras, amigáveis e em português do Brasil.
Seja visual quando possível (listas, subtítulos curtos), sem exageros.
`;

  return (
    <div className={`app app-${theme}`}>
      <header className="topbar">
        <div className="brand">
          <div className="logo">🐣</div>
          <div>
            <h1>COCOTONES</h1>
            <p>Seu copiloto de conversa — moderno, ágil e chamativo</p>
          </div>
        </div>
        <div className="controls">
          <label className="theme-label">Tema</label>
          <select value={theme} onChange={(e) => setTheme(e.target.value)}>
            <option value="violet">Violeta</option>
            <option value="blue">Azul</option>
            <option value="pink">Rosa</option>
            <option value="green">Verde</option>
          </select>
        </div>
      </header>

      <main className="content">
        <ChatWindow systemPrompt={systemPrompt} />
      </main>

      <footer className="footer">
        <span>Feito por Anderson Eleotério — {new Date().getFullYear()}</span>
      </footer>
    </div>
  );
}

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:3001";

export async function sendChat(messages, systemPrompt) {
  const r = await fetch(`${API_BASE}/api/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages, systemPrompt }),
  });

  if (!r.ok) {
    const err = await r.text();
    throw new Error(err || "Falha na requisição");
  }

  return r.json(); // { reply }
}

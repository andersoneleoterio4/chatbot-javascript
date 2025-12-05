import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
if (!OPENAI_API_KEY) {
  console.error("Erro: OPENAI_API_KEY não definida no .env");
  process.exit(1);
}

// Escolha do modelo (ajuste conforme seu plano)
const MODEL = "gpt-4o-mini"; // moderno, rápido e econômico

app.post("/api/chat", async (req, res) => {
  try {
    const { messages, systemPrompt } = req.body;

    const payload = {
      model: MODEL,
      messages: [
        ...(systemPrompt ? [{ role: "system", content: systemPrompt }] : []),
        ...messages,
      ],
      temperature: 0.7,
    };

    const r = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!r.ok) {
      const errText = await r.text();
      return res.status(r.status).json({ error: errText });
    }

    const data = await r.json();
    const text = data?.choices?.[0]?.message?.content ?? "";
    res.json({ reply: text });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro interno no servidor." });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`COCOTONES server rodando em http://localhost:${PORT}`);
});

const express = require('express');
const fetch = require('node-fetch'); // or 'undici' in newer Node
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const API_KEY = "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"; // replace with your actual key

app.post('/ask', async (req, res) => {
  const userInput = req.body.question;

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "http://127.0.0.1:5500", // Replace with your actual frontend
        "X-Title": "DeepSeek Integration"
      },
      body: JSON.stringify({
        model: "deepseek/deepseek-r1:free",
        messages: [
          {
            role: "user",
            content: userInput
          }
        ]
      })
    });

    const data = await response.json();
    const answer = data.choices?.[0]?.message?.content;
    res.json({ response: answer });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Something went wrong." });
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});

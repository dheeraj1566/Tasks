// import express from "express";
// import cors from "cors";
// import fetch from "node-fetch"; // If using ESM
// import { OpenAI } from "openai";

// const app = express();
// const PORT = 5500;


// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));


// const FRONTEND_URL = "http://127.0.0.1:5500/index.html";
// app.use(cors({ origin: FRONTEND_URL }));


// const API_KEY =
//   "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";
// // OpenAI API Configuration
// const openai = new OpenAI({
//   apiKey: API_KEY, // Replace with your OpenAI API Key
// });


// // Route to interact with AI agents
// app.post("/chat", async (req, res) => {
//   const { message, agent } = req.body;

//   try {
//     if (agent === "anthropic") {
//       // Request to Anthropic API
//       const response = await fetch("https://api.anthropic.com/v1/messages", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           "X-API-Key": "YOUR_ANTHROPIC_API_KEY",
//           "Anthropic-Version": "2023-06-01",
//         },
//         body: JSON.stringify({
//           model: "claude-3-haiku-20240307",
//           max_tokens: 300,
//           messages: [{ role: "user", content: message }],
//         }),
//       });

//       const data = await response.json();
//       return res.json({ response: data.content[0].text });
//     } else if (agent === "chatgpt") {
//       // Request to OpenAI API (ChatGPT)
//       const completion = await openai.chat.completions.create({
//         model: "gpt-3.5-turbo", // Change to "gpt-4" if needed
//         messages: [{ role: "user", content: message }],
//       });

//       return res.json({ response: completion.choices[0].message.content });
//     } else {
//       return res.status(400).json({ error: "Invalid AI agent selected" });
//     }
//   } catch (error) {
//     console.error("Error calling AI API:", error);
//     res.status(500).json({ error: "Failed to process request" });
//   }
// });

// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });


import express from "express";
import cors from "cors";
import fetch from "node-fetch"; // If using ESM
import { OpenAI } from "openai";

const app = express();
const PORT = 5500;

// Allowed frontend URLs
const allowedOrigins = [
  "http://localhost:5173", // If using Vite
  "http://127.0.0.1:5500/index.html", // If opening with Live Server
  "http://localhost:5500", // If running frontend on same port
];

// Enable CORS dynamically
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST"], // Allow only GET and POST
    allowedHeaders: ["Content-Type"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const API_KEY = "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"; // Replace with actual API key

// OpenAI API Configuration
const openai = new OpenAI({
  apiKey: API_KEY, 
});

// Route to interact with AI agents
app.post("/chat", async (req, res) => {
  const { message, agent } = req.body;

  try {
    if (agent === "anthropic") {
      // Request to Anthropic API
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-API-Key": "YOUR_ANTHROPIC_API_KEY",
          "Anthropic-Version": "2023-06-01",
        },
        body: JSON.stringify({
          model: "claude-3-haiku-20240307",
          max_tokens: 300,
          messages: [{ role: "user", content: message }],
        }),
      });

      const data = await response.json();
      return res.json({ response: data.content[0].text });
    } else if (agent === "chatgpt") {
      // Request to OpenAI API (ChatGPT)
      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: message }],
      });

      return res.json({ response: completion.choices[0].message.content });
    } else {
      return res.status(400).json({ error: "Invalid AI agent selected" });
    }
  } catch (error) {
    console.error("Error calling AI API:", error);
    res.status(500).json({ error: "Failed to process request" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

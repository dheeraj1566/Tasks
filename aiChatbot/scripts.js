// // Replace with your actual Anthropic API key
// const API_KEY =
//   "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";

// // Chat UI Elements
const chatMessages = document.getElementById("chat-messages");
// const chatForm = document.getElementById("chat-form");
// const userInput = document.getElementById("user-input");

// Message rendering function
function addMessage(content, sender) {
  const messageElement = document.createElement("div");
  messageElement.classList.add("message", `${sender}-message`);
  messageElement.textContent = content;
  chatMessages.appendChild(messageElement);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

// // AI interaction function
// async function callAnthropicAPI(userMessage) {
//   try {
//     const response = await fetch("http://localhost:5500/direct-anthropic", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         "X-API-Key": API_KEY,
//         "Anthropic-Version": "2023-06-01",
//       },
//       body: JSON.stringify({
//         model: "claude-3-haiku-20240307",
//         max_tokens: 1000,
//         messages: [{ role: "user", content: userMessage }],
//       }),
//     });

//     // Log the full response for debugging
//     // console.log("Response status:", response.status);
//     const responseText = await response.text();
//     // console.log("Response body:", responseText);

//     if (!response.ok) {
//       throw new Error("API request failed");
//     }

//     const data = JSON.parse(responseText);
//     console.log("data", data);
//     return data.content[0].text;
//   } catch (error) {
//     console.error("Detailed Error:", error);
//     return `Sorry, I couldn't process your request. Error: ${error.message}`;
//   }
// }
// // callAnthropicAPI("Hello AI");

// // Form submission handler
// async function handleSubmit(event) {
//   event.preventDefault();
//   const message = userInput.value.trim();

//   if (message) {
//     // Display user message
//     addMessage(message, "user");

//     // Clear input
//     userInput.value = "";

//     // Show loading indicator
//     addMessage("Thinking...", "ai");

//     // Call AI and get response
//     const aiResponse = await callAnthropicAPI(message);

//     // Remove loading message and show AI response
//     chatMessages.removeChild(chatMessages.lastChild);
//     addMessage(aiResponse, "ai");
//   }
// }

// // fetch("http://localhost:5500/test", {
// //   method: "POST",
// //   headers: { "Content-Type": "application/json" },
// //   body: JSON.stringify({ message: "Hello Server" }),
// // })
// //   .then((res) => res.json())
// //   .then((data) => console.log("Server response:", data))
// //   .catch((err) => console.error("Error:", err));

// // Event Listeners
// chatForm.addEventListener("submit", handleSubmit);

const chatForm = document.getElementById("chat-form");
const userInput = document.getElementById("user-input");
const agentSelect = document.createElement("select");

// Add AI options
agentSelect.innerHTML = `
  <option value="chatgpt">ChatGPT</option>
  <option value="anthropic">Anthropic</option>
`;
chatForm.prepend(agentSelect);

async function callAIAPI(userMessage, agent) {
  try {
    const response = await fetch("http://localhost:5500/chat", {
      method: "fetch",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: userMessage, agent }),
    });

    const data = await response.json();
    return data.response || "Error: No response received";
  } catch (error) {
    console.error("Error:", error);
    return "Error processing request";
  }
}

// Handle form submission
async function handleSubmit(event) {
  event.preventDefault();
  const message = userInput.value.trim();
  const selectedAgent = agentSelect.value;

  if (message) {
    addMessage(message, "user");
    userInput.value = "";
    addMessage("Thinking...", "ai");

    const aiResponse = await callAIAPI(message, selectedAgent);
    chatMessages.removeChild(chatMessages.lastChild);
    addMessage(aiResponse, "ai");
  }
}

chatForm.addEventListener("submit", handleSubmit);

const API_KEY='AIzaSyD-2n6w8o2z9jJ5f4zjw8zQ6Q8Qc4aHwX8';
const URL=`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?API_KEY=${API_KEY}`;

const btn = document.querySelector(".send_btn");
btn.addEventListener("click", sendMessage);

async function sendMessage() {
    const userInput = document.getElementById("user-input").value;
    if (!userInput) return;

    updateChat("You", userInput);
    document.getElementById("user-input").value = "";
    
    const response = await fetch(URL)
    console.log("response", response);

    // try {
    //     const response = await fetch(`URL${API_KEY}`, {
    //         method: "POST",
    //         headers: { "Content-Type": "application/json" },
    //         body: JSON.stringify({ prompt: { text: userInput } })
    //     });

    //     const data = await response.json();
    //     const aiResponse = data.candidates?.[0]?.output || "Sorry, I couldn't understand that.";
        
    //     updateChat("Gemini AI", aiResponse);
    // } catch (error) {
    //     console.error("Error:", error);
    //     updateChat("Gemini AI", "Error communicating with AI.");
    // }
}

function updateChat(sender, message) {
    const chatBox = document.getElementById("chat-box");
    chatBox.innerHTML += `<p><strong>${sender}:</strong> ${message}</p>`;
    chatBox.scrollTop = chatBox.scrollHeight;
}

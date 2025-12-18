// Greeting on load
window.onload = () => {
  addMessage("Hello 👋 Kaise madad kar sakta hoon?", "bot");
};

// Smart replies data
const replies = {
  hello: ["Hello 👋", "Hi 😊", "Hey!"],
  howareyou: ["Main theek hoon 😊", "Sab badhiya 👍", "Achha feel kar raha hoon 😄"],
  name: ["Main aapka chatbot hoon 🤖", "Mera naam ChatBot hai"],
  help: ["Haan batao 😊", "Main madad ke liye hoon 👍"],
  bye: ["Bye 👋", "Phir milenge 😊"]
};

function sendMessage() {
  const input = document.getElementById("userInput");
  const text = input.value.toLowerCase().trim();
  if (text === "") return;

  addMessage(text, "user");
  input.value = "";

  // Show typing indicator
  const typingId = showTyping();

  const reply = smartReply(text);

  setTimeout(() => {
    removeTyping(typingId);
    addMessage(reply, "bot");
  }, 1200);
}

function smartReply(text) {
  if (text.includes("hello") || text.includes("hi")) return random(replies.hello);
  if (text.includes("how") && text.includes("you")) return random(replies.howareyou);
  if (text.includes("name")) return random(replies.name);
  if (text.includes("help")) return random(replies.help);
  if (text.includes("bye")) return random(replies.bye);

  return random([
    "Thoda aur explain karo 😊",
    "Samajhne ki koshish kar raha hoon 🤔",
    "Ispe thodi detail chahiye 👍"
  ]);
}

function random(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// Typing indicator
function showTyping() {
  const chatBox = document.getElementById("chatBox");
  const div = document.createElement("div");
  div.className = "message bot typing";
  div.innerText = "ChatBot is typing…";
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
  return div;
}

function removeTyping(el) {
  el.remove();
}

function addMessage(message, type) {
  const chatBox = document.getElementById("chatBox");
  const div = document.createElement("div");
  div.className = "message " + type;
  div.innerText = message;
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
}

// Enter key support
document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("userInput");
  input.addEventListener("keydown", e => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  });
});

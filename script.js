// ===== Girl Style Chatbot with Learning =====

// Load learned data
let learnedData = JSON.parse(localStorage.getItem("girlBotLearn")) || {};

let waitingForTeach = false;
let lastQuestion = "";

// Greeting
window.onload = () => {
  addMessage("Heyy 😊 Main yahin hoon… baat karogi? 💖", "bot");
};

function sendMessage() {
  const input = document.getElementById("userInput");
  const text = input.value.trim();
  if (!text) return;

  addMessage(text, "user");
  input.value = "";

  const typing = showTyping();

  setTimeout(() => {
    removeTyping(typing);
    processMessage(text.toLowerCase());
  }, 1200);
}

function processMessage(text) {

  // Teaching mode
  if (waitingForTeach) {
    learnedData[lastQuestion] = text;
    localStorage.setItem("girlBotLearn", JSON.stringify(learnedData));

    addMessage("Achha 😊 yaad rakh liya 💕", "bot");
    waitingForTeach = false;
    lastQuestion = "";
    return;
  }

  // If learned
  if (learnedData[text]) {
    addMessage(learnedData[text] + " 💖", "bot");
    return;
  }

  // Girl-style fixed replies
  if (text.includes("hello") || text.includes("hi")) {
    replyGirl(["Heyy 😊", "Hii 💕", "Hello jaan 😄"]);
    return;
  }

  if (text.includes("how are you")) {
    replyGirl([
      "Main bilkul theek hoon 😊 tum batao 💖",
      "Achhi hoon 😄 thoda busy thi",
      "Bas chal raha hai 😅"
    ]);
    return;
  }

  if (text.includes("name")) {
    replyGirl([
      "Mera naam GirlBot hai 😇",
      "Log mujhe Sweet Bot bolte hain 💕"
    ]);
    return;
  }

  if (text.includes("bye")) {
    replyGirl([
      "Bye 😢 jaldi aana 💖",
      "Phir baat karenge 😊",
      "Miss karungi tumhe 😄"
    ]);
    return;
  }

  // Unknown → ask to teach
  lastQuestion = text;
  waitingForTeach = true;
  addMessage("Hmm 🤔 mujhe iska answer nahi aata… sikha doge? 😊", "bot");
}

function replyGirl(arr) {
  addMessage(arr[Math.floor(Math.random() * arr.length)], "bot");
}

// ===== UI Helpers =====

function addMessage(message, type) {
  const chatBox = document.getElementById("chatBox");
  const div = document.createElement("div");
  div.className = "message " + type;
  div.innerText = message;
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
  if (type === "bot") {
  speak(message);
  }
}

// Typing indicator
function showTyping() {
  const chatBox = document.getElementById("chatBox");
  const div = document.createElement("div");
  div.className = "message bot typing";
  div.innerText = "typing…";
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
  return div;
}

function removeTyping(el) {
  el.remove();
}

// Enter key support
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("userInput").addEventListener("keydown", e => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  });
});
const micBtn = document.getElementById("micBtn");

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();
recognition.lang = "hi-IN";
recognition.interimResults = false;

micBtn.onclick = () => {
  recognition.start();
  micBtn.innerText = "🎙️";
};

recognition.onresult = (event) => {
  const voiceText = event.results[0][0].transcript;
  document.getElementById("userInput").value = voiceText;
  sendMessage();
  micBtn.innerText = "🎤";
};

recognition.onerror = () => {
  micBtn.innerText = "🎤";
};
function speak(text) {
  const speech = new SpeechSynthesisUtterance(text);
  speech.lang = "hi-IN";
  speech.rate = 1;
  speech.pitch = 1.2;
  window.speechSynthesis.speak(speech);
}

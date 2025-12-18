// Greeting on load
window.onload = () => {
  addMessage("Hello 👋 Kaise madad kar sakta hoon?", "bot");
};

// Smart replies data
const replies = {
  hello: [
    "Hello 👋",
    "Hi 😊",
    "Hey! Kaise ho?"
  ],
  howareyou: [
    "Main bilkul theek hoon 😊",
    "Sab badhiya 👍 aap batao",
    "Achha feel kar raha hoon 😄"
  ],
  name: [
    "Main aapka smart chatbot hoon 🤖",
    "Mera naam ChatBot hai 😊"
  ],
  help: [
    "Haan bilkul, bataiye 😊",
    "Main yahin hoon madad ke liye 👍"
  ],
  bye: [
    "Bye 👋 phir milenge",
    "Take care 😊",
    "Milte hain dobara 👋"
  ]
};

function sendMessage() {
  const input = document.getElementById("userInput");
  const text = input.value.toLowerCase().trim();
  if (text === "") return;

  addMessage(text, "user");
  input.value = "";

  let reply = smartReply(text);

  setTimeout(() => {
    addMessage(reply, "bot");
  }, 700);
}

function smartReply(text) {
  if (text.includes("hello") || text.includes("hi")) {
    return random(replies.hello);
  }
  if (text.includes("how") && text.includes("you")) {
    return random(replies.howareyou);
  }
  if (text.includes("name")) {
    return random(replies.name);
  }
  if (text.includes("help")) {
    return random(replies.help);
  }
  if (text.includes("bye")) {
    return random(replies.bye);
  }

  // Default smart reply
  const defaults = [
    "Thoda aur clear batao 😊",
    "Samajhne ki koshish kar raha hoon 🤔",
    "Ispe thodi detail chahiye 👍"
  ];
  return random(defaults);
}

function random(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function addMessage(message, type) {
  const chatBox = document.getElementById("chatBox");
  const div = document.createElement("div");
  div.className = "message " + type;
  div.innerText = message;
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
}

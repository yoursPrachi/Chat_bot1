function sendMessage() {
  const input = document.getElementById("userInput");
  const text = input.value.toLowerCase().trim();
  if (text === "") return;

  addMessage(text, "user");
  input.value = "";

  let reply = "Samajh nahi aaya 😅";

  if (text.includes("hello")) reply = "Hello 👋";
  else if (text.includes("how are you")) reply = "Main theek hoon 😊";
  else if (text.includes("name")) reply = "Main ek basic chatbot hoon 🤖";
  else if (text.includes("bye")) reply = "Bye 👋 phir milenge";

  setTimeout(() => {
    addMessage(reply, "bot");
  }, 600);
}

function addMessage(message, type) {
  const chatBox = document.getElementById("chatBox");
  const div = document.createElement("div");
  div.className = "message " + type;
  div.innerText = message;
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
}

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCXxwXHnQop2RuEs-7W1DCQ8-35iGClWik",
  authDomain: "mira-chatbot-9e51a.firebaseapp.com",
  projectId: "mira-chatbot-9e51a",
  storageBucket: "mira-chatbot-9e51a.firebasestorage.app",
  messagingSenderId: "856415616380",
  appId: "1:856415616380:web:320ac30e32f711eeb8b8f9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

const userLang = navigator.language || "en-US";

function getLang() {
  if (userLang.startsWith("hi")) return "hi";
  if (userLang.startsWith("es")) return "es";
  if (userLang.startsWith("fr")) return "fr";
  if (userLang.startsWith("de")) return "de";
  return "en";
}

const lang = getLang();

let avatar = "avatars/mira-default.png";

if (userLang.startsWith("hi")) avatar = "avatars/mira-india.png";
else if (userLang.startsWith("en-US")) avatar = "avatars/mira-usa.png";
else if (userLang.startsWith("es")) avatar = "avatars/mira-latin.png";
else if (userLang.startsWith("fr") || userLang.startsWith("de"))
  avatar = "avatars/mira-europe.png";
const translations = {
  "hey 😊 how are you?": {
    hi: "hey 😊 kaise ho?",
    es: "hola 😊 ¿cómo estás?",
    fr: "salut 😊 ça va?",
    de: "hallo 😊 wie geht’s?"
  },
  "hmm… that’s new 🤔": {
    hi: "hmm… ye naya hai 🤔",
    es: "hmm… esto es nuevo 🤔",
    fr: "hmm… c’est nouveau 🤔",
    de: "hmm… das ist neu 🤔"
  }
};

function translate(text) {
  if (lang === "en") return text;
  return translations[text]?.[lang] || text;
}
const chatBox = document.getElementById("chatBox");
const input = document.getElementById("userInput");

function addMessage(text, type) {
  const div = document.createElement("div");
  div.className = `msg ${type}`;
  div.innerText = text;
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function sendMessage() {
  const text = input.value.trim();
  if (!text) return;

  addMessage(text, "user");
  input.value = "";

  setTimeout(() => reply(text), 600);
}

async function reply(text) {
  const snap = await db
    .collection("learned")
    .where("q", "==", text)
    .where("lang", "==", lang)
    .get();

  if (!snap.empty) {
    addMessage(snap.docs[0].data().a, "bot");
    return;
  }

  const baseReply = "hmm… that’s new 🤔";
  addMessage(translate(baseReply), "bot");

  db.collection("learned").add({
    q: text,
    a: translate("okay 😊"),
    lang: lang
  });
}

window.onload = () => {
  document.getElementById("avatar").src = avatar;
  addMessage(translate("hey 😊 how are you?"), "bot");
};

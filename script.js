const firebaseConfig = {
  apiKey: "YOUR_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT",
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

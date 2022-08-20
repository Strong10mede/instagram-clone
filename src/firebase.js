// Import the functions you need from the SDKs you need
import firebase from "firebase";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyC2vq7El9TYuhfMpgR6g2tK1iEwOLsg1IA",
  authDomain: "instagram-clone-7a5b0.firebaseapp.com",
  projectId: "instagram-clone-7a5b0",
  storageBucket: "instagram-clone-7a5b0.appspot.com",
  messagingSenderId: "121126910497",
  appId: "1:121126910497:web:0e4f96005c5b84f3c84160",
});

// Initialize Firebase

const db = firebaseApp.firestore();

const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };

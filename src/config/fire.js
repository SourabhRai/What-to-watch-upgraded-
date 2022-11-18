import firebase from "firebase";
require("firebase/auth");
require("firebase/firestore");

const firebaseConfig = {
  apiKey: "AIzaSyC8Ms93DULVSOvAfrh_ZL5NFZmJW_aNZLc",
  authDomain: "what-to-watch-ca447.firebaseapp.com",
  projectId: "what-to-watch-ca447",
  storageBucket: "what-to-watch-ca447.appspot.com",
  messagingSenderId: "535855965246",
  appId: "1:535855965246:web:d7fa9282f5af64c7ae9d6f",
  measurementId: "G-7F4TN8RFBQ",
};

const fire = firebase.initializeApp(firebaseConfig);
export const db = fire.firestore();
export const auth = fire.auth();
console.log(auth);
export default fire;

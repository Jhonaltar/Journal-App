import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCtok4f8235K9w9a5vuxmyHrDIy4PRnp9k",

  authDomain: "react-app-cursos-c0d45.firebaseapp.com",

  projectId: "react-app-cursos-c0d45",

  storageBucket: "react-app-cursos-c0d45.appspot.com",

  messagingSenderId: "351597367706",

  appId: "1:351597367706:web:1e0b629d3625b7f08aaa23",
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export { db, googleAuthProvider, firebase };

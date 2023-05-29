import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider, signInWithPopup} from 'firebase/auth'
const firebaseConfig = {
  apiKey: "AIzaSyD1SR4HJSofacnTUmmS3q9G2v_ORAxJeU4",
  authDomain: "pinterest-a7ebb.firebaseapp.com",
  projectId: "pinterest-a7ebb",
  storageBucket: "pinterest-a7ebb.appspot.com",
  messagingSenderId: "44789348804",
  appId: "1:44789348804:web:bef17b55d5eff505e54c91"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)

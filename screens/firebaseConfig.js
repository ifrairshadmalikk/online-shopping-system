import { initializeApp } from '@firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from '@firebase/auth';


const firebaseConfig = {
  apiKey: "AIzaSyAdO3jQ_3ry2gLaUQzlXHE3fiA47XhhBEc",
  authDomain: "ifrahsproject.firebaseapp.com",
  projectId: "ifrahsproject",
  storageBucket: "ifrahsproject.appspot.com",
  messagingSenderId: "1037630213438",
  appId: "1:1037630213438:android:db93983a6cc0adcc39b06f",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut }; 



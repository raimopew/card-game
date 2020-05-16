import * as firebase from 'firebase';
import "firebase/database";


const firebaseConfig = {
  apiKey: "AIzaSyCH_3VItSkgSuYioC1Ucfw-xe-a16lHAS8",
  authDomain: "card-game-24fad.firebaseapp.com",
  databaseURL: "https://card-game-24fad.firebaseio.com",
  projectId: "card-game-24fad",
  storageBucket: "card-game-24fad.appspot.com",
  messagingSenderId: "540700140587",
  appId: "1:540700140587:web:dc2b760ee00f5c56e8f66e"
};
// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
export const db = app.database();

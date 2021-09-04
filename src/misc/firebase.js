// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from 'firebase/app'
import "firebase/auth"
import "firebase/database"
import "firebase/storage"
const firebaseConfig = {
  apiKey: "AIzaSyB5D6YQPE7Po5rVEiE7r4GirI2m-EaKcvg",
  authDomain: "we-chit-chat.firebaseapp.com",
  projectId: "we-chit-chat",
  storageBucket: "we-chit-chat.appspot.com",
  messagingSenderId: "901105330468",
  appId: "1:901105330468:web:a2a1574072b3aa221e2bb1",
  measurementId: "G-BQ8K9E76EC"
};

const app = firebase.initializeApp(firebaseConfig) ;
//initialiseApp return instance of the firebaseapp


export const auth = app.auth();
export const database = app.database();
export const storage =app.storage();
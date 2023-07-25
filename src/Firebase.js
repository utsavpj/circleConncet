// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
import {getStorage} from "firebase/storage"


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBimDDuvQkCf_OMUHvZ7NH4rixJObxc3lY",
  authDomain: "circleconnect2-dcb6a.firebaseapp.com",
  databaseURL: "https://circleconnect2-dcb6a-default-rtdb.firebaseio.com",
  projectId: "circleconnect2-dcb6a",
  storageBucket: "circleconnect2-dcb6a.appspot.com",
  messagingSenderId: "697216645156",
  appId: "1:697216645156:web:b3dc8d33e85d306f2940b1",
  measurementId: "G-HSKZNP174F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
export const database = getDatabase(app);
export const storage = getStorage(app);
export const firestore = getFirestore(app);


// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
export {auth }
export {db}
export default app;




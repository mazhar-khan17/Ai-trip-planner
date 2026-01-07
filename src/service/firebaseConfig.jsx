// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDkU91Era3rSTlHU_MBp1QQ5ACqRgtqKrc",
    authDomain: "tripplanner-eef86.firebaseapp.com",
    projectId: "tripplanner-eef86",
    storageBucket: "tripplanner-eef86.firebasestorage.app",
    messagingSenderId: "525148640953",
    appId: "1:525148640953:web:eaeafb109d1fd4a9bf2d68",
    measurementId: "G-VS0ZMF8MPT"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
// const analytics = getAnalytics(app);
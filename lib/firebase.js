import { initializeApp } from "firebase/compat/app";

import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDmgelumb02g334vwVLmCjuiuhkcmSthXk",
  authDomain: "ib-cs-ia-a1bcd.firebaseapp.com",
  projectId: "ib-cs-ia-a1bcd",
  storageBucket: "ib-cs-ia-a1bcd.appspot.com",
  messagingSenderId: "146908973732",
  appId: "1:146908973732:web:ef18bfc34cb9fb0edc7431",
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const firestore = firebase.firestore();
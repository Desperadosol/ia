import firebase from "firebase/compat/app";

import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDmgelumb02g334vwVLmCjuiuhkcmSthXk",
  authDomain: "ib-cs-ia-a1bcd.firebaseapp.com",
  projectId: "ib-cs-ia-a1bcd",
  storageBucket: "ib-cs-ia-a1bcd.appspot.com",
  messagingSenderId: "146908973732",
  appId: "1:146908973732:web:ef18bfc34cb9fb0edc7431",
};

// Initialize Firebase, only if it hasn't been initialised before
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const firestore = firebase.firestore();
export const auth = firebase.auth();
export const storage = firebase.storage()
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

import { firestore } from "./firebase.js";
import { doc, getDoc, getDocs, updateDoc, collection, addDoc } from "firebase/firestore";

export async function getUser(uid) {
  const docRef = doc(firestore, "users", uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    console.log("No such user!");
  }
}

export async function updateUser(uid, updates) {
  const docRef = doc(firestore, "users", uid);
  await updateDoc(docRef, updates);
}

export async function addEvent(event) {
  const eventsCollection = collection(firestore, "events");
  await addDoc(eventsCollection, event);
}

export async function getEvents() {
  const eventsCollection = collection(firestore, 'events'); // replace 'events' with your collection name
  const eventDocs = await getDocs(eventsCollection);
  const events = eventDocs.docs.map(doc => doc.data());
  return events;
}




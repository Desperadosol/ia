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
  const docRef = await addDoc(eventsCollection, event);
  await updateDoc(docRef, { id: docRef.id });
}

export async function getEvent(id) {
  const docRef = doc(firestore, "events", id);
  const docSnap = await getDoc(docRef);
  return docSnap.data();
}

export async function getEvents() {
  const eventsCollection = collection(firestore, 'events'); // replace 'events' with your collection name
  const eventDocs = await getDocs(eventsCollection);
  const events = eventDocs.docs.map(doc => doc.data());
  return events;
}

export async function saveTeacherPassword(password) {
  const docRef = doc(firestore, "passwords", "password");
  await updateDoc(docRef, { password: password });
}

export async function getTeacherPassword() {
  const docRef = doc(firestore, "passwords", "password");
  const docSnap = await getDoc(docRef);
  return docSnap.data().password;
}

export async function updateEvent(eventId, updates) {
  const docRef = doc(firestore, "events", eventId);
  await updateDoc(docRef, updates);
}


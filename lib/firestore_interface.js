import { firestore } from "./firebase.js";
import { doc, getDoc, getDocs, updateDoc, collection, addDoc, deleteDoc} from "firebase/firestore";
import { deleteFile } from './storage_interface.js';

export async function getUser(uid) {
  const docRef = doc(firestore, "users", uid);
  const docSnap = await getDoc(docRef);
  return docSnap.data();
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
  const eventsCollection = collection(firestore, 'events');
  const eventDocs = await getDocs(eventsCollection);
  return eventDocs.docs.map(doc => doc.data());
}

export async function deleteEvent(id) {
  // First, get the event data
  const eventDoc = await getDoc(doc(firestore, 'events', id));
  const eventData = eventDoc.data();

  // Then, delete each file associated with the event
  if (eventData.files) {
    for (const file of eventData.files) {
      const path = `events/${id}/${file.name}`;
      await deleteFile(path);
    }
  }

  // Finally, delete the event document
  await deleteDoc(doc(firestore, 'events', id));
}

export async function updateEvent(eventId, updates) {
  const docRef = doc(firestore, "events", eventId);
  await updateDoc(docRef, updates);
}

export async function deleteStudentFromEvent(eventId, studentId) {
  const docRef = doc(firestore, "events", eventId);
  const docSnap = await getDoc(docRef);
  const event = docSnap.data();
  // Filter out the student to be deleted from the list of students
  const students = event.students.filter(student => student !== studentId);
  await updateDoc(docRef, { students: students });
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

export async function getTeachers() {
  const usersCollection = collection(firestore, 'users');
  const userDocs = await getDocs(usersCollection);
  const users = userDocs.docs.map(doc => doc.data());
  const teachers = users.filter(user => user.role === 'teacher');
  return teachers;
}


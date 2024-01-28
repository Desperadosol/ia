import { auth, firestore } from '../lib/firebase';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

// Custom hook to manage user data
export function useUserData() {
  // Get the current user from Firebase authentication
  const [user] = useAuthState(auth);
  // Initialize username and role state
  const [username, setUsername] = useState(null);
  const [role, setRole] = useState(null);

  // Use an effect to subscribe to the user's data in Firestore
  useEffect(() => {
    let unsubscribe;
    // If there is a user logged in
    if (user) {
      // Get a reference to the user's document in the Firestore collection
      const ref = firestore.collection('users').doc(user.uid);
      // Subscribe to the document and update the username and role state whenever it changes
      unsubscribe = ref.onSnapshot((doc) => {
        setUsername(doc.data()?.username);
        setRole(doc.data()?.role);
      });
    } else {
      // If there is no user logged in, reset the username and role state
      setUsername(null);
      setRole(null);
    }
    // Return a cleanup function to unsubscribe from the Firestore document when the component unmounts
    return unsubscribe;
  }, [user]); // Re-run the effect when the user changes

  return { user, username, role };
}
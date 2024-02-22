import { storage } from "./firebase.js";
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";

export function uploadFile(path, file) {
  return new Promise((resolve, reject) => {
    const storageRef = ref(storage, path);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed", // Event listener for tracking upload progress
      (snapshot) => {
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
      },
      (error) => {
        reject(error); // Reject the promise if there's an error
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          resolve(downloadURL); // Resolve the promise with the download URL
        });
      }
    );
  });
}

export function deleteFile(path) {
  const storageRef = ref(storage, path);
  return deleteObject(storageRef);
}

export function getDownloadLink(path) {
  return getDownloadURL(ref(storage, path));
}

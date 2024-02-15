import { storage } from "./firebase.js"
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";

export function uploadFile(path, file) {
    return new Promise((resolve, reject) => {
        const storageRef = ref(storage, path);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on('state_changed', 
            (snapshot) => {
                // You can use this function to monitor the upload progress
            }, 
            (error) => {
                reject(error);
            }, 
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    resolve(downloadURL);
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
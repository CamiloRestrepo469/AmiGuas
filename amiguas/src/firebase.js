// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from 'firebase/auth'
import { getStorage, ref, uploadBytes  } from 'firebase/storage';


const firebaseConfig = {
  apiKey: "AIzaSyCwrLT4S3Czr3DInkVlNE_aLdOf9Y-DVjo",
  authDomain: "amiguas-f.firebaseapp.com",
  projectId: "amiguas-f",
  storageBucket: "amiguas-f.appspot.com",
  messagingSenderId: "832142741235",
  appId: "1:832142741235:web:5d53e78a899b88102cf186"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const store = getStorage(app);

export function uploadFile(file) {
  const storageRef = ref(store, 'some-child')
  uploadBytes(storageRef, file).then(snapshot => {
    console.log(snapshot)
  })
}

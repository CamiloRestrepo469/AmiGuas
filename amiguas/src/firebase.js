// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { getStorage, ref, uploadBytes, getDownloadURL  } from 'firebase/storage';
import { v4 } from 'uuid';

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
// db para la base de datos
export const db = getFirestore(app);
// auth para llamara la base de datos
export const auth = getAuth(app);
auth.languageCode = 'es';
// store llama la base de datos de fotos
export const store = getStorage(app);
// para hacer al conexion de google 
export const provider = new GoogleAuthProvider();

// funcion para enviar el archivo y convertirlo en url
export async function uploadFile(file) {
  const storageRef = ref(store, `img/${v4()}`)
  await uploadBytes(storageRef, file)
  const url = await getDownloadURL(storageRef)
  return url;
}

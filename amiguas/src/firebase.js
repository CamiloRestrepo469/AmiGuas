// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { getStorage, ref, uploadBytes, getDownloadURL  } from 'firebase/storage';
import { v4 } from 'uuid';

const firebaseConfig = {
  apiKey: "AIzaSyADFKfGfnXhcvNtZjN1L4bQudMP2A-EqSw",
  authDomain: "amiguuas-cc628.firebaseapp.com",
  projectId: "amiguuas-cc628",
  storageBucket: "amiguuas-cc628.appspot.com",
  messagingSenderId: "313854433904",
  appId: "1:313854433904:web:ddaa1ecdb59043d88cb2b5"
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


// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyADFKfGfnXhcvNtZjN1L4bQudMP2A-EqSw",
//   authDomain: "amiguuas-cc628.firebaseapp.com",
//   projectId: "amiguuas-cc628",
//   storageBucket: "amiguuas-cc628.appspot.com",
//   messagingSenderId: "313854433904",
//   appId: "1:313854433904:web:ddaa1ecdb59043d88cb2b5"
// };

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
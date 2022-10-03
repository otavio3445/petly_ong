// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc, updateDoc, doc } from '@firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from '@firebase/storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCnajDwTVb3ywJOOWKKRqzvWGkfteXxLD0",
  authDomain: "bd-petly.firebaseapp.com",
  projectId: "bd-petly",
  storageBucket: "bd-petly.appspot.com",
  messagingSenderId: "918900320431",
  appId: "1:918900320431:web:3d8eb213128057f333cc5a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const storage = getStorage(app, "gs://bd-petly.appspot.com");
const bd_pets = collection(firestore, "Pets");
const bd_produtos = collection(firestore, "Products");
const bd_users = collection(firestore, "Users");

export async function getDocsFB() {
  const pets = await getDocs(bd_pets);
  return pets
}

export async function getDocsProdsFB() {
  const products = await getDocs(bd_produtos);
  return products
}

export async function getUsersFB() {
  const users = await getDocs(bd_users);
  return users
}

export async function setPets(data) {
  return await addDoc(bd_pets, data).then((result) => result);
}

export async function updateDocFB(id, data, db) {
  const document = doc(firestore, db, id)
  return await updateDoc(document, data).then((result) => result).catch(err => err);
}

export async function uploadImage(cpf, file) {
  const imagesRef = ref(storage, cpf);
  await uploadBytes(imagesRef, file).then((snap) => {
    console.log('File Uploaded');
  })
}

export async function getUrlImg(cpf) {
  const imagesRef = ref(storage, cpf);
  return await getDownloadURL(imagesRef).then(url => url)
}
// const bd_pets = collection(firestore, "bd-petly");

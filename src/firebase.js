import { initializeApp } from 'firebase/app'
import { getFirestore, collection } from 'firebase/firestore'
// ... other firebase imports

const firebaseConfig = {
  apiKey: "AIzaSyAtKheqy-v9AFJofPZj4d648f6tY_4K1GA",
  authDomain: "todolistvue-43577.firebaseapp.com",
  projectId: "todolistvue-43577",
  storageBucket: "todolistvue-43577.appspot.com",
  messagingSenderId: "819029424119",
  appId: "1:819029424119:web:9aca08bf77254a2c4660f2"
};
export const firebaseApp = initializeApp(firebaseConfig)

// used for the firestore refs
const db = getFirestore(firebaseApp)

// here we can export reusable database references
export const todosRef = collection(db, 'ToDo')

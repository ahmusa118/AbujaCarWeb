import { initializeApp } from "firebase/app";
import  { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig2 = {
  apiKey: "AIzaSyAiTh_vggW6CXx-fssstEdM4EibHEKvWhY",
  authDomain: "abujacar-912c9.firebaseapp.com",
  projectId: "abujacar-912c9",
  storageBucket: "abujacar-912c9.appspot.com",
  messagingSenderId: "859316034835",
  appId: "1:859316034835:web:08a9c34117943cd28fcee6",
  measurementId: "G-3KCNH1S17D"
};

// Initialize Firebase
const app2 = initializeApp(firebaseConfig2);
export const auth2 = getAuth(app2)
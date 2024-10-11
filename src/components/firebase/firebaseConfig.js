
import { initializeApp } from "firebase/app";
import  { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyB_1rkPaB2ydYP3dU___ZoJOyMuDwCjxco",
  authDomain: "abujacar-2b452.firebaseapp.com",
  projectId: "abujacar-2b452",
  storageBucket: "abujacar-2b452.appspot.com",
  messagingSenderId: "570043962791",
  appId: "1:570043962791:web:f9990fe2ec69612e831282",
  measurementId: "G-10SHGM71T2"
};

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
const app = initializeApp(firebaseConfig,"app");
export const auth = getAuth(app)

const app2 = initializeApp(firebaseConfig2,"app2");
export const auth2 = getAuth(app2)




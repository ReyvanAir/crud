import { getAnalytics } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
// import { initializeApp } from "firebase-admin/app";

// import serviceAccount from "../../fir-3-11889-f3176ddef5b8.json";



// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries



// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAPFzipvbeRaXIKg9cYlXJKBbQZUBAY02o",
  authDomain: "fir-3-11889.firebaseapp.com",
  databaseURL:
    "https://fir-3-11889-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "fir-3-11889",
  storageBucket: "fir-3-11889.appspot.com",
  messagingSenderId: "342183922360",
  appId: "1:342183922360:web:4f0f1b45f0657c1449424d",
  measurementId: "G-VQ17G23VKF",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);



export const auth = getAuth(app);
export const database = getDatabase(app);



// admin
// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL:
//     "https://fir-3-11889-default-rtdb.asia-southeast1.firebasedatabase.app/",
// });

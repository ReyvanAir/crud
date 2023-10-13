import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
// import { initializeApp } from "firebase-admin/app";

// import serviceAccount from "../../fir-3-11889-f3176ddef5b8.json";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDCGNv129Mf0pnU4YsB1iXBgyNd6fAyHEk",
  authDomain: "simulationdata-c1e09.firebaseapp.com",
  databaseURL: "https://simulationdata-c1e09-default-rtdb.firebaseio.com",
  projectId: "simulationdata-c1e09",
  storageBucket: "simulationdata-c1e09.appspot.com",
  messagingSenderId: "827153401587",
  appId: "1:827153401587:web:2d42936cda7668bf3c5986",
  measurementId: "G-K6VYBP4H1P",
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

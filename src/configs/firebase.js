import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";
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
//const functions = require("firebase-functions");
//const admin = require("firebase-admin");

export const auth = getAuth(app);
export const database = getDatabase(app);

// admin
//admin.initializeApp();

// exports.addAdminRole = functions.https.onCall((data, context) => {
//   // get user and add costum claim (admin)
//   return admin
//     .auth()
//     .getUserByEmail(data.email)
//     .then((user) => {
//       return admin.auth().setCustomUserClaims(user.uid, {
//         admin: true,
//       });
//     })
//     .then(() => {
//       return {
//         message: "Success! ${data.email} has been made an admin",
//       };
//     })
//     .catch((err) => {
//       return err;
//     });
// });

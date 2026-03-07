import { initializeApp } from "firebase/app";

// Optionally import the services that you want to use
// import {...} from 'firebase/auth';
// import {...} from 'firebase/database';
// import {...} from 'firebase/firestore';
// import {...} from 'firebase/functions';
// import {...} from 'firebase/storage';

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBJwBxjP2QgHmxEZrH8uWBNhfpvw9uGlzk",
  authDomain: "expo-c7a7e.firebaseapp.com",
  databaseURL: "https://expo-c7a7e.firebaseio.com",
  projectId: "expo-c7a7e",
  storageBucket: "expo-c7a7e.appspot.com",
  messagingSenderId: "425517892042",
  appId: "1:425517892042:ios:2b40343d180c2505e78f33",
  //   measurementId: "G-measurement-id",
};

const app = initializeApp(firebaseConfig);
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase

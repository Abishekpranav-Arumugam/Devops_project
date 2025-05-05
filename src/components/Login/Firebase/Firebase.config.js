// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBPBvstUuYp-zBXoz27-cd_Lr4MIugnAPQ",
  authDomain: "samplereact-32360.firebaseapp.com",
  projectId: "samplereact-32360",
  storageBucket: "samplereact-32360.appspot.com",
  messagingSenderId: "544585504111",
  appId: "1:544585504111:web:342dce16b6694b6b0cc49a",
  measurementId: "G-5LL479DMLR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export default firebaseConfig;
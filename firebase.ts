import { getApp,getApps,initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getFunctions } from "firebase/functions";


const firebaseConfig = {
    apiKey: "AIzaSyA4RqS406qQS_x9VkHehm56rWkyKmZskmg",
    authDomain: "saas-translator-ca1f0.firebaseapp.com",
    projectId: "saas-translator-ca1f0",
    storageBucket: "saas-translator-ca1f0.appspot.com",
    messagingSenderId: "1066466041117",
    appId: "1:1066466041117:web:9f17602cd50d6a47b315f4"
  };

  const app = getApps().length ? getApp() : initializeApp(firebaseConfig)
  const auth = getAuth(app)
  const db = getFirestore(app)
  const functions  = getFunctions(app)

  export {db,auth,functions}
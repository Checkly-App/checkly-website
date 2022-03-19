import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database'
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
    apiKey: "AIzaSyBuw-T0G2smroeMGAWU_KBcnM-ScQm5Los",
    authDomain: process.env.REACT_APP_authDomain,
    databaseURL: "https://checkly-292d2-default-rtdb.firebaseio.com",
    projectId: process.env.REACT_APP_projectId,
    storageBucket: "gs://checkly-292d2.appspot.com",
    messagingSenderId: process.env.REACT_APP_messagingSenderId,
    appId: process.env.REACT_APP_appId,
    measurementId: process.env.REACT_APP_measurementId
}

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getDatabase(app);
export const storage = getStorage(app);

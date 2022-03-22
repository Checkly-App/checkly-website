import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import { getFunctions } from 'firebase/functions';

const firebaseConfig = {
    apiKey: "AIzaSyBuw-T0G2smroeMGAWU_KBcnM-ScQm5Los",
    authDomain: "checkly-292d2.firebaseapp.com",
    databaseURL: "https://checkly-292d2-default-rtdb.firebaseio.com",
    projectId: "checkly-292d2",
    storageBucket: "checkly-292d2.appspot.com",
    messagingSenderId: "353673577648",
    appId: "1=353673577648=web=b95a407566358730d22775",
    measurementId: "G-B6G6HBCDVC"
}

export const app = initializeApp(firebaseConfig);
const uauthenticatedApp = initializeApp(firebaseConfig, "Secondary");
export const auth = getAuth(app);
export const authSignup = getAuth(uauthenticatedApp);
export const database = getDatabase(app);
export const functions = getFunctions(app);


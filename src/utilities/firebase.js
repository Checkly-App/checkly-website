import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database'

import {getAuth} from 'firebase/auth';

// const firebaseConfig = {
//     apiKey: process.env.REACT_APP_apiKey,
//     authDomain: process.env.REACT_APP_authDomain,
//     databaseURL: "https://checkly-292d2-default-rtdb.firebaseio.com",
//     projectId: process.env.REACT_APP_projectId,
//     storageBucket: process.env.REACT_APP_storageBucket,
//     messagingSenderId: process.env.REACT_APP_messagingSenderId,
//     appId: process.env.REACT_APP_appId,
//     measurementId: process.env.REACT_APP_measurementId
// }
const firebaseConfig = {
    apiKey: "AIzaSyBuw-T0G2smroeMGAWU_KBcnM-ScQm5Los",
    authDomain: "checkly-292d2.firebaseapp.com",
    databaseURL: "https://checkly-292d2-default-rtdb.firebaseio.com",
    projectId: "checkly-292d2",
    storageBucket: "checkly-292d2.appspot.com",
    messagingSenderId: "353673577648",
    appId: "1:353673577648:web:b95a407566358730d22775",
    measurementId: "G-B6G6HBCDVC"
  };

const app = initializeApp(firebaseConfig);

export const database = getDatabase(app);
//export const auth = getAuth(app)
export const auth = getAuth(app);


// const { initializeApp } = require('firebase-admin/app');
//    var admin = require("firebase-admin");

 var serviceAccount = require("./AccountKey.json");

// initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: "https://checkly-292d2-default-rtdb.firebaseio.com"
// });

const admin = require('firebase-admin');
// const serviceAccount = require('path/to/serviceAccountKey.json');

// User IDs to be deleted
const UIDs = [];

// initialize the app
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL:"https://checkly-292d2-default-rtdb.firebaseio.com"

});


exports.deleteUser1 = function deleteUser(uid) {
  admin.auth().deleteUser(uid)
    .catch(function(error) {
      console.log("Error deleting user", uid, error);
    });
}


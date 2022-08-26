/* eslint-disable quotes */
/* eslint-disable indent */
const functions = require("firebase-functions");
const admin = require('firebase-admin');
admin.initializeApp();

exports.checkAssertion = functions
.region("europe-west1")
.https
.onRequest((request, response)=>{
    const checkResult = true;
    response.send(checkResult.toString());
});


exports.sayHello = functions
.region("europe-west1")
.https.onCall((data, context)=>{
    return `hello ${data.name}`;
});

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

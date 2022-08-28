/* eslint-disable require-jsdoc */
/* eslint-disable quotes */
/* eslint-disable indent */

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

const functions = require("firebase-functions");
const admin = require('firebase-admin');
admin.initializeApp();

exports.checkAssertion = functions
.region("europe-west1")
.https.onCall(async({assertion}, context)=>{
    return masterCheckFunction(assertion);
});

async function getChar(char) {

    const name = char.name;
    const collectionRef = admin.firestore().collection('coordinates');
    const documentRefWithName = await collectionRef.doc(`${name}`).get();

    // returns a promise that then returns the promise.data()
    const data = await documentRefWithName.data();

    // Or below is an option with returning and resolving promise through .then(callback)
    // return documentRefWithName.then((docSnapshot)=>{
    //     const data = docSnapshot.data();
    //     console.log(data);
    //     console.log('Im in getChar async')
    //     return data;
    // });
    return data;
}

async function masterCheckFunction (assertion) {
    const targetChar = await getChar(assertion);
    console.log(targetChar);

    if ((assertion.x>=targetChar.x1 && assertion.x<=targetChar.x2)&&
     (assertion.y>=targetChar.y1 && assertion.y<=targetChar.y2)) {
        console.log(true);
        return true;
    }
    console.log(false);
    return (false);
}


//compile this file into non-es6 with `babel index-code.js --out-file index.js`
const functions = require('firebase-functions');
const qtum = require('qtumjs-wallet')

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });


// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
admin.initializeApp();

async function initWallet(){
  const network = qtum.networks.testnet

  const privateKey = "cTvBUNUu4tb1TAK1toHVToN2xmkcd5XLbjU3YRkru6YGA43PHied"

  const wallet = await network.fromWIF(privateKey)
  return wallet;
}

async function getWalletTransactions(wallet){
  const info = await wallet.getInfo()
  console.log("got wallet transactions"+info)
}

// Take the text parameter passed to this HTTP endpoint and insert it into the
// Realtime Database under the path /messages/:pushId/original
exports.addMessage = functions.https.onRequest(async (req, res) => {
  console.log("about to get wallet")  
  var wallet = await initWallet();
    console.log("got wallet")
    await getWalletTransactions(wallet);

    // Grab the text parameter.
    const original = req.query.text;
    // Push the new message into the Realtime Database using the Firebase Admin SDK.
    const snapshot = await admin.database().ref('/messages').push({original: original});
    // Redirect with 303 SEE OTHER to the URL of the pushed object in the Firebase console.
    res.redirect(303, snapshot.ref.toString());
  });
  
"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

//compile this file into non-es6 with `babel index-code.js --out-file index.js`
const functions = require('firebase-functions');

const qtum = require('qtumjs-wallet'); // // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
// The Firebase Admin SDK to access the Firebase Realtime Database.


const admin = require('firebase-admin');

admin.initializeApp();

function initWallet() {
  return _initWallet.apply(this, arguments);
}

function _initWallet() {
  _initWallet = _asyncToGenerator(function* () {
    const network = qtum.networks.testnet;
    const privateKey = "cTvBUNUu4tb1TAK1toHVToN2xmkcd5XLbjU3YRkru6YGA43PHied";
    const wallet = yield network.fromWIF(privateKey);
    return wallet;
  });
  return _initWallet.apply(this, arguments);
}

function getWalletTransactions(_x) {
  return _getWalletTransactions.apply(this, arguments);
} // Take the text parameter passed to this HTTP endpoint and insert it into the
// Realtime Database under the path /messages/:pushId/original


function _getWalletTransactions() {
  _getWalletTransactions = _asyncToGenerator(function* (wallet) {
    const info = yield wallet.getInfo();
    console.log("got wallet transactions" + info);
  });
  return _getWalletTransactions.apply(this, arguments);
}

exports.addMessage = functions.https.onRequest(
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(function* (req, res) {
    console.log("about to get wallet");
    var wallet = yield initWallet();
    console.log("got wallet");
    yield getWalletTransactions(wallet); // Grab the text parameter.

    const original = req.query.text; // Push the new message into the Realtime Database using the Firebase Admin SDK.

    const snapshot = yield admin.database().ref('/messages').push({
      original: original
    }); // Redirect with 303 SEE OTHER to the URL of the pushed object in the Firebase console.

    res.redirect(303, snapshot.ref.toString());
  });

  return function (_x2, _x3) {
    return _ref.apply(this, arguments);
  };
}());

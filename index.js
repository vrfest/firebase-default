const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.addAdminRole = functions.https.onCall((data,context) =>{
    // check request is made by an admin
    //if ever all admins are erased and problems occure 
    //that need admin comment out row 11-13 and deploy 
    //go elemnts->admin action-> look at display and click the check box
    // make user admin
    if(context.auth.token.admin != true){
        return{error: 'only admins can add other admins, sucker'}
    }
    // get user and add custom claim(admin)
    return admin.auth().getUserByEmail(data.email).then(user =>{
        return admin.auth().setCustomUserClaims(user.uid, {
            admin : true
        });
    }).then(() => {
        return{
            message: `Success! ${data.email} ahs been made an admin`
        }
    }).catch(err =>{
        return err;
    });
})

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

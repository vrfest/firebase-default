//add admin cloud function
const adminForm = document.querySelector('.admin-actions');
adminForm.addEventListener('submit', (e) =>{
    e.preventDefault();
    const adminEmail = document.querySelector('#admin-email').value;
    const addAdminRole = functions.httpsCallable('addAdminRole');
    addAdminRole({email: adminEmail }).then(result =>{
        console.log(result);
    });
});

//listen for auth status
auth.onAuthStateChanged(user =>{
    //console.log(user);
    if(user){
        user.getIdTokenResult().then(idTokenResult => {
            user.admin = idTokenResult.claims.admin;
            setupUI(user);
        })
        //get data
        db.collection('guides').onSnapshot(snapshot =>{
        setupGuides(snapshot.docs);
        setupUI(user);
        }, err =>{
            console.log(err.message);
        });
    }
    else{
        setupUI();
        setupGuides([]);
    }
});

//create new guides
const createForm = document.querySelector('#create-form');
createForm.addEventListener('submit',(e) =>{
    e.preventDefault();
    db.collection('guides').add({
        title: createForm['title'].value,
        content: createForm['content'].value
    }).then(() => {
        //close model and reset form
        const modal = document.querySelector('#modal-create');
         M.Modal.getInstance(modal).close();
         createForm.reset();
    }).catch(err => {
        console.log(err.message);
    });
});

//signup
const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit',(e) =>{
     e.preventDefault();

     //get user info
     const email = signupForm['signup-email'].value;
     const password = signupForm['signup-password'].value;

     //signup user 
     auth.createUserWithEmailAndPassword(email, password).then(cred =>{
         return db.collection('users').doc(cred.user.uid).set({
             bio: signupForm['signup-bio'].value
         });
     }).then(() => {
        const modal = document.querySelector('#modal-signup');
         M.Modal.getInstance(modal).close();
         signupForm.reset();
         signupForm.querySelector('.error').innerHTML = '';
     }).catch(err =>{
         signupForm.querySelector('.error').innerHTML = err.message;
     });     
});

//logout
const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {
    e.preventDefault();
    auth.signOut().then(() => {
    });
});


//login form
const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    //get user info
    const email = loginForm['login-email'].value;
    const password = loginForm['login-password'].value;

    auth.signInWithEmailAndPassword(email, password).then(cred =>{
        //close the login modle and reset the 
        const modal = document.querySelector('#modal-login');
        M.Modal.getInstance(modal).close();
       loginForm.reset();
       loginForm.querySelector('.error').innerHTML = '';
    }).catch(err =>{
        loginForm.querySelector('.error').innerHTML = err.message;
    });  
})

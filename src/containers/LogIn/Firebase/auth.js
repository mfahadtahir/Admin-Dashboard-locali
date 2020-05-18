import firebase from "./firebase"
import { db } from "./firestore";
export const auth = firebase.auth();

// user Sign Up 
export const SignUpCall = () => {
    // e.preventDefault();

    var name = document.getElementById('reg-username').value;
    var email = document.getElementById("reg-email").value;
    var pass = document.getElementById("reg-pass").value;

    if (( name.length && email.length && pass.length) !== 0) {

            auth.createUserWithEmailAndPassword(email, pass)
            .then((res) => {
                auth.currentUser.updateProfile({displayName: name});
                let uid = res.user.uid;
                db.collection('admin-users').doc(res.user.uid).set({name,email,uid})
                .then(() => console.log('User Added'))
            })

    } else {
            console.log('Every Field is Mandatory!')
    }
}

// User login 
export const SignInCall = () => {
    // e.preventDefault();
    const email = document.getElementById("login-email").value;
    const pass = document.getElementById("login-pass").value;

    auth.signInWithEmailAndPassword(email, pass)
        .then( res => {
            if (res) {
                window.location.replace("/dashboard");
                console.log(auth.currentUser);
            }
        }).catch(err => {
            console.log(err);
        });
}
// User Pass Reset
export const PassReset = () => {
var emailAddress = document.getElementById("reset-email").value;

auth.sendPasswordResetEmail(emailAddress).then(function() {
  window.location.replace("/");
  SignOut();
}).catch(function(error) {
  console.log(error);
});
}
export const NewPassword = (oobCode) => {
    let newPassword = document.getElementById("newPass").value;
    let confirmPassword = document.getElementById("confirmPass").value;
    if(newPassword === confirmPassword){

        auth.confirmPasswordReset(oobCode, newPassword)
            .then(function() {
              window.location.replace("/home");
            })
            .catch(function(error) {
                console.log(error);
            })
    }
    else{
        alert("Confirm password and new password are different!");
    }
}


// User Sign Out
export const SignOut = () => {
    auth.signOut().then(res => {
    }).catch(err => {
        console.log(err)
    })
}

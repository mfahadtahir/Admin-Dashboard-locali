import firebase from "./firebase"
import React, { PureComponent } from 'react';
import { Alert, Button } from 'reactstrap';
import { db } from "./firestore";
export const auth = firebase.auth();

function hasNumber(myString) {
    return /\d/.test(myString);
  }

// user Sign Up 
export const SignUpCall = (e, addError) => {
    e.preventDefault();

    var name = document.getElementById('reg-username').value;
    var email = document.getElementById("reg-email").value;
    var pass = document.getElementById("reg-pass").value;
    if(pass.length <= 8){
      let err = {message: "Password length should be minimum 8!"}
        addError(err);
        setTimeout(() => {
          addError(null);
        }, 3050);
        return;
    }
    if(!hasNumber(pass)){
      let err = {message: "Enter a valid password, Password must contain minimum 8 characters with atleast 1 number in it"}
      addError(err);
      setTimeout(() => {
        addError(null);
      }, 3050);
      return;
    }
    if (( name.length && email.length) !== 0  ) {

      auth.createUserWithEmailAndPassword(email, pass)
      .then((res) => {
        auth.currentUser.updateProfile({displayName: name});
        let uid = res.user.uid;
        db.collection('admin-users').doc(res.user.uid).set({name,email,uid})
        .then(() => {
          console.log('User Added')
          window.location.replace('/dashboard');
        })
      })
      .catch((err) => {
        let error = {message: err.message}
        addError(error);
        setTimeout(() => {
          addError(null);
        }, 3050);
        console.log('Every Field is Mandatory!')
      })

    } 
    else {
      let err = {message: "Every Field is Mandatory!"}
      addError(err);
      setTimeout(() => {
        addError(null);
      }, 3050);
      console.log('Every Field is Mandatory!')
    }
}

// User login 
export const SignInCall = (e) => {
    e.preventDefault();
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
    auth.signOut()
    .then(res => {
      window.location.replace("/");
    }).catch(err => {
        console.log(err);
    })
}

// ==================================
// TRAP MOVIES
// AUTHENTICATION SYSTEM
// ==================================


import { auth, db } from "./firebase-config.js";


import { 
createUserWithEmailAndPassword,
signInWithEmailAndPassword,
updateProfile,
signOut,
sendPasswordResetEmail
} 
from 
"https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";



import {
doc,
setDoc
}
from
"https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";





// ===============================
// SIGN UP
// ===============================


const signupBtn = document.querySelector("#signupBtn");


if(signupBtn){


signupBtn.addEventListener("click", async()=>{


const name =
document.querySelector("#name").value;


const email =
document.querySelector("#email").value;


const password =
document.querySelector("#password").value;


const confirmPassword =
document.querySelector("#confirmPassword").value;



const message =
document.querySelector("#message");




if(password !== confirmPassword){

message.innerHTML =
"❌ Passwords do not match";

return;

}



try{


const userCredential =
await createUserWithEmailAndPassword(
auth,
email,
password
);



const user =
userCredential.user;



// Add username to Firebase profile

await updateProfile(user,{
displayName:name
});





// Save user data in Firestore

await setDoc(
doc(db,"users",user.uid),
{

name:name,

email:email,

createdAt:new Date()

}

);





message.innerHTML =
"✅ Account created successfully";



setTimeout(()=>{

window.location.href="account.html";

},1500);



}

catch(error){


message.innerHTML =
"❌ " + error.message;


}



});


}









// ===============================
// LOGIN
// ===============================


const loginBtn =
document.querySelector("#loginBtn");



if(loginBtn){


loginBtn.addEventListener("click", async()=>{


const email =
document.querySelector("#loginEmail").value;


const password =
document.querySelector("#loginPassword").value;


const message =
document.querySelector("#message");



try{


await signInWithEmailAndPassword(
auth,
email,
password
);



message.innerHTML =
"✅ Login successful";



setTimeout(()=>{

window.location.href="account.html";

},1000);



}

catch(error){


message.innerHTML =
"❌ Invalid email or password";


}



});


}








// ===============================
// LOGOUT
// ===============================


const logoutBtn =
document.querySelector("#logoutBtn");



if(logoutBtn){


logoutBtn.addEventListener("click",()=>{


signOut(auth)
.then(()=>{


window.location.href="login.html";


});


});


}







// ===============================
// PASSWORD RESET
// ===============================


window.resetPassword =
async function(email){


try{


await sendPasswordResetEmail(
auth,
email
);


alert(
"Password reset email sent"
);


}

catch(error){

alert(error.message);

}


}
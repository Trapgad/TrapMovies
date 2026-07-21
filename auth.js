// ==================================
// TRAP MOVIES
// AUTHENTICATION SYSTEM
// CLEAN VERSION
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
// HELPER MESSAGE
// ===============================


function showMessage(text, type=""){

const message =
document.querySelector("#message");


if(message){

message.innerHTML = text;

message.className = type;

}

}






// ===============================
// SIGN UP
// ===============================


const signupBtn =
document.querySelector("#signupBtn");



signupBtn?.addEventListener(
"click",
async()=>{


const name =
document.querySelector("#name")?.value.trim();


const email =
document.querySelector("#email")?.value.trim();


const password =
document.querySelector("#password")?.value;


const confirmPassword =
document.querySelector("#confirmPassword")?.value;




if(!name || !email || !password){

showMessage(
"❌ Please fill all fields"
);

return;

}




if(password !== confirmPassword){


showMessage(
"❌ Passwords do not match"
);


return;


}




try{


signupBtn.disabled = true;


const userCredential =

await createUserWithEmailAndPassword(

auth,

email,

password

);



const user =
userCredential.user;




await updateProfile(
user,
{

displayName:name

}

);





await setDoc(

doc(
db,
"users",
user.uid
),

{

name:name,

email:email,

createdAt:
new Date()

}

);






showMessage(
"✅ Account created successfully"
);




setTimeout(()=>{


location.href="account.html";


},1500);



}


catch(error){


console.error(error);



showMessage(
"❌ Unable to create account"
);



}


finally{


signupBtn.disabled=false;


}



});









// ===============================
// LOGIN
// ===============================


const loginBtn =
document.querySelector("#loginBtn");



loginBtn?.addEventListener(
"click",
async()=>{


const email =
document.querySelector("#loginEmail")
?.value.trim();



const password =
document.querySelector("#loginPassword")
?.value;




if(!email || !password){

showMessage(
"❌ Enter email and password"
);

return;

}





try{


loginBtn.disabled=true;



await signInWithEmailAndPassword(

auth,

email,

password

);





showMessage(
"✅ Login successful"
);





setTimeout(()=>{


location.href="account.html";


},1000);



}



catch(error){


console.error(error);



showMessage(
"❌ Invalid email or password"
);



}



finally{


loginBtn.disabled=false;


}



});









// ===============================
// LOGOUT
// ===============================


const logoutBtn =
document.querySelector("#logoutBtn");



logoutBtn?.addEventListener(
"click",
async()=>{


try{


await signOut(auth);



location.href="login.html";



}

catch(error){


console.error(error);


}



});









// ===============================
// PASSWORD RESET
// ===============================


window.resetPassword =

async function(email){



if(!email){

alert(
"Enter your email address"
);

return;

}




try{


await sendPasswordResetEmail(

auth,

email.trim()

);



alert(
"✅ Password reset email sent"
);



}



catch(error){


console.error(error);



alert(
"❌ Unable to send reset email"
);



}



};
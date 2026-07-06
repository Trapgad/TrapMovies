import {
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "./firebase.js";

// ===============================
// SIGN UP
// ===============================
window.signup = async function () {

  const name = document.getElementById("name")?.value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  if (!name || !email || !password) {
    alert("Please fill in all fields.");
    return;
  }

  try {

    await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    alert("Account created successfully!");

    window.location.href = "signin.html";

  } catch (error) {

    alert(error.message);

  }

};

// ===============================
// SIGN IN
// ===============================
window.login = async function () {

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  if (!email || !password) {
    alert("Please enter your email and password.");
    return;
  }

  try {

    await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    alert("Welcome to TRAP MOVIES!");

    window.location.href = "index.html";

  } catch (error) {

    alert(error.message);

  }

};
import {
    auth,
    onAuthStateChanged,
    signOut
} from "./firebase.js";

// ===============================
// CHECK USER
// ===============================
onAuthStateChanged(auth, (user) => {

    if (user) {

        document.getElementById("userName").textContent =
            user.email.split("@")[0];

        document.getElementById("userEmail").textContent =
            user.email;

    } else {

        window.location.href = "signin.html";

    }

});

// ===============================
// LOGOUT
// ===============================
window.logout = async function () {

    try {

        await signOut(auth);

        window.location.href = "signin.html";

    } catch (error) {

        alert(error.message);

    }

};
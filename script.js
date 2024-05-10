
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-analytics.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA6umJj7uuPEuDXWGRn37bWNo6kbDS4ipw",
    authDomain: "plp-todolist.firebaseapp.com",
    projectId: "plp-todolist",
    storageBucket: "plp-todolist.appspot.com",
    messagingSenderId: "588219032963",
    appId: "1:588219032963:web:d9b6e181cc8279d785c2b6",
    measurementId: "G-C57Q46EL59"
  };
   
  const googleAuth = document.getElementById("googleAuth");
  const create_acnt = document.getElementById("create_acnt");
  const back = document.getElementById("back");
  const form = document.querySelector("form");
  const emailInput = document.getElementById("email");
  const fullName = document.getElementById("fullName");
  const password = document.getElementById("password");
  const errorMsg = document.getElementById("error");
  
  const load_bx = document.querySelector(".load_bx");
  const load_text = document.querySelector(".load_text");
  const loading = document.querySelector(".loading");
  const check = document.getElementById("check");
  
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();
const provider = new GoogleAuthProvider();

googleAuth.addEventListener("click", authorizeGoogleAuth);
create_acnt.addEventListener("click", formSignIn);
back.addEventListener("click", () => {
    document.querySelector(".wrapper").classList.remove("hide");
    document.querySelector(".emailAuth").classList.remove("show");
});

form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (emailInput.value === "" || fullName.value === "" || password.value === "") {
        errorMsg.classList.add("invalid");
        errorMsg.textContent = 'Please fill the required fields';
        return;
    }

    validate();
});

function validate() {
    let regexPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if (!emailInput.value.match(regexPattern)) {
        emailInput.classList.add("invalid");
        errorMsg.classList.add("invalid");
        errorMsg.textContent = "Enter a valid email address";
        return;
    }

    if (password.value.length < 6) {
        password.classList.add("invalid");
        errorMsg.classList.add("invalid");
        errorMsg.textContent = "Password must contain at least 6 Characters";
        return;
    }

    authenticateLogin();
}

async function authorizeGoogleAuth() {
    try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        console.log(user);

        showLoadingText();
        setTimeout(() => {
            console.log("Form Submitted");
            loading.style.display = 'none';
            load_text.textContent = 'Form Submitted';
            check.style.display = 'block';
            setTimeout(() => {
                window.location.href = '/ToDoApp/index.html';
            }, 3000);
        }, 10000);
    } catch (error) {
        console.error(error.code, error.message);
    }
}

function formSignIn() {
    document.querySelector(".wrapper").classList.add("hide");
    document.querySelector(".emailAuth").classList.add("show");
}

function showLoadingText() {
    load_bx.classList.add("active");
    setTimeout(() => {
        load_text.textContent = 'Validating Form';
    }, 1000);
    setTimeout(() => {
        load_text.textContent = 'Checking for errors';
    }, 4000);
    setTimeout(() => {
        load_text.textContent = 'Assigning validation';
    }, 6000);
    setTimeout(() => {
        load_text.textContent = 'Submitting Form';
    }, 8000);
}

function authenticateLogin() {
    let email = emailInput.value;
    let fullNameVal = fullName.value;
    let passwords = password.value;

    createUserWithEmailAndPassword(auth, email, passwords, fullNameVal)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log(user);
        })
        .catch((error) => {
            console.error(error.code, error.message);
        });

    signInWithEmailAndPassword(auth, email, passwords, fullNameVal)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log(user);
        })
        .catch((error) => {
            console.error(error.code, error.message);
        });
}

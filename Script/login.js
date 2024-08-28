import { auth } from "./config.js";
import { signInWithEmailAndPassword   } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";

const form = document.getElementById("form")
const email = document.getElementById("email")
const password = document.getElementById("password")
form.addEventListener("submit",(event)=>{
    event.preventDefault()
    console.log(email.value);
    console.log(password.value);
    signInWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
      
      const user = userCredential.user;
      Swal.fire("Sign-in Successfully!");
      window.location.href="/index.html"
      
    })
    .catch((error) => {
      const errorMessage = error.message;
      console.log(errorMessage);
      
    });
   
})
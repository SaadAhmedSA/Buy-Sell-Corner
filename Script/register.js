

import { auth ,storage , db} from "./config.js";
import { createUserWithEmailAndPassword  } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import {  ref,uploadBytes,getDownloadURL } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-storage.js";
import {collection, addDoc} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js"

const form = document.getElementById("form")
const email = document.getElementById("email")
const username = document.getElementById("username")
const Img = document.querySelector("#img")
const password = document.getElementById("password")

form.addEventListener("submit", async (event)=>{
    event.preventDefault()

    const getimage = await showurl(Img.files[0])

    createUserWithEmailAndPassword(auth, email.value, password.value)
  .then(async (userCredential) => {
  
    const user = userCredential.user.uid;
    console.log(user);
    try {
      const docRef = await addDoc(collection(db, "users"), {
        firstname: username.value,
        profileimg:getimage,
        email:email.value,
        password:password.value,
        uid:user,
    
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    // window.location.href="login.html"
    
  })
  .catch((error) => {
    const errorMessage = error.message;
    console.log(errorMessage);

  });

  

async function showurl(file) {
    const storageref = ref(storage,email.value)
    try{
        const uploadImg = await uploadBytes(storageref,file)
        const url = await getDownloadURL (storageref)
        console.log(url);
        return url
        
    }catch{ (error)
        console.log(error);
        
    }
}
   
})
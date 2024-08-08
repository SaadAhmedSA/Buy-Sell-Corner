
import {signOut } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";

import { auth,checkuser  } from "./config.js";
const logout = document.querySelector("#logout")

const user = await checkuser()
console.log(user);

logout.addEventListener("click",()=>{
    signOut(auth).then(() => {
        console.log(" Sign-out successful")

        
      }).catch((error) => {
        console.log(error);
        
      });
})


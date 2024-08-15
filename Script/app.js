
import {signOut } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import {   collection , getDocs } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

import { auth,checkuser,db  } from "./config.js";
const logout = document.querySelector("#logout")
const card = document.querySelector("#card")

let data=[]
let userdata = null
async function checking() {
  const user = await checkuser()
  userdata = user
  console.log(userdata);
}
checking()  

const querySnapshot = await getDocs(collection(db, "postad"));
querySnapshot.forEach((doc) => {
  console.log(doc.id, " => ", doc.data());
  data.push(doc.data())
});

console.log(data);
data.map((item,index)=>{
  card.innerHTML+=`
  <div class="card card-compact m-4 bg-base-100 w-96 shadow-xl">
    <figure>
      <img class="p-4"
        src="${item.image}" />
    </figure>
    <div class="card-body">
      <h2 class="card-title">${item.title}</h2>
      <p>${item.desc}</p>
      <p>Rs${item.price}</p>
      <p>${item.name}</p>
      <p>${item.number}</p>
      <div class="card-actions justify-center">
        <button class="btn btn-primary">Buy Now</button>
      </div>
    </div>
  </div>`
})






logout.addEventListener("click",()=>{
    signOut(auth).then(() => {
        console.log(" Sign-out successful")

        
      }).catch((error) => {
        console.log(error);
        
      });
})


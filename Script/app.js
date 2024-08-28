
import {signOut } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import {   collection , getDocs } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

import { auth,checkuser,db  } from "./config.js";
const logout = document.querySelector("#logout")
const card = document.querySelector("#card")
let input = document.getElementById("search_input")

let data=[]
// console.log(checkuser());
let userdata = null
async function checking() {
  const user = await checkuser()
  userdata = user
console.log(userdata);

  userdata? console.log("hain")
 : alert("login first to See Product in Detail")
}
// console.log(userdata);

checking()  


// console.log(data);

function render(filter = data){
  card.innerHTML =""
filter.length>0?filter.forEach((item,index)=>{
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
      
      <div class="card-actions justify-center">
        <button class="btn btn-primary" id="buy">Buy Now</button>
      </div>
    </div>
  </div>`
}):card.innerHTML=`<h1>Loading...</h1>`}
const querySnapshot = await getDocs(collection(db, "postad"));
querySnapshot.forEach((doc) => {
  // console.log(doc.id, " => ", doc.data());
  data.push(doc.data())
});
render()


let adToCard = document.querySelectorAll('#buy');

adToCard.forEach((btn, index) => {
    btn.addEventListener('click', () => {
        localStorage.setItem('sendlocal', JSON.stringify(data[index]));
        window.location = 'singlead.html';
    });
});




input.addEventListener("input",(e)=>{
  const seacrh = e.target.value.toLowerCase()
  const filter = data.filter(product => product.title.toLowerCase().includes(seacrh))
  console.log(filter);
  
  render(filter)
})






logout.addEventListener("click",()=>{
    signOut(auth).then(() => {
      Swal.fire("logout Successfully!");

        
      }).catch((error) => {
        console.log(error);
        
      });
})


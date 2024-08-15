
import {signOut } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import {  ref,uploadBytes,getDownloadURL } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-storage.js";
import {collection, addDoc} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js"

import { auth,checkuser , storage , db } from "./config.js";
const logout = document.querySelector("#logout")
const form = document.getElementById("form")
const title = document.getElementById("title")
const desc = document.getElementById("description")
const price = document.getElementById("price")
const name = document.getElementById("name")
const number = document.getElementById("number")
const img = document.getElementById("file")
const btn = document.getElementById("btn")
// let userdata = null
async function checking() {
  const user = await checkuser()

  user?console.log("hn"):window.location="index.html";
}
checking()  

form.addEventListener("submit",async (event)=>{
    event.preventDefault()
    console.log(img.files[0]);
    btn.innerText="loading"
    const getimage = await showurl(img.files[0])
    try {
      const docRef = await addDoc(collection(db, "postad"), {
        title:title.value,
        desc:desc.value,
        price:price.value,
        name:name.value,
        number:number.value,
        image:getimage,
      });
      btn.innerText="POST NOW"
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
     title.value=""
   desc.value=""
   price.value=""
    name.value=""
  number.value=""

  })

  async function showurl(file) {
    const storageref = ref(storage,name.value)
    try{
        const uploadImg = await uploadBytes(storageref,file)
        const url = await getDownloadURL (storageref)
        console.log(url);
        return url
        
    }catch{ (error)
        console.log(error);
        
    }
}
   








logout.addEventListener("click",()=>{
    signOut(auth).then(() => {
        console.log(" Sign-out successful")

        
      }).catch((error) => {
        console.log(error);
        
      });
})


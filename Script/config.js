 // Import the functions you need from the SDKs you need
 import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
 import {getAuth ,onAuthStateChanged,signOut } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
 import {  getStorage } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-storage.js";
 import {  getFirestore ,collection , query,where,getDocs } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

const useravater = document.querySelector("#useravater")
const userimge = document.querySelector("#userimge")

 const firebaseConfig = {
  apiKey: "AIzaSyCJqPXjdgqVzwHvMl4CaIz0XbD8lTTkbFQ",
  authDomain: "project-1-1f9ff.firebaseapp.com",
  projectId: "project-1-1f9ff",
  storageBucket: "project-1-1f9ff.appspot.com",
  messagingSenderId: "349046093235",
  appId: "1:349046093235:web:9faee6583d3b5cbebe47c6"
};

 // Initialize Firebase
 const app = initializeApp(firebaseConfig);
 export const storage = getStorage(app)
export  const auth = getAuth(app)
export  const db = getFirestore(app)


export async function checkuser() {
  try {
    return new Promise((resolve,reject)=>{
onAuthStateChanged(auth, async (user)=>{
  if(user){
    try {
      const uid = user.uid
      console.log(uid);
      const q = query(collection(db,"users"),where("uid","==",uid))
      const querysnap = await getDocs(q)
      let userdata = null
      querysnap.forEach((doc) => {
        userdata = doc.data()
        userimge.src = userdata.profileimg
      });
      resolve(userdata)
    } catch (error) {
      console.log(error);
      reject(error)
    }
  }else{
    useravater.innerHTML=`<button class="btn btn-dark"><a href="./login.html">login</a></button>`
    resolve(null)
  }
})
    })
  } catch (error) {
    console.log(error);
  }
}
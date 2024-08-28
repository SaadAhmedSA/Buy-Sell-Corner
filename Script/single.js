import { checkuser } from "../Script/config.js";

let userdata = null
async function checking() {
  var user = await checkuser()
  if(!user){
window.location="index.html";
console.log(user);

  }

}
checking()





let main_card_box = document.querySelector('.main_card_box')
let main_product_head = document.querySelector('#main_product_head')

let getData = JSON.parse(localStorage.getItem('sendlocal'))
console.log(getData);

function renderScreen(){
    main_product_head.innerHTML = getData.title
   main_card_box.innerHTML = `
   <div class="d-flex justify-content-center gap-5 flex-wrap">
                <div class="main_card_image rounded-4">
                    <img id="product_image" src="${getData.image}" alt="">
                </div>
                <div class="mt-3">
                    <h3 id="product_price">Rs: ${getData.price}</h3>
                    <h3 class="mt-3" id="product_title">${getData.title}</h3>
                    <p class="mt-2" id="product_description"><spna><h6> Description</h6></spna>${getData.desc}</p>
                    <div class="user_section rounded-4 mt-3 d-flex align-items-center gap-2">
                        <div>
                            <img id="user_image" width="300px" src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" alt="">
                        </div>
                        <hr />
                        <div class="mt-3">
                            <h6 id="userName">${getData.name}</h6>
                            <p id="phone_number">${getData.number}</p>
                        </div>
                    </div>
                    <div>
                        <a href=""><button id="whatsapp_btn" class="btn btn-success mt-3">Whatsapp</button></a>
                    </div>
                </div>
            </div>
   `
}
renderScreen()








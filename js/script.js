let UserInfo=document.querySelector("#UserInfo")
let userData=document.querySelector("#user")
let links=document.querySelector("#links")
let cart=document.querySelector("#cart")
let logoutbutn=document.querySelector("#logoutbutn")
let shoppingCart=document.querySelector(".shopping-cart")

if(localStorage.getItem("Email")){
    links.remove()
    UserInfo.style.display ="flex"
    // UserInfo.style.display ="block"

     shoppingCart.style.display="block"
    userData.innerHTML="Hello, "+ localStorage.getItem("FirstName" )
    userData.style.margin="10px"
    
    cart.style.margin="10px"
    logoutbutn.style.display="block"
    shoppingCart.style.display="block"
    // logoutbutn.style.margin="15px"
}
else{
   UserInfo.style.display="none" 
   shoppingCart.style.display="none"
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
let logOut=document.querySelector("#logoutbutn")
logOut.addEventListener("click",()=>{
    localStorage.clear()
    shoppingCart.style.display="none"
    setTimeout(()=>{
        window.location = "index.html";
    },1500)
})



// ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 let cartDiv = document.querySelector(".carts-product");
// cartDiv.style.display="none"
// cart.addEventListener("click",(item)=>{
//     if(item.style.display=="block"){
//         item.style.display="none"
//     }
//     else{
//         item.style.display="block"
//     }
// })
// ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// ======================= البيانات =======================
let allproduct = document.querySelector("#productsContainer");
let inputsearch = document.querySelector(".searcinput");
let selectform = document.querySelector(".form-select");
let products=[
{
    
    title:"Selver bracelet",
    imageURl:"images/3dbdbdd371e9e18a2e0265ca774bd7fa.jpg",
    price:"$100.50",
    Category:"bracelet",
    quantity: 1
},
{
   
    title:"Golden Necklace",
    imageURl:"images/ad03cf33031f7081829799e5aa7c5cd0.jpg",
    price:"$100.20",
    Category:"Necklace",
    quantity: 1
},
{
    
    title:"Golden Watches",
    imageURl:"images/661c0924256c1505d591fdc9c2febbf7.jpg",
    price:"$100",
    Category:"watches",
    quantity: 1
},{
    
    title:" Selver Necklace ",
    imageURl:"images/c014c06c2f2436f349e77fe39de54449.jpg",
    price:"$2000",
    Category:"Necklace",
    quantity: 1
},{
    
    title:"Golden Set Ring ",
    imageURl:"images/de96b013980ad62993ff74dd78675874.jpg",
    price:"$1000.500",
    Category:"Ring"
    ,quantity: 1
},{
    
    title:"Selver Watches",
    imageURl:"images/ae8c0396606d45939b7ac0b22b50923e.jpg",
    price:"$200",
    Category:"Watches",
    quantity: 1
},
{
    
    title:"Golden Anklet",
    imageURl:"images/8cc523e91669ac88dc96a8843d696e6b.jpg",
    price:"$200",
    Category:"Anklet",
    quantity: 1
},{
    
    title:"Black Ring",
    imageURl:"images/4305a587be6f06473099f20d368dd02d.jpg",
    price:"$200",
    Category:"Ring",
    quantity: 1
},{
    
    title:"Golden Earrings",
    imageURl:"images/ef7ec5ed062c7f57c98112e1070eafa1.jpg",
    price:"$200",
    Category:"Earrings",
    quantity: 1
},
]



// /////////////////////////////////////////////////////////////////////////////////////

// ======================= دالة الرسم =======================
function drawItem(arr = products) {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    let addItem = JSON.parse(localStorage.getItem("productsInCart")) || [];


    // 👇 لو مفيش منتجات
    if(arr.length === 0){
        allproduct.innerHTML = `
            <div class="text-center w-100 mt-5">
                <h3 style="color:#dc3545;" > 🚫 No Products Found</h3>
            </div>
        `;
        return;
    }

  let y = arr.map((item) => {
     // تحقق إذا المنتج موجود في الكارت
    let isInCart = addItem.find(cartItem => cartItem.title === item.title);
    let isFavorite = favorites.find(fav => fav.title === item.title);
    return `
         <div class="col-12 col-sm-12 col-md-4   d-flex mt-4  align-items-center">
            <div class="card h-100 products w-100   " style=" text-align:left;">
          <img src="${item.imageURl}" class="card-img-top product-img "  style="object-fit: cover; height: 200px;">
          <div class="card-body mx-auto mt-2">
            <h5 >${item.title}</h5>
            <span class=" mt-4"><small>Price: ${item.price}</small></span>
            <p class=" mt-2"><small>Category: ${item.Category}</small></p>
            <i class="fa fa-heart mx-auto heart ${isFavorite ? "red" : ""}"></i>
            <button class="btn flex-nowrap ${isInCart ? "btn-danger" : "btn-primary"} cart-btn" 
                    data-title="${item.title}">
                    ${isInCart ? "Remove From Cart" : "Add To Cart"}
                </button>
          </div>
        </div>
      </div>
    `;
  });

  allproduct.innerHTML = y.join("");
}

drawItem()


// ======================= دالة البحث =======================

// =======================ربط الزرار البحث=======================
let searchBtn = document.querySelector(".searchbtn"); // زرار البحث

function handleSearch(){
    let selectvalue=selectform.value
    let searchvalue=inputsearch.value.toLowerCase();
    let filteredProducts =products.filter(item=>{
    if(selectvalue==="name"){
            return item.title.toLowerCase().includes(searchvalue)
            
    }
    if(selectvalue==="category"){
        return item.Category.toLowerCase().includes(searchvalue);
    }
     return true;
})
    drawItem(filteredProducts);
}

// ======================= ربط الحدث =======================
inputsearch.addEventListener("input", handleSearch);
selectform.addEventListener("change", handleSearch);
// الربط مع زرار البحث
searchBtn.addEventListener("click", handleSearch);

// الربط مع الضغط على Enter
inputsearch.addEventListener("keydown", function(e) {
    if(e.key === "Enter") {
        handleSearch();
        e.preventDefault(); // يمنع الفورم من إعادة تحميل الصفحة
    }
});
// ////////////////////////////////////////////////////////////////////////////////////

let numcart=document.querySelector(".numcart")
let cartproduct=document.querySelector(".carts-product")
let cartproductdiv=document.querySelector(".cart-items")
let cartproductitem=document.querySelector(".cart-poduct-item")

let addItem = localStorage.getItem("productsInCart") ? JSON.parse(localStorage.getItem("productsInCart")) : [];
if( addItem ) {
    addItem.map(item => {
        cartproductitem.innerHTML += ` <div class="cart-item">
                                                        <div class="cartitemcount">
                                                        <h5>${item.title}</h5>
                                                        <span>Price:${item.price}</span>
                                                        <div class="cart-counter">
                                                            <button class="decrease" data-title="${item.title}">-</button>
                                                            <span>${item.quantity}</span>
                                                            <button class="increase" data-title="${item.title}">+</button>
                                                        </div>
                                                        </div>
                                                    </div>
                                                    `; 
    })
    numcart.style.display = "block";
    numcart.innerHTML = addItem.length;
}
else{
    shoppingCart.style.display = "none";
}


// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// اضافه وحذف المنتجات فى السله

document.addEventListener("click", function(e){

    if(e.target.classList.contains("cart-btn")){

        if(!localStorage.getItem("Email")){
            window.location = "login.html";
            return;
        }

        let title = e.target.getAttribute("data-title");
        let addItem = JSON.parse(localStorage.getItem("productsInCart")) || [];

        let existingItem = addItem.find(item => item.title === title);

        if(existingItem){
            // نحذف
            addItem = addItem.filter(item => item.title !== title);
        } else {
            // نضيف
            let selectedItem = products.find(item => item.title === title);
            selectedItem.quantity = 1;
            addItem.push(selectedItem);
            
           
        }

        localStorage.setItem("productsInCart", JSON.stringify(addItem));
        
       // تحديث الكارت فورًا
        updateCartUI(addItem);
        drawItem(); // مهم جدا علشان الزرار يتحدث
    }

});


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// دى زيادة ونقصان الكونتتى 

document.addEventListener("click", function(e){
    if(e.target.classList.contains("increase") || e.target.classList.contains("decrease")){

        let title = e.target.dataset.title;
        let items = JSON.parse(localStorage.getItem("productsInCart")) || [];
        let product = items.find(item => item.title === title);

        if(product){
            if(e.target.classList.contains("increase")){
                product.quantity += 1;
            }

            if(e.target.classList.contains("decrease")){
                if(product.quantity > 1){
                    product.quantity -= 1;
                } else {
                    // لو الكمية 1 → نحذف المنتج
                    items = items.filter(item => item.title !== title);
                }
            }

            // تحديث الـ localStorage مرة واحدة فقط
            localStorage.setItem("productsInCart", JSON.stringify(items));
            // 👇 تحديث العنصر نفسه فقط
        let cartItemDiv = e.target.closest(".cart-item");

        if(product && cartItemDiv){
            let priceNumber = parseFloat(product.price.replace("$",""));
            let newTotal = priceNumber * product.quantity;

            cartItemDiv.querySelector(".cart-counter span").textContent = product.quantity;
            cartItemDiv.querySelector("span").textContent = 
                "Price: $" + newTotal.toFixed(2);
        }

            // تحديث واجهة الكارت
            updateCartUI(items);
            
        // تحديث العداد والتوتال
        numcart.textContent = items.reduce((sum,i)=>sum+i.quantity,0);
            // تحديث السعر
            calculatetotalprice(items);

            // تحديث زرار Add/Remove في صفحة المنتجات
            drawItem();
        }
    }
});






/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// دالة لتحديث واجهة الكارت
function updateCartUI(items){
    let cartproductitem = document.querySelector(".cart-poduct-item");
    let numcart = document.querySelector(".numcart");
    cartproductitem.innerHTML = "";

    items.forEach(item => {
        let priceNumber = parseFloat(item.price.replace("$",""));
        let itemTotal = priceNumber * item.quantity;
        cartproductitem.innerHTML += ` <div class="cart-item">
                                                        <div class="cartitemcount">
                                                        <h5>${item.title}</h5>
                                                        <span>Price: $${itemTotal.toFixed(2)}</span>
                                                        <div class="cart-counter">
                                                            <button class="decrease" data-title="${item.title}">-</button>
                                                            <span>${item.quantity}</span>
                                                            <button class="increase" data-title="${item.title}">+</button>
                                                        </div>
                                                        </div>
                                                    </div>
                                                    `; 

    });

    numcart.style.display = items.length > 0 ? "block" : "none";
    
    numcart.textContent =  items.length; 
    
    if(items.length == 0){
    cartDiv.style.display = "none";
}
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



function openCart(){
    if(cartproductitem.innerHTML!==""){
        if(cartproduct.style.display==="block"){
              cartproduct.style.display="none"            
        }
        else{
            cartproduct.style.display="block"
        }
        
    }
    else{
        cartproduct.style.display="none"
        
    }
}

cart.addEventListener("click", function(e){
    // if(cartDiv.style.display === "block"){
    //     cartDiv.style.display = "none";
    // } else {
    //     cartDiv.style.display = "block";
    // }
    e.stopPropagation(); // مهم جدا
    cartDiv.classList.toggle("active");
});
cart.addEventListener("click",openCart)



// نقفل الكارت لو ضغطنا في أي حتة في الصفحة
document.addEventListener("click", function(e){
    if(!cartDiv.contains(e.target) && !cart.contains(e.target)){
        cartDiv.classList.remove("active");
    }
});

// /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// let divcontainercount=document.querySelector(".cart-items-count")
// let countdiv=document.querySelector(".cart-items-count-container")
// let increasbtn=document.querySelector(".cart-items-count .increase")
// let decreasbtn=document.querySelector(".cart-items-count .decrease")
// increasbtn.addEventListener("click",()=>{
//     let current=Number(countdiv.textContent)
//     current+=1
//     countdiv.textContent=current
// })
// decreasbtn.addEventListener("click",()=>{
//     let current=Number(countdiv.textContent)
//     if(current>1 ){
//         countdiv.textContent = current-1
//     }
//     //  else {
//     //         // لو وصل للصفر أو أقل → نمسح الكارد كله من localStorage ومن DOM
//     //         let title = e.target.closest(".products").querySelector("h5").textContent;
//     //        title.remove()
//     //     }
    
// })
// function removeFromCart(title){
//     let items = JSON.parse(localStorage.getItem("productsInCart")) || [];
//     items = items.filter(item => item.title !== title);
//     localStorage.setItem("productsInCart", JSON.stringify(items));

//     updateCartUI(items);
//     calculatetotalprice(items);
//     drawItem(); // ✅ مهم جداً لتحديث الزرار
// }

// /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// غيرنا شكل القلب لاحمر 
document.addEventListener("click", function(e){
    if(e.target.classList.contains("heart")){
        if(localStorage.getItem("Email")){
            // e.target.classList.toggle("red");

            let title = e.target.parentElement.querySelector("h5").textContent;

            let favorites = localStorage.getItem("favorites")
                ? JSON.parse(localStorage.getItem("favorites"))
                : [];
                
                //مش عايزة المنتج يتكرر اعمل ايه بقى 
                let existingItem=favorites.find(item => item.title === title);
                if(existingItem){
                             // ❌ لو موجود نشيله
                    favorites = favorites.filter(item => item.title !== title);
                    e.target.classList.remove("red");
                }
                else {
                        // ✅ لو مش موجود نضيفه
                        let selectedItem = products.find(item => item.title === title);
                        favorites.push(selectedItem);
                        e.target.classList.add("red");
                }


            localStorage.setItem("favorites", JSON.stringify(favorites));

        } else {
            window.location="login.html"
        }
    }
});


        

// نغيير لون القلب واضافه العناصر الى الصفحه الكارت بس فى التصنيف المفضل 








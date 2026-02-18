let productsInCart=localStorage.getItem("productsInCart")
let allproduct=document.querySelector("#productsContainer")

let removebutton=document.querySelector(".removebtn")
// /////////////////////////////////////////////////////////////////////////////////////////////////////
// حساب السعر الكلى فى السله
function calculatetotalprice(products){
  let total=0
  products.forEach(item => {
       let priceNumber = parseFloat(item.price.replace("$", ""));  // علشان نشيل علامه الدولار من السعر 
        total += priceNumber * item.quantity; //✅ ضربنا في الكمية
  });
  let totalpriceSpan = document.querySelector(".totalprice-span");
    totalpriceSpan.innerHTML =total.toFixed(2);
  }
 
// /////////////////////////////////////////////////////////////////////////////////////////////////////


if(productsInCart){
    let item=JSON.parse(productsInCart)
    drawCartProducts(item)
calculatetotalprice(item);
    

}
// /////////////////////////////////////////////////////////////////////////////////////////////////////

function drawCartProducts(products){

      let y=products.map((item)=>{
        
        return  `      
            


      <div class="card col-12 col-md-6 ms-3 mt-3 mb-4 products" style="max-width: 550px;">
  <div class="row p-1  ">
    <div class="col-md-4  d-flex justify-content-center align-items-center ">
      <img src="${item.imageURl}" class="card-img product-img-cart">
    </div>
    <div class="col-md-8">
      <div class="card-body d-flex justify-content-center align-items-center gap-4 ">
      <div class="mx-3  ">
        <h5>${item.title}</h5>
        <span><small>Price: ${item.price}</small></span>
            <p><small>Category: ${item.Category}</small></p>
             <div class="cart-counter">
                                                            <button class="decrease" data-title="${item.title}">-</button>
                                                            <span>${item.quantity}</span>
                                                            <button class="increase" data-title="${item.title}">+</button>
                                                        </div>
    </div>

                                                        <div class="">
            <button class="btn btn-danger  removebtn" type="submit" onclick=" removeFromCart('${item.title}')" "style="max-width: 200px;" ><small>Remove from Cart</small></button>
    </div>
    </div>
  </div>
</div>
</div>
      
    `
    })
    allproduct.innerHTML=y.join("");

}
// /////////////////////////////////////////////////////////////////////////////////////////////////////

// ========== REMOVE ==========
// function removeFromCart(title) {
//   let items = JSON.parse(localStorage.getItem("productsInCart")) || [];

//   let newItems = items.filter(item => item.title !== title); //بيشيل كل المنتجات الى ليها نفس الاسم

//   localStorage.setItem("productsInCart", JSON.stringify(newItems));

//   drawCartProducts(newItems); // إعادة رسم الصفحة
// }


// ////////////////////////////////////////////////////////////////////////////
function removeFromCart(title) {
    let items = JSON.parse(localStorage.getItem("productsInCart")) || [];

    // نلاقي أول منتج مطابق
    let index = items.findIndex(item => item.title === title);

    if(index !== -1) {
        items.splice(index, 1); // نحذف عنصر واحد فقط
    }

    localStorage.setItem("productsInCart", JSON.stringify(items));

    drawCartProducts(items); // إعادة رسم الكارت
    calculatetotalprice(items);
     drawItem(); // مهم جداً لتحديث زرار Add/Remove
}

// ده الاحسن

//////////////////////////////////////////////////////////////////////////////////

// بص كل الى هعمله ده هحطه فى داله الاد اوك 
//لو الديف الى فيه المنتجت فيه منتج واحنا ضفنا منتج يقوم زايد العدد باعه هنعمل عداد
//تانى حاجه اصلا لازم نعمل ايه نعمل ديق فيه كونتر اصلا بيطلع وينزل 





/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//دى بترسم ازاى المنتجات المفضله بتتضاف
let favoriteContainer = document.querySelector("#favoriteContainer");
  function drawfavoriteproducts(products){
    if(!products || products.length === 0){
        favoriteContainer.innerHTML = "<p class='text-center mt-3 text-black fs-5 text-danger'>No favorite items</p>";
        return;
    }
    // let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
      let y=products.map((item)=>{
        let isFavorite = favorites.find(fav => fav.title === item.title);
        return  `          
   <div class=" d-flex justify-content-center align-content-center align-item-center     ">
        <div class="card products mx-2 overflow-hidden" style="width: 290px;">
          <img src="${item.imageURl}" class="card-img-top product-img">
          <div class="card-body mx-auto" >
            <h5>${item.title}</h5>
            <p><small>Category: ${item.Category}</small></p>
            
            <i class="fa fa-heart  mx-auto heart text-center ${isFavorite ? "red" : ""}" onclick=" removeFromfavorite('${item.title}') "></i>
          </div>
        </div>
      </div>
      
    `
    })
    favoriteContainer.innerHTML = y.join("");


}

// ازاى نشيل بقى المنتج المفضل عن طريق القلب لما ادوس عليه

function removeFromfavorite(title){
   // جلب المفضلة الحالية
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    // حذف المنتج من المفضلة
    favorites = favorites.filter(item => item.title !== title);
     // حفظ التغييرات
    localStorage.setItem("favorites", JSON.stringify(favorites));

    // رسم المفضلة مرة تانية
    drawfavoriteproducts(favorites);
    // ✅ تحديث الزرار في صفحة المنتجات
    

}
let favorites = localStorage.getItem("favorites")
    ? JSON.parse(localStorage.getItem("favorites"))
    : [];

// استدعاء الدالة دايمًا، حتى لو فاضية
drawfavoriteproducts(favorites);


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//تمام بقى عايزين بقى نعمل كونتر علشان نضيف كذا منتج اوك 

// /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
let cartContainer = document.querySelector("#productsContainer"); // الأب اللي فيه كل الكروت
cartContainer.addEventListener("click", function(e){

    let items = JSON.parse(localStorage.getItem("productsInCart")) || [];

    // لما أضغط +
    if(e.target.classList.contains("increase")){

        let title = e.target.closest(".products").querySelector("h5").textContent;

        let product = items.find(item => item.title === title);

        if(product){
            product.quantity += 1;
        }

        localStorage.setItem("productsInCart", JSON.stringify(items));

        drawCartProducts(items);
        calculatetotalprice(items);
    }

    // لما أضغط -
    if(e.target.classList.contains("decrease")){

        let title = e.target.closest(".products").querySelector("h5").textContent;

        let product = items.find(item => item.title === title);

        if(product){

            if(product.quantity > 1){
                product.quantity -= 1;
            } else {
                // لو الكمية 1 ومسحناها
                items = items.filter(item => item.title !== title);
            }
        }

        localStorage.setItem("productsInCart", JSON.stringify(items));

        drawCartProducts(items);
        calculatetotalprice(items);
    }
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 

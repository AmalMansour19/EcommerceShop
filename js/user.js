let UserInfo=document.querySelector("#UserInfo")
let userData=document.querySelector("#user")
let links=document.querySelector("#links")
let cart=document.querySelector("#cart")
let logoutbutn=document.querySelector("#logoutbutn")
let shoppingCart=document.querySelector(".shopping-cart")

if(localStorage.getItem("Email")){
    links.remove()
    UserInfo.style.display ="flex"
    
     shoppingCart.style.display="block"
    userData.innerHTML="Hello, "+ localStorage.getItem("FirstName" )
    userData.style.margin="10px"
    
    cart.style.margin="10px"
    logoutbutn.style.display="block"
    // logoutbutn.style.margin="15px"
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
let logOut=document.querySelector("#logoutbutn")
logOut.addEventListener("click",()=>{
    localStorage.clear()
     userData.style.display="none"
    setTimeout(()=>{
        window.location = "index.html";
    },1500)
})



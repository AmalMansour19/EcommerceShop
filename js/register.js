let FirstName=document.querySelector("#Firstname")
let lastName=document.querySelector("#lastname")
let Email=document.querySelector("#inputEmail3")
let Password=document.querySelector("#inputPassword3")
let RegisterBtn=document.querySelector("#BtnRegister")

RegisterBtn.addEventListener("click",function(event){
    event.preventDefault()
    if( FirstName.value===""|| lastName.value===""||Email.value===""||Password.value==="" ){
        alert("Please Fill Data")
    }
    else{
        localStorage.setItem("FirstName",FirstName.value)
        localStorage.setItem("lastName",lastName.value)
        localStorage.setItem("Email",Email.value)
        localStorage.setItem("Password",Password.value)
        alert("Account Created Successufully!");
        setTimeout(()=>{
            window.location="login.html"
        },1000)
    }
})
let Email=document.querySelector("#inputEmail3")
let Password=document.querySelector("#inputPassword3")
let LoginBtn=document.querySelector("#BtnLogin")

let getEmail=localStorage.getItem("Email")
let getPassword=localStorage.getItem("Password")

LoginBtn.addEventListener("click",function(event){
    event.preventDefault()
    if(Email.value===""||Password.value===""){
        alert("PLease Fill Data")
    }
    else{
        if(getEmail&&getEmail.trim()===Email.value&&getPassword.trim()===Password.value){
            setTimeout(()=>{
                window.location="index.html"
            },1000)
        }
        else{
            alert("Password or Email are wrong please try again ")
        }
    }
})
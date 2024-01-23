// import {apiUrl} from "../../app.js";

const logIn = (event) => {
    event.preventDefault()
    const name = document.getElementById("username-input")
    const password = document.getElementById("password-input")

    console.log(name.value, password.value)

    if(!name.value || !password.value){
        console.log("Empty")
    }

    fetch("/api/login", {
        method: "POST",
        headers: {"Content-Type": "application/x-www-form-urlencoded"},
        body: `username=${name.value}&password=${password.value}`
    }).then((result) => {
        if(result.status === 200){
            result.json().then((res)=>{
                document.cookie = `token=${res.token}`
            })
            window.location = "/my-dashboard"
        }
        else{
            document.getElementById("error-text").style.display="block"
        }
    }).catch(e=>console.log(e))


}
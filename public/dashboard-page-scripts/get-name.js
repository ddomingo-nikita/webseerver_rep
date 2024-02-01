const getName = () => {
    // document.getElementById("name").textContent=document.cookie.split("=")[1].split("_")[0]
    document.getElementById("name").textContent=sessionStorage.getItem("username")
}

 window.onload = () => getName()
const getName = () => {
    document.getElementById("name").textContent=document.cookie.split("=")[1].split("_")[0]
}


 window.onload = () => getName()
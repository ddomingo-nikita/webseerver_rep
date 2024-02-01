const getPhotoPath = async (name) => {
    return await fetch(`/api/${name}/profile-picture-path`).then((result) => result.json()).then((res) => res.path)
}

const getName = async () => {
    const name = sessionStorage.getItem("username")
    // document.getElementById("name").textContent=document.cookie.split("=")[1].split("_")[0]
    document.getElementById("name").textContent = name
    document.getElementById("avatar").src = await getPhotoPath(name)
}

 window.onload = () => getName()
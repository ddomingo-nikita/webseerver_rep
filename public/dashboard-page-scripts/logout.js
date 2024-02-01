const logout = () => {
    document.cookie = "token= ; expires = Thu, 01 Jan 1970 00:00:00 GMT"
    sessionStorage.removeItem("username")
    window.location="/home"
}
const togglePasswordField = () => {
    const input = document.getElementById("password-input")
    const button = document.getElementById("show-button")
    input.type = input.type==="password" ? "text" : "password"
    button.textContent = button.textContent === "Show" ? "Hide" : "Show"
}


const loginForm = document.querySelector("#login-form")

const onSuccessLogin = () => {
    client.subscribe(`temperature`)
    client.subscribe(`pulse`)

    // Send a message test
    //message = new Paho.MQTT.Message(`Client ${clientID} was conected.`)
    //message.destinationName = "/tesTopic"
    //client.send(message);
    setRouter("watch-page") // function from router.js
}

const onFailedLogin = (errorResponse) => {
    console.log(errorResponse)
    
    const errorMessage = document.createElement("p")
    errorMessage.setAttribute("className", "alert alert-danger")
    errorMessage.setAttribute("role", "alert")
    errorMessage.textContent = errorResponse.errorMessage

    loginForm.appendChild(errorMessage)
}

const onLoginSubmit = async (event) => {
    event.preventDefault()

    const username = document.getElementById("username")
    const password = document.getElementById("password")

    client.connect({
        useSSL: true,
        userName: username.value,
        password: password.value,
        onSuccess: onSuccessLogin,
        onFailure: onFailedLogin
    })
}

document.querySelector("#login-submit").addEventListener("click", onLoginSubmit, false)
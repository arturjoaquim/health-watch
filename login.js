const loginForm = document.querySelector("#login-form")

const onSuccessLogin = () => {
    client.subscribe("temperature");
    client.subscribe("pulseSensor");

    message = new Paho.MQTT.Message(`Client ${clientID} was conected.`);
    message.destinationName = "/tesTopic";
    client.send(message);
    document.querySelector("#app").innerHTML = `<h1>Connected on MQTT</h1>`
}

const onFailedLogin = (errorResponse) => {
    console.log(errorResponse)
    
    const errorMessage = document.createElement("p")
    errorMessage.setAttribute("className", "alert alert-danger")
    errorMessage.setAttribute("role", "alert")
    errorMessage.textContent = errorResponse.errorMessage

    loginForm.appendChild(errorMessage)
}

const connectOptions = {
    useSSL: true,
    userName: "username",
    password: "password",
    onSuccess: onSuccessLogin,
    onFailure: onFailedLogin
}

const onLoginSubmit = async (event) => {
    event.preventDefault()

    const username = document.getElementById("username")
    const password = document.getElementById("password")

    connectOptions.userName = username.value
    connectOptions.password = password.value

    client.connect(connectOptions)
}

document.querySelector("#login-submit").addEventListener("click", onLoginSubmit, false)
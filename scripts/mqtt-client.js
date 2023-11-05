 // Create a client instance
 const hostURL = "395ba89b27d0401abab4753a680701dd.s1.eu.hivemq.cloud"
 const port = 8884
 const clientID = "web_" + parseInt(Math.random() * 100, 10)

 const client = new Paho.MQTT.Client(hostURL, port, clientID)
 //Example client = new Paho.MQTT.Client("m11.cloudmqtt.com", 32903, "web_" + parseInt(Math.random() * 100, 10));

 // set callback handlers
 client.onConnectionLost = onConnectionLost;
 client.onMessageArrived = onMessageArrived;

 // connect the client
 //client.connect(options);

 // called when the client connects
 function onConnect() {
   // Once a connection has been made, make a subscription and send a message.
   console.log("onConnect");
   client.subscribe("testTopic");
   console.log("Listen ins topic [testTopic]")
   message = new Paho.MQTT.Message(`Client ${clientID} was conected.`);
   message.destinationName = "/tesTopic";
   client.send(message);
 }

 function doFail(e){
   console.log(e);
 }

 // called when the client loses its connection
 function onConnectionLost(responseObject) {
   if (responseObject.errorCode !== 0) {
     console.log("onConnectionLost:"+responseObject.errorMessage);
   }
 }

 // called when a message arrives
 function onMessageArrived(message) {
   console.log("onMessageArrived:"+message.payloadString);
   localStorage.setItem(message.destinationName, message.payloadString)
   setTemperatureInHTML(message)
   setPulseInHTML(message)
 }


 function setTemperatureInHTML(message) {
  if (!(message.destinationName == "temperature")) {
    return false
  }

  const temp = localStorage.getItem(message.destinationName)
  const displayTemp = document.querySelector(".temperature-signal")

  displayTemp.innerHTML = `${temp}° C`
}

 function setPulseInHTML(message) {
  if (!(message.destinationName == "pulse")) {
    return false
  }

  const pulse = localStorage.getItem(message.destinationName)
  const displayPulse = document.querySelector(".pulse-signal")

  displayPulse.innerHTML = `${pulse} BPM`
 }
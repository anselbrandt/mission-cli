const fetch = require("node-fetch");
const io = require("socket.io-client");
const socket = io("wss://missioncontrol.herokuapp.com");
//const socket = io("http://localhost:4000");
require("dotenv").config();
const api_key = process.env.API_KEY;

socket.on("connect", () => {
  console.log("connected");
  console.log("your id is ", socket.id);
  fetch(`https://www.googleapis.com/geolocation/v1/geolocate?key=${api_key}`, {
    method: "POST",
    body: JSON.stringify({ considerIp: true })
  })
    .then(response => response.json())
    .then(response => {
      const identity = {
        client: "nodeclient",
        id: socket.id,
        location: response.location
      };
      socket.emit("identity", JSON.stringify(identity));
    });
});

// socket.on("pi data", data => {
//   const readings = JSON.parse(data);
//   console.log("new data");
// });

socket.on("pi message", data => {
  io.emit("pi message", data);
});

socket.on("web", data => {
  console.log(data);
});

socket.on("server", data => {
  const message = JSON.parse(data);
  console.log(message);
});

socket.on("connected", data => {
  const message = JSON.parse(data);
  console.log(message);
});

socket.on("disconnected", data => {
  const message = JSON.parse(data);
  console.log(message);
});

socket.on("identity", data => {
  const message = JSON.parse(data);
  console.log(message);
});

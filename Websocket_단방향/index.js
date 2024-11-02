const express = require("express");
const { WebSocketServer } = require("ws");
const app = express();

app.use(express.static("front"));

app.listen(8000, () => {
  console.log("Server listening on port 8000");
});

const wss = new WebSocketServer({ port: 8001 });

wss.on("connection", (ws) => {
  ws.on("message", (data) => {
    console.log(`Received from client: ${data}`);
  });
});

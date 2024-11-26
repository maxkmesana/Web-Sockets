import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173"
  }
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
  });

io.on("connection", (socket) => {
  console.log("Client connected successfully!");

  socket.on("message", (message) => {
    console.log(`Message received: ${message}`);
    socket.emit("response", {response: `Message received on server: ${message}`});
  })

  socket.on("disconnect", () => {
    console.log(`Cliend disconnected :(`);

  })
});




server.listen(3000, () => {
  console.log(`Socket.IO server running at http://localhost:3000`);
});





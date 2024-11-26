import { useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client';
import './App.css'

function App() {
  const [text, setText] = useState("");

  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const newSocket = io('http://localhost:3000'); 

    newSocket.on('connect', () => {
      console.log("Connection established.");
    });

    newSocket.on('message', (data: string) => {
      console.log(data);
    });

    newSocket.on('response', (data: string) => {
      console.log(data);
    });

    setSocket(newSocket);


    return () => {
      newSocket.disconnect();
    };
  }, []);

  const sendMessage = (message: string) => {
    socket?.emit("message", message);
  }

  return (
    <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
      <input type="text" onChange={(e) => setText(e.target.value)}/>
      <button onClick={() => sendMessage(text)}>Send message!</button>
    </div>
  )
}

export default App

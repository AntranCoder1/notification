import react, { useEffect, useState } from "react";
import "./app.css";
import { posts } from "./data";
import Card from "./components/Card/Card";
import Navbar from "./components/Navbar/Navbar";
import { io } from "socket.io-client";

function App() {

  const [username, setUsername] = useState("");
  const [user, setUser] = useState("");
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    setSocket(io("http://localhost:5000"));
    
  }, []);

  useEffect(() => {
    socket?.emit("newUser", user);
  }, [socket, user]);

  return (
    <div className="container">
      { user ? (
        <>
          <Navbar socket={socket} />
          { posts.map((item) => (
            <Card key={item.id} post={item} socket={socket} user={user} />
          )) }
        </>
      ) : (
        <div className="login">
          <h2>An App</h2>
          <input 
            type="text"
            placeholder="username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <button onClick={() => setUser(username)}>Login</button>
        </div>
      ) }
    </div>
  );
}

export default App;

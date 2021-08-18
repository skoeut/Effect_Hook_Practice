import React, { useState, useEffect } from "react";
import "./App.css";

import AlbumList from "./AlbumList";
import UserList from "./UserList";

function App() {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    setUsers([])
    const abortController = new AbortController(); 
    async function loadUser() {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users",
          { signal: abortController.signal } 
        );
        const userFromAPI = await response.json();
        setUsers(userFromAPI);
      } catch (error) {
        if (error.name === "AbortError") {
        } else {
          throw error;
        }
      }
    }
    loadUser()
    return () => {
      abortController.abort();
    };
  }, []);

  useEffect(() => {
    async function loadAlbums() {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/albums?userId=${currentUser.id}`
      );
      const userFromAPI = await response.json();
      setCurrentUser(userFromAPI);
    }
    loadAlbums();
  }, [currentUser.id]); 
 console.log(currentUser)

 return (
  <div className="App">
    <div className="left column">
      <UserList users={users} setCurrentUser={setCurrentUser} />
    </div>
    <div className="right column">
      <AlbumList user={currentUser} />
    </div>
  </div>
);
}

export default App;
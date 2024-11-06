import React, { useEffect, useState } from "react";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [currentUserIndex, setCurrentUserIndex] = useState(0);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);

  const nextUser = () => {
    setCurrentUserIndex((prevIndex) =>
      prevIndex < users.length - 1 ? prevIndex + 1 : prevIndex
    );
  };

  const prevUser = () => {
    setCurrentUserIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : prevIndex
    );
  };

  if (users.length === 0) {
    return <div>No users found or loading...</div>;
  }

  const user = users[currentUserIndex];
  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <div
          style={{
            width: "50px",
            height: "50px",
            borderRadius: "50%",
            backgroundColor: "#007bff",
            color: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "1.5em",
          }}
        >
          {initials}
        </div>
        <h2>{user.name}</h2>
        <p>{user.email}</p>
        <p>{user.website}</p>
      </div>
      <button onClick={prevUser} disabled={currentUserIndex === 0}>
        Previous
      </button>
      <button
        onClick={nextUser}
        disabled={currentUserIndex === users.length - 1}
      >
        Next
      </button>
    </div>
  );
};

export default UserList;

import React, { useEffect, useState } from "react";
import axios from "axios";

function UserList() {
  const [users, setUsers] = useState([]);

  // Gọi API GET để lấy danh sách user
  const fetchUsers = async () => {
    const res = await axios.get("http://localhost:3000/api/users");
    setUsers(res.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div style={{ width: "400px", margin: "auto", textAlign: "center" }}>
      <h2>📋 Danh sách người dùng</h2>
      <ul>
        {users.map((u) => (
          <li key={u.id}>
            {u.name} - {u.email}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;

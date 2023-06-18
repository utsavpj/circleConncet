import React, { useEffect, useState } from 'react'
import { getUsers } from '../Store/AuthActions';


function Profile() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersData = await getUsers();
        setUsers(usersData);
      } catch (error) {
        console.error('Error getting users:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h2>User Details</h2>
      {users.map((user) => (
        <div key={user.id}>
          <h3>{user.name}</h3>
          <p>Username: {user.username}</p>
          <p>Date of Birth: {user.dob}</p>
          <p>Email: {user.email}</p>
          <p>Password: {user.password}</p>
        </div>
      ))}
    </div>
  );
};


export default Profile
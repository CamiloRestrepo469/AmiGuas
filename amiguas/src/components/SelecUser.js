import React, { useState, useEffect } from 'react';
import { collection, query, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import Chat from './Chat';

function SelectUser() {
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);


    const [users, setUsers] = useState([]);

    const onUserSelected = (user) => {
        setSelectedUser(user);
      }
      
    

    useEffect(() => {
        const fetchUsers = async () => {
            const usersCollection = collection(db, 'users'); 
            console.log(usersCollection);
            console.log(db);
            console.log(collection);
            const usersSnapshot = await getDocs(usersCollection);
            const usersData = [];
            usersSnapshot.forEach((doc) => {
                const userData = doc.data();
                usersData.push({ id: doc.id, ...userData });
            });
            setUsers(usersData);
        };
        

        fetchUsers();
    }, []);
    
    return (
        <div>
            <h2>Select a User to Chat</h2>
            <ul>
                {users.map((user) => (
                    <li key={user.id}>
                        <button onClick={() => onUserSelected(user)}>
                            {user.displayName}
                        </button>
                        {isChatOpen && selectedUser && <Chat user={selectedUser} />}


                    </li>
                ))}
            </ul>
        </div>
    );
}

export default SelectUser;

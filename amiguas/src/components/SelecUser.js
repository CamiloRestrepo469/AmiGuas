import React, { useState, useEffect, useContext } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import Chat from './Chat';
import { styled } from 'styled-components';
import { Avatar, Button } from '@mui/material';
import { User } from 'firebase/auth';
import { AuthContext } from '../context/AuthContext';

function SelectUser() {
  const { currentUser } = useContext(AuthContext);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [users, setUsers] = useState([]);

  const onUserSelected = (user) => {
    setSelectedUser(user);
    setIsChatOpen(true);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      const usersCollection = collection(db, 'users');
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
    <Container>
      <Span>Seleccionar usuario</Span>
      <UserChat>
        {users
          .filter((user) => user.uid !== currentUser.uid) // Filtra usuarios diferentes al usuario logueado
          .map((user) => (
            <UserItem key={user.id}>
              <UserButton>
                <Button onClick={() => onUserSelected(user)}>
                  <Avatar src={user.photoURL} />
                  <UserText>{user.displayName}</UserText>
                </Button>
              </UserButton>
            </UserItem>
          ))
        }
      </UserChat>

      {isChatOpen && <Chat user={selectedUser} />}
    </Container>

  );
}

export default SelectUser;

const Container = styled.div`
  position: sticky;
  background-color: #f0f0f0;
  right: 0;
  height: 92vh;
  overflow-x: scroll;
`;

const UserChat = styled.ul`
  padding: 10px;
  list-style: none;
  display: flex;
  flex-direction: column;
  @media (max-width: 990px) {
    display: grid;
    place-items: center;
  }
`;

const UserItem = styled.li`
  display: flex;
  flex-direction: row;
  margin-left: 0;
  &:hover {
    background-color: #e0fbfc;
  }
`;

const UserButton = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 0;
  .MuiAvatar-root {
    width: 45px;
    height: 45px;
    position: relative;
    margin: 3px 10px;
    color: #3d5a80;
  }
`;

const UserText = styled.p`
  font-size: 15px;
  color: #3d5a80;
  @media (max-width: 1200px) {
    font-size: 12px;
  }
  @media (max-width: 990px) {
    font-size: 12px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 9px; /* Ancho de una letra */
  }
`;

const Span = styled.div`
  margin: 10px;
  font-size: 30px;
  color: #3d5a80;
`;

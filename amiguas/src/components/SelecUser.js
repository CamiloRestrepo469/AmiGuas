import React, { useState, useEffect, useContext } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import Chat from './Chat';
import { styled } from 'styled-components';
import { Avatar, Button } from '@mui/material';
import { User } from 'firebase/auth';
import { AuthContext } from '../context/AuthContext';

function SelectUser() {
    // Estados para gestionar la selección del usuario y el estado del chat
  const { currentUser } = useContext(AuthContext);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [users, setUsers] = useState([]);

   // Función para manejar la selección de un usuario y abrir el chat correspondiente
  const onUserSelected = (user) => {
    setSelectedUser(user);
    setIsChatOpen(true);
  };

    // Efecto para obtener la lista de usuarios al cargar el componente
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


  // JSX que representa la interfaz de selección de usuario y chat
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

// Estilos usando styled-components para el componente SelectUser
const Container = styled.div`
  position: sticky;
  background-color: #f0f0f0;
  right: 0;
  height: 92vh;
  overflow-x: scroll;

  @media (max-width: 990px){
    width: auto;
  }
  
`;

const UserChat = styled.ul`
  padding: 10px;
  list-style: none;
  display: flex;
  flex-direction: column;

  @media (max-width: 990px) {
    display: flex;
    place-items: center;
    align-items: center;
  }
`;

const UserItem = styled.li`
  display: flex;
  flex-direction: row;
  margin-left: 0;

  &:hover {
    background-color: rgba(255, 255, 255, 0.7);
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
    
    &:hover{
      color: rgba(255, 255, 255, 0.7);
    }

    @media(max-width: 990px){
      width: 55px;
      height: 55px;
    }
  }

`;

const UserText = styled.p`
  font-size: 15px;
  color: #3d5a80;
  @media (max-width: 1200px) {
    font-size: 12px;
  }
  @media (max-width: 990px) {
    font-size: 10px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 0px; /* Ancho de una letra */
  }
`;

const Span = styled.div`
  margin: 10px;
  font-size: 30px;
  color: #3d5a80;

  @media(max-width: 990px){
    margin: 20px;
    font-size: 10px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 65px;
  }
`;

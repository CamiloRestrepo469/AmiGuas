import React, { useState, useContext } from 'react';
import styled from '@emotion/styled';
import { Avatar } from '@mui/material';
import { collection, getDocs, query, where, doc, setDoc, updateDoc, serverTimestamp, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { AuthContext } from '../context/AuthContext';

const Search2 = () => {
  const [userName, setUserName] = useState('');
  const [users, setUsers] = useState([]); // Cambiar 'user' a 'users' para almacenar múltiples usuarios
  const [error, setError] = useState(false);
  const { currentUser } = useContext(AuthContext);

  const handleSearch = async () => {
    console.log('Searching for user:', userName);
    const q = query(
      collection(db, "users"),
      where("displayName", "==", userName.toLowerCase())
    );

    try {
      const querySnapshot = await getDocs(q);
      console.log(querySnapshot);
      const foundUsers = [];
      querySnapshot.forEach((userDoc) => {
        foundUsers.push(userDoc.data()); // Agregar los datos del documento a la lista de usuarios
      });
      console.log(foundUsers);
      setUsers(foundUsers); // Establecer el estado con la lista de usuarios encontrados
    } catch (error) {
      setError(true);
      console.error(error);
    }
  };

  const handleKey = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleSelect = async (selectedUser) => { // Cambiar 'selectedUserId' a 'selectedUser'
    if (currentUser && selectedUser) { // Cambiar 'user' a 'selectedUser'
      const combinedId =
        currentUser.uid > selectedUser.userId
          ? currentUser.uid + selectedUser.userId
          : selectedUser.userId + currentUser.uid;

      try {
        const chatDocRef = doc(db, "messages", combinedId);
        const chatDocSnapshot = await getDoc(chatDocRef);
        console.log(chatDocRef);
        console.log(chatDocSnapshot);

        if (!chatDocSnapshot.exists()) {
          await setDoc(chatDocRef, { messages: [] });

          await updateDoc(doc(db, "userChats", currentUser.uid), {
            [combinedId + ".userInfo"]: {
              uid: selectedUser.userId, // Cambiar 'user.userId' a 'selectedUser.userId'
              displayName: selectedUser.displayName, // Cambiar 'user.displayName' a 'selectedUser.displayName'
              photoURL: selectedUser.photoURL, // Cambiar 'user.photoURL' a 'selectedUser.photoURL'
            },
            [combinedId + "date"]: serverTimestamp(),
          });

          await updateDoc(doc(db, "userChats", selectedUser.userId), {
            [combinedId + ".userInfo"]: {
              userId: currentUser.uid,
              displayName: currentUser.displayName,
              photoURL: currentUser.photoURL,
            },
            [combinedId + "date"]: serverTimestamp(),
          });
        }
      } catch (error) {
        console.error('Error al seleccionar el usuario:', error);
      }
    }

    setUsers([]); // Limpiar la lista de usuarios después de seleccionar uno
  };

  return (
    <SearchContainer>
      <SearchForm>
        <label htmlFor="searchInput" style={{ display: 'none' }}>¿A quién buscas?</label>
        <input
          type="text"
          id="searchInput"
          placeholder="¿A quién buscas?"
          onKeyDown={handleKey}
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
      </SearchForm>
      {error && <Span>Usuario no existe</Span>}
      {users.length > 0 && (
        users.map((user, index) => (
          <UserChat key={index} onClick={() => handleSelect(user)}>
            <Avatar src={user.photoURL || ''} />
            <UserChatInfo>
              <Span>{user.displayName}</Span>
            </UserChatInfo>
          </UserChat>
        ))
      )}
      {/* {users.length === 0 && (
        <Span>No se encontraron usuarios</Span>
      )} */}
    </SearchContainer>
  );
};

export default Search2;


const SearchContainer = styled.div`
  border-right: 1px solid blue;
  background-color: #cfcfcf;
`;

const SearchForm = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;

  input {
    margin-bottom: 10px;
    background-color: transparent;
    border: none;
    color: #FFF;
    outline: none;

    &::placeholder {
      color: black;
    }
  }
`;

const UserChat = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: row;
  gap: 10px;
  color: black;
  background-color: blue; 
  cursor: pointer;

  &:hover {
    background-color: rgba(255, 255, 255, 0.7);
  }
`;

const UserChatInfo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: blue;  
  color: red;
  font-size: 18px;
`;

const Span = styled.span`
  color: black;
  padding: 3px;
  background-color: red;
  font-weight: bold;
`;

import React, { useState, useContext } from 'react';
import styled from '@emotion/styled';
import { Avatar } from '@mui/material';
import { collection, getDocs, query, where, doc, setDoc, updateDoc, serverTimestamp, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { AuthContext } from '../context/AuthContext';

const Search2 = () => {
  const [userName, setUserName] = useState('');
  const [user, setUser] = useState(null);
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
      const users = [];
      querySnapshot.forEach((doc) => {
        users.push(doc.data()); // Agrega el documento completo
      });
      console.log(users);
      setUser(users); // Establece el estado con los documentos completos
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

  const handleSelect = async () => {
    // Asegúrate de que currentUser esté definido y contenga la información necesaria

      const combinedId =
       currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;
        console.log(currentUser);
        console.log(user);
  
      try {
        const chatDocRef = doc(db, "chats", combinedId);
        const chatDocSnapshot = await getDoc(chatDocRef);
        console.log(chatDocRef);
        console.log(chatDocSnapshot);

  
        if (!chatDocSnapshot.exists()) {
          await setDoc(chatDocRef, { messages: [] });
          
          await updateDoc(doc(db, "userChats", currentUser.uid), {
            [combinedId + ".userInfo"]: {
              uid: user.uid,
              displayName: user.displayName,
              photoURL: user.photoURL,
            },
            [combinedId + "date"]: serverTimestamp(),
          });console.log(chatDocSnapshot);
  
          await updateDoc(doc(db, "userChats", user.uid), {
            [combinedId + ".userInfo"]: {
              uid: currentUser.uid,
              displayName: currentUser.displayName,
              photoURL: currentUser.photoURL,
            },
            [combinedId + "date"]: serverTimestamp(),
          });
        }
      } catch (error) {
        console.error('Error al seleccionar el usuario:', error);
      }

    setUser(null);
    setUserName('');

  };
  
  


  return (
    <SearchContainer>
      <SearchForm>
        <input
          type="text"
          placeholder={`¿A quién buscas?`}
          onKeyDown={handleKey}
          value={userName} // Bind the input value to the state
          onChange={(e) => setUserName(e.target.value)}
        />
      </SearchForm>
      {error && <Span>Usuario No existe</Span>}
      {user && (
        user.map((user, index) => (
          <UserChat key={index} onClick={() => handleSelect(user.userId)}>
            <Avatar src={user.photoURL || ''} />
            <UserChatInfo>
              <Span>{user.displayName}</Span>
            </UserChatInfo>
          </UserChat>
        ))
      )}



      {user && user.length === 0 && (
        <Span>No se encontraron usuarios</Span>
      )}
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

import React, { useContext, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { Avatar } from '@mui/material';
import { onSnapshot, collection, query, orderBy, where } from 'firebase/firestore';
import { db } from '../firebase';
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';

const Chats2 = () => {
  const [chats, setChats] = useState([]);

  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    const getChats = async () => {
      const chatQuery = query(
        collection(db, 'chats'),
        where('participants', 'array-contains', currentUser.uid),
        orderBy('lastMessage.timestamp', 'desc')
      );

      const unsubscribe = onSnapshot(chatQuery, (querySnapshot) => {
        const chatData = [];
        querySnapshot.forEach((doc) => {
          chatData.push({ id: doc.id, ...doc.data() });
        });
        setChats(chatData);
      });

      return () => {
        unsubscribe();
      };
    };

    if (currentUser?.uid) {
      getChats();
    }
  }, [currentUser]);

  const handleSelect = (chat) => {
    dispatch({ type: "CHANGE_USER", payload: chat });
  };

  return (
    <Container className="Chat2">
  {chats
    .sort((a, b) => b.lastMessage.timestamp - a.lastMessage.timestamp)
    .map((chat) => (
      <UserChat
        className="UserChat"
        key={chat.id}
        onClick={() => handleSelect(chat)}
      >
        <Avatar src={chat.userInfo.photoURL} />
        <UserChatInfo className="UserChatInfo">
          <Span>{chat.userInfo.displayName}</Span>
          <P>{chat.lastMessage?.text}</P>
        </UserChatInfo>
      </UserChat>
    ))}
</Container>

  );
}

export default Chats2;


const Container = styled.div`
  
`;


const UserChat = styled.div`
  padding: 10px;
  display: flex;
  align-items: center;
  gap: 10px;
  color: white;
  cursor: pointer;

  &:hover{
    background-color: rgba(255, 255, 255, 0.7);
  }

  .MuiAvatar-root {
    width: 40px;
    height: 40px;  
    object-fit: cover;
`;

const UserChatInfo = styled.div`
  color: red;
  font-size: 18px;
`;

const Span = styled.span`
  font-weight: bold;
`;

const P = styled.p`
  color: blue;
  font-size: 12px;
  
`;
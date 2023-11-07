import React, { useContext, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { Avatar } from '@mui/material';
import { onSnapshot, doc } from 'firebase/firestore';
import { db } from '../firebase';
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';


const Chats2 = () => {
  const [chats, setChats] = useState([]);

  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "messages", currentUser.uid), (doc) => {
        const data = doc.data();
        if (data) {
          setChats(data);
        }
      });
      return () => {
        unsub();
      };
    };
    if (currentUser?.uid) {
      getChats();
    }
  }, [currentUser]);

  console.log(Object.entries(chats));

  const handleSelect = (u)=>{
    dispatch({type:"CHANGE_USER", payload:u})
  }

  return (
    <Container className="Chat2">
      {Object.entries(chats)?.sort((a,b)=>b[1].data - a[1].date).map((chat) => (
        <UserChat className="UserChat" key={chat[0]}  onClick={()=>handleSelect(chat[1].userInfo)}>
          <Avatar src={chat[1].userInfo.photoURL} />
          <UserChatInfo className="UserChatInfo">
            <Span>{chat[1].userInfo.displayName}</Span>
            <P>{chat[1].lastMessage?.text}</P>
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
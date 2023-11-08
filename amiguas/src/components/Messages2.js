import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { ChatContext } from '../context/ChatContext';
import { collection, query, orderBy, onSnapshot, doc } from 'firebase/firestore';
import { db } from '../firebase';
import Message2 from './Message2';

const Messages2 = () => {
  const [messages, setMessages] = useState([]);
  const { data } = useContext(ChatContext);

  useEffect(() => {
    const unSub = onSnapshot(
      collection(db, "chats", data.chatId), // Utiliza 'collection' para referenciar la colección
      (querySnapshot) => {
        const messageData = [];
        querySnapshot.forEach((doc) => {
          messageData.push(doc.data());
        });
        setMessages(messageData);
      }
    );

    return () => {
      unSub();
    };
  }, [data.chatId]);

  return (
    <Container className="Messages2">
      <div className="container">
        {messages.map((message, index) => (
          <Message2 key={index} message={message} />
        ))}
      </div>
    </Container>
  );
};

export default Messages2;


const Container = styled.div`
    background-color: #f0f0f0; // Corrige el color de fondo
    padding: 10px;
    height: calc(100% - 110px);
    overflow: scroll;
`;

import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { ChatContext } from '../context/ChatContext';
import { collection, query, orderBy, onSnapshot, doc } from 'firebase/firestore';
import { db } from '../firebase';
import Message2 from './Message2'

const Messages2 = () => {
  const [messages, setMessages] = useState([]);
  const { data } = useContext(ChatContext);

  useEffect(() => {
    const unSub = onSnapshot(doc(db,"chats",data.chatId), (doc)=>{
      doc.exists() && setMessages(doc.data().messages);
    });

    return () => {
      unSub();
    };
  }, []);

  return (
    <Container className="Messages2">
      <div className='container'>
        {messages.map((message, index) => ( // Mapea los mensajes
          <Message2 key={index} message={message} /> // Pasa cada mensaje como una propiedad
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

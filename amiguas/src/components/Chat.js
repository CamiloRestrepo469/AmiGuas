import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  where,
} from 'firebase/firestore';
import { db } from '../firebase';
import SendIcon from '@mui/icons-material/Send';

const Chat = ({ user }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const lastMessageRef = useRef(null);

  const handleNewMessageChange = (event) => {
    setNewMessage(event.target.value);
  };

  const messageRef = collection(db, 'messages');
  const userQuery = query(
    messageRef,
    where('user', '==', user?.displayName),
    orderBy('createdAt')
  );

  const handleSendMessage = async () => {
    try {
      if (newMessage.trim() !== '') {
        const newDocRef = await addDoc(messageRef, {
          text: newMessage,
          createdAt: serverTimestamp(),
          user: user?.displayName,
        });

        setNewMessage('');
        return newDocRef;
      }
    } catch (error) {
      console.error('Error al enviar el mensaje:', error);
    }
  };

  useEffect(() => {
    const unsubscribe = onSnapshot(userQuery, (querySnapshot) => {
      const updatedMessages = [];
      querySnapshot.forEach((doc) => {
        updatedMessages.push({ id: doc.id, ...doc.data() });
      });
      setMessages(updatedMessages);
    });

    return unsubscribe;
  }, [userQuery]);

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <Container>
      <ChatForm>
        <div style={{ height: '300px', overflowY: 'scroll', width: '98%' }}>
          {messages.map((message, index) => (
            <Message
              key={index}
              ref={index === messages.length - 1 ? lastMessageRef : null}
            >
              <MessageUser>{message.user}</MessageUser>
              <MessageText>{message.text}</MessageText>
              <MessageTime>
                {message.createdAt &&
                  new Date(message.createdAt.seconds * 1000).toLocaleTimeString(
                    'es'
                  )}
              </MessageTime>
            </Message>
          ))}
        </div>
        <FormComponent>
          <input
            type="text"
            placeholder="Escribe un mensaje..."
            value={newMessage}
            onChange={handleNewMessageChange}
          />
          <button type="button" onClick={handleSendMessage}>
            <SendIcon />
          </button>
        </FormComponent>
      </ChatForm>
    </Container>
  );
};

export default Chat;


const Container = styled.div`
  position: fixed;
  z-index: 999;
  
  width: 100vw;
  background-color: rgba(100, 100, 100, 1);
  // background-color: red;
  height: 100vh;
  top: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  overflow: hidden;

  @media (max-width: 1200) {
    background-color: blue;
  }

  @media (max-width: 900) {
    background-color: red;
  }
`;

const ChatForm = styled.div`
  width: 50%;
  box-shadow: 1px 1px 5px rgba(145, 145, 145, 0.6), 0px -1px 5px rgba(145, 145, 145, 0.4);
  display: flex;
  flex-direction: column;
  bottom: 0;
  margin: 0px 0px 0 50px;
  align-items: flex-end;
  background-color: #f0f0f0;
  border-radius: 10px;
  overflow: hidden;

  @media (max-width: 990px) {
    width: 50%;
    margin: 50% 1px 0% 20%;
  }
`;

const FormComponent = styled.div`
  width: 100%;
  display: flex;
  bottom: 0;
  flex-direction: row;
  align-items: left;
  padding: 1px 4px 5px 5px;
  margin: 20px 0px 0 0px;
  align-items: flex-end;
  background-color: #fff;
  overflow: hidden;
  border: none;

  input {
    display: flex;
    flex-direction: column;
    margin: 1px;
    width: 100%;
    padding: 8px;
    border-radius: 12px;
    border: 1px solid #f0f0f0;
    outline: none;
    font-size: 14px;

    &:hover {
      background: rgba(0, 0, 0, 0.1);
    }
  }

  .MuiSvgIcon-root {
    margin: 10px;
    font-size: 10px;
    color: red;

    &:hover {
      background: rgba(0, 0, 0, 0.1);
    }
  }
`;

const Message = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${(props) => (props.isUserMessage ? 'flex-end' : 'flex-start')};
  margin: 5px;

  .user-message {
    background-color: #92D2F7;
    color: red;
    align-self: flex-end;
  }

  .other-message {
    background-color: #fff;
    color: blue;
    align-self: flex-start;
  }
`;

const MessageText = styled.div`
  box-shadow: 1px 1px 5px rgba(145, 145, 145, 0.6), 0px -1px 5px rgba(145, 145, 145, 0.4);
  width: auto;
  max-width: 40%;
  display: flex;
  flex-direction: column;
  border-radius: 15px;
  overflow-x: hidden;
  left: 0;
  background-color: #fff;
  font-size: 18px;
  padding: 5px 10px;
  margin: 4px;
  word-wrap: break-word;
  white-space: pre-wrap;
`;

const MessageUser = styled.div`
  box-shadow: 1px 1px 5px rgba(145, 145, 145, 0.6), 0px -1px 5px rgba(145, 145, 145, 0.4);
  width: auto;
  max-width: 40%;
  display: flex;
  flex-direction: column;
  border-radius: 15px;
  overflow-x: hidden;
  background-color: #f0f0f0;
  font-size: 10px;
`;

const MessageTime = styled.div`
  box-shadow: 1px 1px 5px rgba(145, 145, 145, 0.6), 0px -1px 5px rgba(145, 145, 145, 0.4);
  width: auto;
  max-width: 40%;
  display: flex;
  flex-direction: column;
  border-radius: 15px;
  overflow-x: hidden;
  background-color: #f0f0f0;
  font-size: 8px;
  margin: 1px 15px 15px 5px;
`;

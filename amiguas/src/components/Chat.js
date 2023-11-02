import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../firebase';
import SendIcon from '@mui/icons-material/Send';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  //ultimo mensaje
  const lastMessageRef = useRef(null);


  const handleNewMessageChange = (event) => {
    setNewMessage(event.target.value);
  };

  const messageRef = collection(db, 'messages');
  const messageQuery = query(messageRef, orderBy('createdAt'));

  const handleSendMessage = async () => {
    if (newMessage.trim() !== '') {
      try {
        const newDocRef = await addDoc(messageRef, {
          text: newMessage,
          createdAt: serverTimestamp(),
          user: auth.currentUser.displayName,
        });
        setNewMessage('');
      } catch (error) {
        console.error('Error al enviar el mensaje:', error);
      }
    }
  };

  useEffect(() => {
    const unsubscribe = onSnapshot(messageQuery, (querySnapshot) => {
      const updatedMessages = [];
      querySnapshot.forEach((doc) => {
        updatedMessages.push({ id: doc.id, ...doc.data() });
      });
      setMessages(updatedMessages);
    });

    return unsubscribe;
  }, []);
  //este efecto me llama el ultimo mensaje siempre que abra la aplicacion
  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);
  

  return (
    <Container>
      <ChatForm>
        <div style={{ height: '300px', overflowY: 'scroll' }}>
          {messages.map((message, index) => (
            <Message
            key={index}
            ref={index === messages.length - 1 ? lastMessageRef : null}
            className={message.sender === 'user' ? 'user-message' : 'other-message'}
            isUserMessage={message.user === auth.currentUser.displayName}>
              <MessageUser>{message.user}</MessageUser>
              <MessageText>{message.text}</MessageText>
              <MessageTime>
                {message.createdAt &&
                  new Date(message.createdAt.seconds * 1000).toLocaleTimeString('es')}
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
          <button type='submit' onClick={handleSendMessage}><SendIcon /></button>
        </FormComponent>
      </ChatForm>
    </Container>
  );
};

export default Chat;


const Container = styled.div`
    position: absolute;
    width: 100vw;
    background-color: rgba(255, 255, 255, 0.7);
    height: 100vh;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: right;
    white-space: nowrap;
    overflow: hidden;
    margin-bottom: 15px;
    padding: 27% 25px 0 60%;
 

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
    margin: 20px 0px 0 0px;
    align-items: flex-end; 
    background-color: red;
    border-radius: 10px;
    overflow: hidden; 
    background: gold;


    @media (max-width: 1200px) {
        width: 100%;
        margin: 50% 10px 0% -20%;
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
    background-color: #f0f0f0;
    overflow: hidden;
    border: none; 

    input {
      display: flex; 
      flex-direction: column;
        margin: 1px;
        width: 100%;
        padding: 8px;
        border-radius: 12px;
        border: 1px solid  #f0f0f0;
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
    background-color: #3498DB;
    color: white;
    align-self: flex-end;
  }

  .other-message {
    background-color: #e0e0e0;
    color: #333;
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
  background-color: #f0f0f0;
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
  margin:  1px 15px 15px 5px;
`;
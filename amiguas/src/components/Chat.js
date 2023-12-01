import React, { useState, useEffect, useRef, useMemo, useContext } from 'react';
import styled from 'styled-components';
import CloseIcon from '@mui/icons-material/Close';
import { signOut } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import Homepa from '../pages/Home';
// Imports necesarios para trabajar con Firebase Firestore
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  where,
} from 'firebase/firestore';
import { auth, db } from '../firebase';
import SendIcon from '@mui/icons-material/Send';
import Homepages from '../pages/homepages';
import { AuthContext } from '../context/AuthContext';


// Componente funcional Chat que recibe un usuario como prop
const Chat = ({ user }) => {
   // Hook para la navegación de React Router
   const navigate = useNavigate();
   // Estado para controlar la apertura/cierre del chat
   const [isChatOpen, setIsChatOpen] = useState(false);
   // Estado para manejar los mensajes en el chat
   const [messages, setMessages] = useState([]);
   // Estado para almacenar el texto de un nuevo mensaje
   const [newMessage, setNewMessage] = useState('');
   // Referencia mutable para el último mensaje en la lista
   const lastMessageRef = useRef(null);

   const { currentUser } = useContext(AuthContext);
 
   // Manejador del cambio en el nuevo mensaje

  const handleNewMessageChange = (event) => {
    setNewMessage(event.target.value);
  };
    // Función para cerrar sesión y redirigir al usuario a la página principal
  const logout = async () => {
    await signOut(auth);
    navigate('/');
  }

    // Referencia a la colección 'messages' en Firestore
  const messageRef = collection(db, 'messages');
    // Query para obtener los mensajes de un usuario específico, ordenados por tiempo de creación
  const userQuery = useMemo(
    () =>
      query(
        messageRef,
        where('user', '==', user?.displayName),
        orderBy('createdAt')
      ),
    [messageRef, user?.displayName]
  );


    // Función para enviar un nuevo mensaje
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

  console.log("nuevo:", setNewMessage);

    // Efecto para suscribirse a cambios en los mensajes del usuario
  useEffect(() => {
    if (!userQuery) return; // No suscribirse si la consulta no está lista

    const unsubscribe = onSnapshot(userQuery, (querySnapshot) => {
      const updatedMessages = [];
      querySnapshot.forEach((doc) => {
        updatedMessages.push({ id: doc.id, ...doc.data() });
      });
      setMessages(updatedMessages);

      // Logging messages for debugging
        console.log("Messages:", updatedMessages); 
        console.log("Messages:", setMessages); 

    });

    return () => unsubscribe();
  }, [userQuery]);
  console.log(userQuery);

    // Efecto para hacer scroll al último mensaje cuando hay cambios en los mensajes
  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);
  console.log("State Messages:", messages); 

    // JSX que representa la interfaz del componente Chat
  return (
    <Container>

      <ChatForm>
        <ContainerLogin>
          <CloseIcon onClick={logout} />
        </ContainerLogin>

        <div style={{ height: '300px', overflowY: 'scroll' }}>
          {messages.map((message, index) => (
            <Message
              key={index}
              ref={index === messages.length - 1 ? lastMessageRef : null}
              className={message.user === currentUser?.displayName ? 'user-message' : 'other-message'}
            >
              <MessageUser>{message.user}hola</MessageUser>
              <MessageText>{message.text}como va</MessageText>
              <MessageTime>
                {message.createdAt &&
                  new Date(message.createdAt.seconds * 1000).toLocaleTimeString('en-US')}
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

// Estilos del componente Chat usando styled-components
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
  color: #fff;
  overflow: hidden;


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
    margin: 5px;
    padding: 0px;
    font-size: 15px;
    border: none;

    &:hover {
      background: rgba(0, 0, 0, 0.1);
    }
  }
`;

const Message = styled.div`
  display: flex;
  flex-direction: column;
  margin: 5px;

  .user-message {
    align-self: flex-end;
    background-color: red;
    color: red;
  }

  .other-message {
    align-self: flex-start;
    background-color: blue;
    color: blue;
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


const ContainerLogin = styled.div`
    .MuiSvgIcon-root {
      margin: 20px;
      font-size: 40px;
      color: #FFF;
      cursor: pointer;
      position: absolute;
      right: 0;
      top: 0;
      border: 3px solid #fff;
      border-radius: 50px;
  }

`;

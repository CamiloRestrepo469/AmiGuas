import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  const handleNewMessageChange = (event) => {
    setNewMessage(event.target.value);
  };

  const handleSendMessage = () => {
    if (newMessage.trim() !== '') {
      // En este punto, puedes enviar el mensaje a través de Firebase o cualquier otro método de comunicación.
      // Aquí, simplemente lo agregaremos a la lista de mensajes para mostrarlo en la interfaz.
      setMessages([...messages, { text: newMessage, sender: 'user' }]);
      setNewMessage('');
    }
  };

  useEffect(() => {
    // En un escenario real, aquí podrías suscribirte a eventos de mensajes entrantes y actualizar la lista de mensajes cuando lleguen nuevos mensajes.
  }, []);

  return (
    <Container>
      <ChatForm>

      <div style={{ height: '300px', overflowY: 'scroll' }}>
        {messages.map((message, index) => (
          <div key={index} className={message.sender === 'user' ? 'user-message' : 'other-message'}>
            {message.text}
          </div>
        ))}
      </div>
      <FormComponent>
      <input
        type="text"
        placeholder="Escribe un mensaje..."
        value={newMessage}
        onChange={handleNewMessageChange}
      />
      <button onClick={handleSendMessage}>Enviar</button>
      </FormComponent>
      </ChatForm>
    </Container>
  );
};

export default Chat;

const Container = styled.div`
    position: absolute;
    width: 100vw;
    // background-color: rgba(255, 255, 255, 0.7);
    background-color: red;
    height: 100vh;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const ChatForm = styled.div`
    width: 55%;
    height: 70%;
    max-widht: 400px;
    box-shadow: 1px 1px 5px rgba(145, 145, 145, 0.6), 0px -1px 5px rgba(145, 145, 145, 0.4);
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #f0f0f0;
    border-radius: 10px;
    align-items: center;

    @media (max-width: 1200px) {
        width: 60%;
    }
`;


const FormComponent = styled.div`
    width: 90%;
    display: flex; 
    flex-direction: column;
    align-items: center;
    padding-bottom: 0px;
    background-color: blue;

    input {
        margin-top: 10px;
        width: 70%;
        padding: 8px;
        border-radius: 12px;
        border: 1px solid #cfcfcf;
        outline: none;
        font-size: 14px;

        &:hover {
            background: rgba(0, 0, 0, 0.2);    
        }
    }

    .MuiSvgIcon-root {
        margin-top: 20px;
        font-size: 70px;
        color: #8ac926;
    }
`;
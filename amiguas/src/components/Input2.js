import React, { useContext, useState } from 'react';
import { styled } from 'styled-components';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import ImageIcon from '@mui/icons-material/Image';
import { v4 as uuid} from 'uuid';
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';
import {
  Timestamp,
  arrayUnion,
  updateDoc,
  doc,
  serverTimestamp,
} from 'firebase/firestore'; // Importa las funciones de Firestore adecuadas
import { db } from '../firebase'; // Importa el objeto 'storage' desde Firebase
import { store } from '../firebase';

const Input2 = () => {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);
  const [downloadURL, setDownloadURL] = useState(""); // Agrega un estado para downloadURL

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const handleSend = async () => {
    if (typeof text !== 'string') {
      console.error('El valor de "text" no es una cadena:', text);
      return;
    }

    if (img) {
      const storageRef = store.ref().child(uuid());
      const uploadTask = storageRef.put(img);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Manejo de progreso de carga
        },
        (error) => {
          // Manejo de errores
        },
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then(async (url) => {
            if (typeof url === 'string') { // Asegúrate de que downloadURL sea una cadena
              setDownloadURL(url); // Establece el valor de downloadURL
              await updateDoc(doc(db, "chats", data.chatId), {
                messages: arrayUnion({
                  id: uuid(),
                  text,
                  senderId: currentUser.uid,
                  date: Timestamp.now(),
                  img: url, // Usa la variable url
                }),
              });
            } else {
              console.error('El valor de "downloadURL" no es una cadena:', url);
            }
          });
        }
      );
    } else {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });
    }

    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatId + ".lastMessage"]: {
        text
      },
      [data.chatId + "date"]: serverTimestamp(),
    });

    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastMessage"]: {
        text
      },
      [data.chatId + "date"]: serverTimestamp(),
    });

    setText("");
    setImg(null);
  };
    

  return (
    <Container className="Input2">
      <input
        type="text"
        placeholder="Mensaje nuevo..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <IconInput>
        <Stack direction="row" spacing={3}>
          <AttachFileIcon />
          <input
            type="file"
            style={{ display: 'none' }}
            id="file"
            onChange={(e) => setImg(e.target.files[0])}
          />
          <label htmlFor="file">
            <ImageIcon />
          </label>
          <SendIcon onClick={handleSend} />
        </Stack>
      </IconInput>
    </Container>
  );
}

export default Input2;

const Container = styled.div`
  color: blue;
  height: 60px;
  background-color: #FFF;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;

   input {
    width: 100%;
    border: none;
    outline: none;
    color: #2f2d52;
    font-size: 18px;

    &::placeholder {
      color: #cfcfcf;
    }
   }
`;

const IconInput = styled.div`
  .MuiSvgIcon-root {
    font-size: 25px;
    transition: color 0.3s;
    cursor: pointer;
    display: flex;
    align-items: center;
  }
`;

import React, { useContext, useState } from 'react';
import { styled } from 'styled-components';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import ImageIcon from '@mui/icons-material/Image';
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';
import { Timestamp, arrayUnion, updateDoc, doc, } from 'firebase/firestore';
import { db, store } from '../firebase';
import { v4 as uuid } from 'uuid';
import { getDownloadURL, uploadBytesResumable, getStorage, ref } from 'firebase/storage'; // Importa 'ref' desde Firebase Storage

const Input2 = () => {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const handleSend = async () => {
    if (img) {
      const storageRef = ref(store, uuid()); // Inicializa 'storageRef' correctamente
      const uploadTask = uploadBytesResumable(storageRef, img); // Inicializa 'uploadTask' correctamente

      uploadTask.on(
        (error) => {
          // Manejo de errores
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(db, "messages", data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                img: downloadURL,
              }),
            });
          });
        }
      );
    } else {
      await updateDoc(doc(db, "messages", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });
    }
  };

  return (
    <Container className="Input2">
      <input
        type='text'
        placeholder='Mensaje nuevo...'
        value={text} // Usar 'value' en lugar de 'onChange' para mostrar el texto
        onChange={(e) => setText(e.target.value)}
      />
      <IconInput>
        <Stack direction="row" spacing={3}>
          <AttachFileIcon />
          <input
            type='file'
            style={{ display: 'none' }}
            id='file'
            onChange={(e) => setImg(e.target.files[0])}
          />
          <label htmlFor='file'>
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

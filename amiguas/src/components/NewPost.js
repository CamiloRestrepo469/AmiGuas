import React, { useState, useEffect } from 'react';
import { Avatar } from '@mui/material';
import styled from 'styled-components';
import ImageIcon from '@mui/icons-material/Image';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import { addDoc, serverTimestamp,collection, query, where, getDocs  } from 'firebase/firestore';
import { db } from '../firebase';
import { auth } from '../firebase';
import Post from './Post';
import { uploadFile } from '../firebase';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';


const NewPost = () => {



    const [userName, setUserName] = useState('');
    const [showInput, setShowInput] = useState(false);

    const [postText, setPostText] = useState('');
    const [postImage, setPostImage] = useState('');

    const [File, setFile] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);

    //usuario

    const [userProfile, setUserProfile] = useState(null);

    // useEffect(() => {
    //     const user = auth.currentUser;
    //     if (user) {
    //         const displayName = user.displayName;
    //         const photoURL = user.photoURL;
    //         const phoneNumber = user.phoneNumber;

    //         setUserProfile({ displayName, photoURL, phoneNumber });
    //     }
    // }, []);

    useEffect(() => {
        const getUserProfile = async () => {
          const user = auth.currentUser;
          if (user) {
            const userId = user.uid;
            const usersRef = collection(db, 'users');
            const q = query(usersRef, where('userId', '==', userId));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
              setUserProfile(doc.data());
            });
          }
        };
    
        getUserProfile();
      }, []);

    function renderUserProfile() {
        if (userProfile) {
            const userProfileData = [
                <h3>Bienvenido, {userProfile.displayName}</h3>,
                <Avatar src='https://media.istockphoto.com/id/1209807747/es/foto/fondo-tecnol%C3%B3gico-en-color-azul-tel%C3%B3n-de-fondo-de-tecnolog%C3%ADa-futurista-renderizado-3d.webp?s=2048x2048&w=is&k=20&c=MoITMaf1eHoxuzsMD4r9TH9Eda-w_cFUN1WJ1wuBzX4=' />,
                <input
                    onClick={() => setShowInput(true)}
                    type="text"
                    placeholder={`¿Qué estás pensando, ${userProfile.displayName}?`}
                    onChange={(e) => setPostText(e.target.value)}
                    value={postText}
                />,
            ];
            return userProfileData.map((data, index) => (
                <p key={index}
                >{data}</p>
            ));
        } else {
            return <p>No se han cargado los datos del usuario.</p>;
        }
    }
 
    //subir archivos 
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await uploadFile(File);
            console.log(result);
            if (result) {
                setImageUrl(result);
            } else {
                alert('La imagen no se ha subido correctamente.');
            }
        } catch (error) {
            console.error(error);
            alert('Fallo interno. Intente mas tarde');
        };
    };

    //crear post
    const createPost = async () => {
        try {
            if (!postText || !imageUrl) {
                // Si postText o postImage están vacíos, muestra un mensaje de error al usuario.
                alert('Los campos Texto y campo Imagen no pueden estar vacíos');
                // Sale de la función sin agregar el documento.
                return;
            }
            const collectionRef = collection(db, 'posts');

            const docRef = await addDoc(collectionRef, {
                imgProfile: 'https://media.istockphoto.com/id/1209807747/es/foto/fondo-tecnol%C3%B3gico-en-color-azul-tel%C3%B3n-de-fondo-de-tecnolog%C3%ADa-futurista-renderizado-3d.webp?s=2048x2048&w=is&k=20&c=MoITMaf1eHoxuzsMD4r9TH9Eda-w_cFUN1WJ1wuBzX4=',
                name: 'uno',
                postText: postText,
                postImage: postImage,
                timeStamp: serverTimestamp(),
                imageUrl: imageUrl,
            });
            console.log("ID del documento agregado:", docRef.id);
            setPostText('');
            setPostImage('');
            imageUrl('');
        } catch (error) {
            console.log('Error al agregar el documento', error);
            // Puedes mostrar un mensaje de error al usuario aquí si lo prefieres.
            alert('Esta seguro que quiere publicarlo.');
        }
    };

    return (
        <Container>
            <InputText>
            
              {renderUserProfile()}       
            </InputText>
            {showInput && (
                <InputImage>
                    <ArrowDropUpIcon onClick={() => setShowInput(false)} />
                    <form onSubmit={handleSubmit}>
                        <input
                            type='file'
                            name=''
                            id='file'
                            onChange={e => setFile(e.target.files[0])}
                        />
                        <button ariant="contained" color="success">
                            Subir
                        </button>
                        <label htmlFor='file'>
                            <img src='' alt='otro forma'/>
                        </label>
                    </form>
                    <Stack direction="row" spacing={2}>
                        <StyledButton variant="contained" onClick={createPost}>
                            <SendIcon />

                        </StyledButton>
                    </Stack>
                </InputImage>
            )}
            <InputImage>
                {/* {imageUrl && <Post imageUrl={imageUrl} />} */}
            </InputImage>

        </Container>
    );
}

export default NewPost;

const Container = styled.div`
    width: 80%;
    color: #FFFF;
    background-color: #f0f0f0;
    margin-top: 20px;
    border-radius: 10px; 
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 15px 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    @media (max-width: 1200px) {
        width: 95%;
        height: auto;
    }
`;

const InputText = styled.div`
    position: flex;
    flex-direction: row;
    width: 100%;

    .MuiAvatar-root {
        width: 45px;
        height: 45px;
        position: relative;
        top: 45px;
        margin-left: 20px;  

        @media (max-width: 1200px) {
            color: black;
        }
    }
    
    input {
        background-color: #cfcfcf;
        width: 70%;
        height: 45px;
        margin-left: 80px;
        border-radius: 25px;
        font-size: 18px;
        padding: 10px;
        border: none;
        outline: none;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;

        @media (max-width: 1200px) {
            width: 80%;
            height: 45px;
            font-size: 14px;
        }
    }

    h3 {
        font-size: 18px;
        color: red;
        position: relative;
        top: -50; 
        left: 0;
        /* Centra verticalmente el contenido */
        text-align: center; /* Centra horizontalmente el texto */
        width: 100%;  
    }
`;



const InputImage = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-direction: column;

    .MuiSvgIcon-root {
        font-size: 20px;
        color: green;
        margin: 10px;
        cursor: pointer;
    }

    input {
        background-color: #cfcfcf;
        width: 75%;
        height: 45px;
        margin-left: 10px;
        border-radius: 25px;
        font-size: 18px;
        padding: 10px;
        border: none;
        outline: none;
        margin: 1em;

        @media (max-width: 1200px) {
            width: 50%;
            height: 45px;
            font-size: 14px;
        }
    }
`;

const StyledButtonRed = styled(Button)`
    && {
        background-color: #FF5733;
        width: 65%;
        height: 65%;
        margin-top: 25px;
        border-radius: 15px;
        border: none;
        cursor: pointer;

        .MuiSvgIcon-root {
            font-size: 30px;
            color: #FFFF;
        }

        &:hover {
            background-color: #FF9999;
            border: none;
        }

        &:hover::before {
            content: 'Eliminar';
            position: absolute;
            top: -20px;
            left: 0;
            width: 100%;
            height: 49%%;
            text-align: center;
            font-size: 10px;
            color: red;
            border-radius: 10px;
            background-color: rgba(0, 0, 0, 0.2);
            
        }

        @media (max-width: 1200px) {
            width: 55%;
            height: 55%;
            font-size: 15px;
            border-radius: 50px;
            display: flex;
            flex-direction: column;
            align-items: center;

            .MuiSvgIcon-root {
                font-size: 20px;
                color: #FFFF;
            }

            &:hover {
                background-color: #FF9999;
                border: none;
            }

            &:hover::before {
                content: 'Eliminar';
                position: absolute;
                top: -20px;
                left: 0;
                width: 100%;
                text-align: center;
                font-size: 9px;
                color: red;
                border-radius: 10px;
                background-color: rgba(0, 0, 0, 0.2);
            }
        }
    }
`;

const StyledButton = styled(Button)`
    && {
        background-color: #3498DB;
        width: 65%;
        height: 65%;
        margin-lef: 5px;
        border-radius: 15px;
        cursor: pointer;
        position: relative;
        margin-left: -100px; 

        .MuiSvgIcon-root {
            font-size: 30px;
            color: #FFFF;
        }

        &:hover {
            background-color: #7587d9;
            border: none;
        }

        &:hover::before {
            content: 'Publicar';
            position: absolute;
            top: -20px; 
            left: 0;
            width: 100%;
            text-align: center;
            font-size: 10px;
            color: blue;
            border-radius: 10px;
            background-color: rgba(0, 0, 0, 0.2);
        }

        @media (max-width: 1200px) {
            width: 55%;
            height: 55%;
            font-size: 15px;
            border-radius: 50px;
            display: flex;
            flex-direction: column;
            align-items: center;

            .MuiSvgIcon-root {
                font-size: 20px;
            }

            &:hover {
                background-color: #7587d9;
                border: none;
            }

            &:hover::before {
                content: 'Publicar';
                position: absolute;
                top: -20px; // Ajusta la posición vertical como desees
                left: 0;
                width: 100%;
                text-align: center;
                font-size: 9px;
                color: blue;
                border-radius: 10px;
                background-color: rgba(0, 0, 0, 0.2);
            }
        }
    }
`;

const VisuallyHiddenInput = styled('input')`
    clip: 'rect(0 0 0 0)';
    clipPath: 'inset(50%)';
    height: 2;
    overflow: 'hidden';
    position: 'absolute';
    bottom: 0;
    left: 10;
    whiteSpace: 'nowrap';
    width: 1;
    background-color: red;

    

`;
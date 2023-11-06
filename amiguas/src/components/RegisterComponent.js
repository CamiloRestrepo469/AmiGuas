import React, { useState } from 'react';
import styled from 'styled-components';
import CloseIcon from '@mui/icons-material/Close';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';
import { auth } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';
import Alert from '@mui/material/Alert';
import { uploadFile } from '../firebase';
import { createUserWithEmailAndPassword, updateProfile, updatePhoneNumber } from 'firebase/auth';
import { uploadBytesResumable } from 'firebase/storage';


const RegisterComponent = ({ setopenRegister }) => {
  const [nombreCompleto, setNombreCompleto] = useState('');
  const [alias, setAlias] = useState('');
  const [telefono, setTelefono] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [photoURL, setphotoURL] = useState('');

  const [nombreCompletoError, setNombreCompletoError] = useState('');
  const [aliasError, setAliasError] = useState('');
  const [telefonoError, setTelefonoError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [formError, setFormError] = useState('');

  const validateEmail = (email) => {
    const emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return passwordRegex.test(password);
  };

// Validar la entrada de teléfono en tiempo real
const handleTelefonoChange = (event) => {
  const input = event.target.value;
  if (/^\+?[0-9]{0,12}$/.test(input)) { // Se permite un signo '+' al inicio
    setTelefono(input);
    setTelefonoError('');
  } else {
    setTelefonoError('El número de teléfono es incorrecto, ejemplo +573213213232');
  }
};

  const registerFunction = async () => {
    setEmailError('');
    setPasswordError('');
    setFormError('');
    setNombreCompletoError('');
    setAliasError('');
    setTelefonoError('');

    if (nombreCompleto.length === 0) {
      setNombreCompletoError('El nombre completo es obligatorio');
      return;
    }

    if (alias.length === 0) {
      setAliasError('El alias es obligatorio');
      return;
    }

    if (telefono.length === 0) {
      setTelefonoError('El teléfono es obligatorio');
      return;
    }  

    if (email.length === 0) {
      setEmailError('El correo electrónico es obligatorio');
      return;
    }

    if (password.length === 0) {
      setPasswordError('La contraseña es obligatoria');
      return;
    }
    //-----validaciones-----------
    if (!validateEmail(email)) {
      setEmailError('Correo electrónico inválido debe de tener extension @gmail.com o @hotmail.com');
      return;
    }

    if (!validatePassword(password)) {
      setPasswordError('La contraseña debe contener al menos 8 caracteres, una mayúscula, una minúscula y un número');
      return;
    }


    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      // Guardar datos del usuario en la colección "users"
      const usersCollectionRef = collection(db, 'users');
      await addDoc(usersCollectionRef, {
        userId: user.uid,
        displayName: nombreCompleto,
        alias: alias,
        phoneNumber: telefono,
        email: email,
        photoURL: photoURL,
        // Otros campos que desees guardar
      });
  
      // Resto de tu código...
    } catch (error) {
      console.log(error.message);
    }
  };


  return (
    <Container>
      <RegisterForm>
        <HeaderRegister>
          <TitleForm>
            <h3>Regístrate</h3>
            <p>Es rápido y fácil</p>
          </TitleForm>
          <CloseIcon onClick={() => setopenRegister(false)} />
        </HeaderRegister>
        <FormComponent>
          <AccountCircleIcon />
          <input
            value={nombreCompleto}
            onChange={(event) => {
              setNombreCompleto(event.target.value);
              setNombreCompletoError('');
              setFormError('');
            }}
            type="text"
            placeholder="Nombre Pepito Perez"
          />
          <input
            value={alias}
            onChange={(event) => {
              setAlias(event.target.value);
              setAliasError('');
              setFormError('');
            }}
            type="text"
            placeholder="Alias, ejemplo PepitoP"
          />
          <input
            value={telefono}
            onChange={(event) => {
              setTelefono(event.target.value);
              setTelefonoError('');
              setFormError('');
            }}
            type="text"
            placeholder="Numero de telefono +573213213232"
          />

          <input
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
              setEmailError('');
              setFormError('');
            }}
            type="text"
            placeholder="Email pepitoperez@gmail.com"
          />
          <input
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
              setPasswordError('');
              setFormError('');
            }}
            type="password"
            placeholder="Contraseña PepitoPerez123"
          />
          <BtnSubmit>
            <Button variant="contained" onClick={registerFunction} color="success" endIcon={<SendIcon />}>
              Registrarse
            </Button>
          </BtnSubmit>
          {nombreCompletoError && <ErrorMessage>{nombreCompletoError}</ErrorMessage>}
          {aliasError && <ErrorMessage>{aliasError}</ErrorMessage>}
          {telefonoError && <ErrorMessage>{telefonoError}</ErrorMessage>}
          {formError && <ErrorMessage>{formError}</ErrorMessage>}
          {emailError && <ErrorMessage>{emailError}</ErrorMessage>}
          {passwordError && <ErrorMessage>{passwordError}</ErrorMessage>}
        </FormComponent>
      </RegisterForm>
    </Container>
  );
};

export default RegisterComponent;

const ErrorMessage = styled.p`
    width: 70%;
    max-width: 450px;
    box-shadow: 1px 1px 5px rgba(145, 145, 145, 0.6), 0px -1px 5px rgba(145, 145, 145, 0.4);
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: rgb(111, 161, 255);
    border-radius: 10px;
    color: #000; 
    font-size: 16px;
    margin-top: 10px;
`;

const Container = styled.div`
    position: absolute;
    width: 100vw;
    background-color: rgba(255, 255, 255, 0.7);
    height: 100vh;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const RegisterForm = styled.div`
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

const HeaderRegister = styled.div`
    width: 90%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 15px 0;
    justefy-content: space-between;
    border-bottom: 1px solid #cfcfcf;

    .MuiSvgIcon-root {
        margin-top: 20px;
        font-size: 30px;
        color: #3964bf;
        cursor: pointer;
    }
`;



const FormComponent = styled.div`
    width: 90%;
    display: flex;
    height: 100vh; 
    flex-direction: column;
    align-items: center;
    padding-bottom: 0px;

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

const TitleForm = styled.div`
    h3 {
        font-size: 30px;
    }

    p {
        font-size: 20px;
        color: #828282;
    }
`;

const BtnSubmit = styled.div`
    width: 90%;
    padding: 10px 0;
    margin-top: 20px;
    text-align: center;
    border-radius: 10px;
    // cambiar el color 
    // background-color: ${props => props.color}

    .MuiSvgIcon-root {
        margin-top: 0px;
        font-size: 25px;
        color: #FFF;
    }
`;

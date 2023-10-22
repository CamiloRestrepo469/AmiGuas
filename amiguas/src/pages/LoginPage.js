import React , { useState } from "react";
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import { styled } from "styled-components"; // Cambiado "styled-components" a "styled"
import logo from '../assets/img/amiGuas.png';
import { Avatar } from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';
import RegisterComponent from '../components/RegisterComponent';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

const LoginPage = () => {

    const [openRegister, setopenRegister] = useState(false);

    const [loginEmail, setloginEmail] = useState('');
    const [loginPassword, setloginPassword] = useState('');

    const [loginError, setLoginError] = useState(null);

    const loginFuntion = async () => {
        try {
            const user = await signInWithEmailAndPassword(
                auth,
                loginEmail,
                loginPassword

            );
            console.log(user);
        } catch (error) {
            console.log(error.message);
            setLoginError(error.message); 
        }
    }

    return (
        <Container>
            <LoginLeft>
                <img
                src={logo}
                alt="logo amigas"
                />
                <p>AmiGuas te ayuda a comunicarte y compartir con las personas que forman parte de tu vida.</p> {/* Corregido "persona" a "personas" */}
            </LoginLeft>
            <FormLogin>
                <FormComponent>
                    <AccountCircleIcon />
                    <input 
                    value={loginEmail}
                    onChange={(event) => {setloginEmail(event.target.value)}}
                    type="text"
                    placeholder="Correo Electrónico"
                      />    
                    <input
                    value={loginPassword}
                    onChange={(event) => {setloginPassword(event.target.value)}}
                    type="password" 
                    placeholder="Contraseña"/>
                    <BtnSubmit>
                        <Button onClick={loginFuntion} variant="contained" endIcon={<SendIcon />}>
                            Inicio Sesion
                        </Button>
                    </BtnSubmit>
                    <BtnSubmit >
                        <Button onClick={() => {setopenRegister(true)}} variant="contained" color="success" endIcon={<PersonIcon />}>
                            Crear Nueva Cuenta
                        </Button>
                    </BtnSubmit>
                    {loginError &&
                     <ErrorMessage>
                        "Usuario o contraseña incorrectos"
                     </ErrorMessage>
                     }          
                </FormComponent>
            </FormLogin>
            {openRegister &&
                <RegisterComponent
                setopenRegister={setopenRegister}/>
            }       
        </Container>
    )
}

export default LoginPage

const Container = styled.div`
    width: 90vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const LoginLeft = styled.div`
    width: 40%;
    height: 60%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0 35px;

    img {
        width: 20em;
        display: block; 
        margin: 0 auto; 
    }
    

    p {
        font-size: 25px;
        font-weight: 400;
        padding-top: 25px;
    }

    @media (max-width: 1500px) {
        width: 50%;
    }

    @media (max-width: 1200px) {
        display: none;
    }
`;

const FormLogin = styled.div`
    width: 35%;
    max-width: 450px;
    height: 59%;
    box-shadow: 1px 1px 5px rgba(145, 145, 145, 0.6), 0px -1px 5px rgba(145, 145, 145, 0.4);
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #f0f0f0;
    border-radius: 10px;

    @media (max-width: 1500px) {
        width: 70%;
    }

    @media (max-width: 1200px) {
        width: 70%;
        max-width: 400px;
    }
`;


const FormComponent = styled.div`
    width: 90%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 0px;

    input {
        margin-top: 30px;
        width: 90%;
        padding: 15px;
        border-radius: 15px;
        border: 1px solid #cfcfcf;
        outline: none;
        font-size: 14px;

        &:hover {
            background: rgba(0, 0, 0, 0.2);    
        }
    }
    .MuiSvgIcon-root {
        margin-top: 50px;
        font-size: 90px;
        color: #3964bf;
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

const ErrorMessage = styled.p`
    width: 70%;
    max-width: 450px;
    height: auto;
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
import React , { useState } from 'react';
import styled from 'styled-components';
import CloseIcon from '@mui/icons-material/Close';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';
import { auth  } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';

const RegisterComponent = ({setopenRegister}) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const registerFunction = async () => {
        try {
            const user = await createUserWithEmailAndPassword(auth, 
                email, password);
            console.log(user);

        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <Container>
           <RegisterForm>
            <HeaderRegister>
                <TitleForm>
                    <h3>Registrate</h3>
                    <p>Es rapido y facil</p>
                </TitleForm>
                <CloseIcon onClick={() => setopenRegister(false)} />
            </HeaderRegister>
            <FormComponent>
            <AccountCircleIcon />
                    <input 
                    value={email}
                    onChange={(event) => {setEmail(event.target.value)}}
                    type="text" 
                    placeholder="Correo Electrónico" 
                    />    
                    <input 
                    value={password}
                    onChange={(event) => {setPassword(event.target.value)}}
                    type="password" 
                    placeholder="Contraseña"
                    />
                    <BtnSubmit>
                        <Button variant="contained" onClick={registerFunction} color="success" endIcon={<SendIcon />}>
                            Registrarse
                        </Button>
                    </BtnSubmit>
            </FormComponent>
           </RegisterForm>
        </Container>
    )
}

export default RegisterComponent;

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
    height: 59%;
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

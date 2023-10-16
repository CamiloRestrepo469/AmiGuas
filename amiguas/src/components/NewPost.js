import React, { useState } from 'react';
import { Avatar } from '@mui/material';
import styled from 'styled-components';
import ImageIcon from '@mui/icons-material/Image';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';

const NewPost = () => {
    const [showInput, setShowInput] = useState(false);

    return (
        <Container>
            <InputText>
                <Avatar />
                <input
                    onClick={() => setShowInput(true)}
                    type='text'
                    placeholder='¿Qué estás pensando?'
                />
            </InputText>

            {showInput && (
                <InputImage>
                    <ImageIcon />
                    <input
                        type='text'
                        placeholder='Agregar Imagen'
                    />
                    <ArrowDropUpIcon onClick={() => setShowInput(false)} />
                </InputImage>
            )}

            <Stack direction="row" spacing={2}>
                <StyledButtonRed variant="outlined">
                    <DeleteIcon />
                </StyledButtonRed>
                <StyledButton variant="contained">
                    <SendIcon />
                </StyledButton>
            </Stack>
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

    @media (max-width: 1200px) {
        width: 95%;
        height: auto;
    }
`;

const InputText = styled.div`
    display: flex;
    width: 100%;

    .MuiAvatar-root {
        width: 45px;
        height: 45px;

        @media (max-width: 1200px) {
           color: black;
        }
    }
    
    input {
        background-color: #cfcfcf;
        width: 90%;
        height: 45px;
        margin-left: 10px;
        border-radius: 25px;
        font-size: 18px;
        padding: 10px;
        border: none;
        outline: none;

        @media (max-width: 1200px) {
            width: 80%;
            height: 45px;
            font-size: 14px;
        }
    }
`;

const InputImage = styled.div`
    width: 100%;
    display: flex;
    margin-top: 20px;
    align-items: center;
    justify-content: space-around;

    .MuiSvgIcon-root {
        font-size: 20px;
        color: green;
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

        @media (max-width: 1200px) {
            width: 70%;
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
            text-align: center;
            font-size: 12px;
            color: #000;
            border: none;
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
                font-size: 10px;
                color: #000;
            }
        }
    }
`;

const StyledButton = styled(Button)`
    && {
        background-color: #3498DB;
        width: 65%;
        height: 65%;
        margin-top: 25px;
        border-radius: 15px;
        cursor: pointer;
        position: relative;

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
            font-size: 12px;
            color: #000;
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
                font-size: 10px;
                color: #000;
            }
        }
    }
`;

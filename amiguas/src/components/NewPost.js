import React, { useState } from 'react';
import { Avatar } from '@mui/material';
import styled from 'styled-components';
import ImageIcon from '@mui/icons-material/Image';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

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
            
            <BtnSubmit>
                Publicar
            </BtnSubmit>
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
        display: flex;
        flex-direction: column;
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

const BtnSubmit = styled.div`
    background-color: #1c36ad;
    width: 90%;
    margin-top: 20px;
    border-radius: 15px;
    font-size: 18px;
    padding: 10px 0;
    border: none;
    cursor: pointer;
    font-weight: 600;
    text-align: center;
    
    :hover {
        background-color: red; 
    }

    @media (max-width: 1200px) {
        width: 50%;
        height: 45px;
        font-size: 15px;
        :hover {
            background-color: #7587d9; 
        }
    }
`;



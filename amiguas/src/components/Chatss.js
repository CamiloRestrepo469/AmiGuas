import React, { useState, useRef } from 'react';
import styled from '@emotion/styled';
import Cookies from 'universal-cookie';
import Chat from './Chat';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import SearchIcon from '@mui/icons-material/Search';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ListItem from './ListItem';
import ImgStory from '../ImageStore';
import Alert from '@mui/material/Alert';
import handleSendMessage from './Chat';
import setUser from '../App'

const cookies = new Cookies();

const Chatss = () => {
    const [room, setRoom] = useState('');


    const roomInputRef = useRef();

    return (
        <Container>
            <ChatForm>
            {room ? (
                <Chat />
             ) : (
                <FormComponent className='room'>
                    <label>
                        entre el Chat
                    </label>
                    <input
                    ref={roomInputRef}
                        // onChange={(e) => setRoom(e.target.value)} 
                    />
                    <button onClick={() => setRoom(roomInputRef.current.value)}>
                        entre al Chat
                    </button>
                </FormComponent>
             )}
             </ChatForm>
        </Container>
    );

}
export default Chatss;

const Container = styled.div`
    width: 100%;
    background-color: #f0f0f0;
    margin: 5px;
    display: flex;
    flex-direction: column;
    border-radius: 8px;
`;

const ChatForm = styled.div`
    width: 100%;
    height: 50vh;
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
    height: 50vh;
    flex-direction: column;
    align-items: center;
    padding-top: 110px;
    background-color: blue;

    input {
        margin: 10px;
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
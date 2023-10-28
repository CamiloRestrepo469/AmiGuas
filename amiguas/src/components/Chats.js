import React from 'react';
import styled from '@emotion/styled';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import SearchIcon from '@mui/icons-material/Search';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ListItem from './ListItem';
import ImgStory from '../ImageStore';
import Alert from '@mui/material/Alert';

const Chats = () => {
    return (
        <Container>
            <ChatHeader>
                <h3>Contactos</h3>
                <IconChat>
                    <VideoCallIcon />
                    <SearchIcon />
                    <MoreHorizIcon />
                </IconChat>
            </ChatHeader>
            {ImgStory.map((img, index) => (
                <ListItem
                    key={index}
                    avatar
                    img={img.imgProfile}
                    name={img.name}
                />
                
            ))}
        </Container>
    );
}

export default Chats;

const Container = styled.div`
    width: 100%;
    background-color: #f0f0f0;
    margin: 5px;
    display: flex;
    flex-direction: column;
    border-radius: 8px;
`;

const ChatHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 15px 10px;

    h3 {
        font-size: 24px;
        color: #6b6b6b;
    }
`;

const IconChat = styled.div`
    display: flex;
    align-items: center;
    padding: 0 5px;

    .MuiSvgIcon-root {
        font-size: 25px;
        color: #3964bf;
        cursor: pointer;
    }
`;

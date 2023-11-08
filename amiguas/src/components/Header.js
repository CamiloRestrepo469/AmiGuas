import React, { useState } from 'react';
import styled from 'styled-components';
import Search from '@mui/icons-material/Search';
import amiguas from '../assets/img/amiGuas.png';
import HomeIcon from '@mui/icons-material/Home';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import StorefrontIcon from '@mui/icons-material/Storefront';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import MessageIcon from '@mui/icons-material/Message';
import AppsIcon from '@mui/icons-material/Apps';
import { Avatar } from '@mui/material';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import Chat from './Chat';
import { db } from '../firebase';
import Home from '../pages/Home';



const Header = () => {

    const [isChatOpen, setIsChatOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);


    const handleChatIconClick = (user) => {
        setSelectedUser(user);
        setIsChatOpen(true);
    };

    const logout = async () => {
        await signOut(auth);
    }

    return (
        <Container>
            <HeaderLeft>
                <img src={amiguas} alt='el logo amiguas' />
                <InputSearch style={{display: 'none'}}>
                    <Search />
                    <input type='Search' placeholder='Buscar en AmiGuas' />
                </InputSearch>
            </HeaderLeft>
            <HeaderCenter>
                <IconCenter>
                    <HomeIcon />
                </IconCenter>
                <IconCenter>
                    <OndemandVideoIcon />
                </IconCenter>
                <IconCenter>
                    <StorefrontIcon />
                </IconCenter>
                <IconCenter>
                    <SupervisedUserCircleIcon />
                </IconCenter>
                <IconCenter>
                    <DashboardCustomizeIcon />
                </IconCenter>
                <IconCenterMenu>
                    <MenuIcon />
                </IconCenterMenu>
            </HeaderCenter>
            
            <HeaderRight>
                <IconRight style={{display: 'none'}}>
                    <AppsIcon />
                </IconRight>
                <IconRight>
                    <MessageIcon onClick={handleChatIconClick} />
                </IconRight>
                    {isChatOpen && <Home />}
                <IconRight style={{display: 'none'}}>
                    <NotificationsActiveIcon />
                </IconRight>
                <Avatar onClick={logout} />
            </HeaderRight>
        </Container>
    )
}

export default Header;

//estilos

const Container = styled.div`
    width: 100%;
    height: 4em;
    display: flex;
    position: sticky;
    top: 0;
    left: 0;
    z-index: 100;
    background: linear-gradient(to right, #FFF, #fff);
    border-image: linear-gradient(to right, #0ef, #fff);
    border-image-slice: 1;
    border-image-width: 0 0 3px 0; 
    border-image-outset: 0;
    padding: 0 10px;

    @media (max-width: 1200px) {
        width: 100%;
        height: 4em;  
    }
`;

const HeaderLeft = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 0.25;
    padding: 10px 15px 15px 10px;

    img {
        width: 50px;
        height: 50px;
    }
    :hover {
        background: linear-gradient(to right, #cfcfcf, #fff);
    }
`;

const InputSearch = styled.div`
    display: flex;
    align-items: center;
    margin-left: 20px;
    border: 3px solid #fff;
    border-radius: 25px;
    background-color: #cfcfcfc;
    padding: 0 8px;
    transition: background-color 0.3s;

    input {
        background-color: transparent;
        border: none;
        outline: none;
        margin-left: 10px;
        width: 100%;
        font-size: 13px;
    }

    @media (max-width: 1200px) {
        width: 40px;
        height: 40px;
        border: 2px solid #fff;

        input {
            display: none; 
        }
    }
`;


const HeaderCenter = styled.div`
    display: none;
    flex: 0.60;
    align-Items: center;
    justify-content: space-around;
    padding: 0 15px;

    @media (max-width: 990px) {
        justify-content: flex-start;
    }
`;

const IconCenter = styled.div`
    flex: 0.20;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;

    // Para ampliar los iconos del menú
    .MuiSvgIcon-root {
        font-size: 40px;
        transition: color 0.3s;
        cursor: pointer;
    }

    :hover {
        border-bottom: 5px solid #fff;
        color: #3964bf !important;
        cursor: pointer;
        font-size: 40px;
    }

    @media (max-width: 990px) {
        display: none;
    }
`;

const IconCenterMenu = styled(IconCenter)`
    display: none;

    @media (max-width: 990px) {
        display: flex;
    }
`;


const HeaderRight = styled.div`
    flex: 0.25;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 0 20px;

    .MuiAvatar-root {
        width: 40px;
        height: 40px;
        color: #000;
        
        &:hover {
            cursor: pointer;
        }
    }
`;

const IconRight = styled.div`
    width: 40px;
    height: 40px;
    background-color: #C0C0C0;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    margin-right: 15px;

    .MuiSvgIcon-root {
        font-size: 30px;
        cursor: pointer;   
    }

    .MuiSvgIcon-root {
        font-size: 30px;
        transition: color 0.3s;
        color: #6b6b6b;
    }
`;



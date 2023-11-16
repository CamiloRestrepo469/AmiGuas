import React, { useState } from 'react';
import styled from 'styled-components';
import Search from '@mui/icons-material/Search';
import amiguas from '../assets/img/anaranjasinfondo.png';
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
import CloseIcon from '@mui/icons-material/Close';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { Link } from 'react-router-dom';
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
                <Link to="/"> {/* Ajusta la ruta según tu configuración de rutas */}
                    <img
                        src={amiguas}
                        alt='el logo amiguas'
                    />
                </Link>
                <InputSearch >
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
                <IconRight style={{ display: 'none' }}>
                    <AppsIcon />
                </IconRight>
                <IconRight style={{ display: 'none' }}>
                    <MessageIcon onClick={handleChatIconClick} />
                </IconRight>
                {isChatOpen && <Home />}
                <IconRight >
                    <NotificationsActiveIcon />
                </IconRight>
                {/* <Avatar onClick={logout} /> */}
                <IconRight>
                    <CloseIcon onClick={logout} />
                </IconRight>
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
    // position: sticky;
    justify-content: space-between;

    top: 0;
    left: 0;
    z-index: 100;
    background: #FFF;
    border-image: #000;
    border-image-slice: 1;
    border-image-width: 0 0 3px 0; 
    border-image-outset: 0;
    border-bottom: 5px solid #92D2F7;
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
    cursor: pointer;

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
    padding: 0 15px;
    justify-content: space-between;   
    padding: 0 20px;


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
    align-items: right;
    justify-content: flex-end;
    padding: 0 20px;
    margin: 10px;

    .MuiAvatar-root {
        width: 46px;
        height: 46px;
        color: #000;
        
        &:hover {
            background-color: #ff6529;
            color: #FFF;
            cursor: pointer;
        }
    }
`;

const IconRight = styled.div`
    width: 46px;
    height: 46px;
    color: #000;
    background-color: #C0C0C0;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    margin-right: 15px;

    &:hover {
        background-color: #ff6529;
        color: #FFF;
        cursor: pointer;
    }
       

    .MuiSvgIcon-root {
        font-size: 30px;
        color: #000;
        cursor: pointer;   
        
        &:hover {
            color: #FFF;
            cursor: pointer;
        }

        

        
    }
`;



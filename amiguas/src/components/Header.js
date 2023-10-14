import React from 'react';
import styled from 'styled-components';
import Search from '@mui/icons-material/Search';
import amiguas from '../assets/img/logronegorconverde.png';
import HomeIcon from '@mui/icons-material/Home';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import StorefrontIcon from '@mui/icons-material/Storefront';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import MessageIcon from '@mui/icons-material/Message';
import ScreenShareIcon from '@mui/icons-material/ScreenShare';
import ShareIcon from '@mui/icons-material/Share';
import campana from '../assets/img/campana.png';
import compartir from '../assets/img/compartir.png';
import like from '../assets/img/like.png';
import message from '../assets/img/message.png';
import puntossuspenvios from '../assets/img/puntossuspenvios.png';
import menupuntos from '../assets/img/menupuntos.png';
import puntosM from '../assets/img/puntosM.png';
import AppsIcon from '@mui/icons-material/Apps';
import { Avatar } from '@mui/material';



const Header = () => {
    return (
        <Container>
            <HeaderLeft>
                <img src={amiguas} alt='el logo amiguas' />
                <InputSearch>
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
            {/* menu derecha */}
            <HeaderRight>
                <IconRight>
                <AppsIcon />
                    {/* <img src={puntosM} alt='puntos' /> */}
                </IconRight>
                <IconRight>
                    <MessageIcon />
                    {/* <img src={message} alt='menssage' /> */}

                </IconRight>
                <IconRight>
                    <NotificationsActiveIcon />
                    {/* <img src={campana} alt='campana' /> */}

                </IconRight>
                <Avatar />
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
    background: linear-gradient(to right, #0ef, #93C4A2); /* Gradiente de color desde verde a un tono más claro */
    border-bottom: 3px solid transparent; /* Borde inferior transparente inicialmente */
    padding: 0 10px; /* Agrega espaciado en los lados */

    @media (max-width: 1200px){
        background: linear-gradient(to right, #0ef, #fff); /* Cambio de gradiente para pantallas más pequeñas */
    }
`;




const HeaderLeft = styled.div`
    display: flex;
    align-items: center; /* Centrar verticalmente */
    justify-content: center; /* Centrar horizontalmente */
    flex: 0.25;
    padding: 1px 5px 5px 10px;

    img {
        width: 50px;
        height: 50px;
    }
`;

const InputSearch = styled.div`
    display: flex;
    align-items: center;
    margin-left: 10px;
    border: 3px solid black;
    border-radius: 25px;
    background-color: #cfcfcfc;
    padding: 0 8px;
    
    input {
        background-color: transparent;
        border: none;
        outline: none;
        margin-left: 5px;
        width: 100%;
        font-size: 13px;
    }

    @media (max-width: 1200px){
        width: 40px;
        height: 40px;
        border: 2px solid black;

        input{
            width: 0; /* Reducir el ancho para ocultar el input en pantallas más pequeñas */
            padding: 0;
            border: none;
        }
    }
`;


const HeaderCenter = styled.div`
    display: flex;
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
        transition: color 0.2s; /* Agrega una transición suave para el cambio de color */
    }
    
    :hover {
        border-bottom: 5px solid #ffff;
        
        .MuiSvgIcon-root {
            color: #ffff !important; /* Usa !important para aumentar la especificidad */
        }
    }

    @media (max-width: 990px){
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
    }
`;



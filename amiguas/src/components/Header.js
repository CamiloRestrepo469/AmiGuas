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
                <IconCenter>
                    <MenuIcon />
                </IconCenter>
            </HeaderCenter>
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
`;

const IconCenter = styled.div``;

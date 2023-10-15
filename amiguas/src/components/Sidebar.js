import styled from '@emotion/styled';
import ListItem  from './ListItem';
import React from 'react';
import PeopleIcon from '@mui/icons-material/People';
import GroupIcon from '@mui/icons-material/Group';
import StorefrontIcon from '@mui/icons-material/Storefront';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import HistoryIcon from '@mui/icons-material/History';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import FlagIcon from '@mui/icons-material/Flag';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const Sidebar = () => {
    return (
        <Container>
            <GroupList>
                <ListItem avatar
                img= 'https://media.istockphoto.com/id/1209807747/es/foto/fondo-tecnol%C3%B3gico-en-color-azul-tel%C3%B3n-de-fondo-de-tecnolog%C3%ADa-futurista-renderizado-3d.webp?s=2048x2048&w=is&k=20&c=MoITMaf1eHoxuzsMD4r9TH9Eda-w_cFUN1WJ1wuBzX4='
                name='Usuario'
                />
                <ListItem Icon={PeopleIcon} name='Amigos'/>
                <ListItem Icon={GroupIcon} name='Grupos'/>
                <ListItem Icon={StorefrontIcon} name='MarketPlace'/>
                <ListItem Icon={OndemandVideoIcon} name='Watch'/>
                <ListItem Icon={HistoryIcon} name='Recuerdos'/>
                <ListItem Icon={BookmarkIcon} name='Guardados'/>
                <ListItem Icon={FlagIcon} name='Paginas'/>
                <ListItem Icon={KeyboardArrowDownIcon} name='Ver'/>
            </GroupList>
        </Container>
    )   
}

export default Sidebar;

const Container = styled.div`
    position: sticky;
    top: 8vh;
    left: 0;
    background: linear-gradient(to right, #0ef, #fff);
    flex: 0.25;
    height: 100vh;

    @media (max-width: 1200px){
        flex: 0.10;
        padding: 0 1px;
        background: linear-gradient(to right, #0ef, #fff);

    }
`;

const GroupList = styled.div``;
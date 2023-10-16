import styled from '@emotion/styled';
import { motion } from "framer-motion";
import ListItem  from './ListItem';
import React, { useState } from 'react';
import PeopleIcon from '@mui/icons-material/People';
import GroupIcon from '@mui/icons-material/Group';
import StorefrontIcon from '@mui/icons-material/Storefront';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import HistoryIcon from '@mui/icons-material/History';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import FlagIcon from '@mui/icons-material/Flag';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import Diversity2Icon from '@mui/icons-material/Diversity2';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import CampaignIcon from '@mui/icons-material/Campaign';
import PublicIcon from '@mui/icons-material/Public';
import BloodtypeIcon from '@mui/icons-material/Bloodtype';
import VideogameAssetIcon from '@mui/icons-material/VideogameAsset';
import MessageIcon from '@mui/icons-material/Message';

const Sidebar = () => {
    const [showOptions, setShowOptions] = useState(false);

    const toggleOptions = () => {
        setShowOptions(!showOptions);
    };

    const options = [
        { Icon: CalendarMonthIcon , name: 'Eventos' },
        { Icon: ShowChartIcon , name: 'Administrador de anuncios' },
        { Icon: Diversity2Icon , name: 'Recaudacion de fondos' },
        { Icon: LocalActivityIcon , name: 'Actividad publicitaria' },
        { Icon: CampaignIcon , name: 'Centro de anuncios' },
        { Icon: PublicIcon , name: 'Centro de climatologia' },
        { Icon: BloodtypeIcon , name: 'Donaciones de sangre' },
        { Icon: VideogameAssetIcon , name: 'Jugar' },
        { Icon: MessageIcon , name: 'Messenger' },
        
    ];

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
                <ListItem Icon={KeyboardArrowDownIcon} name='Ver' onClick={toggleOptions} />
                {showOptions && (
                    <OptionsList>
                        {options.map((option, Icon) => (
                            <ListItem key={Icon} name={option.name} Icon={option.Icon}/>  
                        ))}
                    </OptionsList>
                )}
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
    flex: 0.20;
    height: 100vh;

    @media (max-width: 1200px){
        width: 100%;

        background: linear-gradient(to right, #0ef, #FFFF);

    }
`;

const GroupList = styled.div``;


const OptionsList = styled(motion.div)`
    width: 100%;
    margin-top: 10px;
    background: linear-gradient(to right, #0ef, #fff);
    padding: 10px;
    position: sticky;
    top: 8vh;
    left: 0;
    height: 100vh;
    font-size: 14px;
    overflow: auto;
`;


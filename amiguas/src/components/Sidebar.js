import styled from '@emotion/styled';
import { motion } from "framer-motion";
import ListItem from './ListItem';
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
import logo from '../assets/img/amiGuas.png';

const Sidebar = () => {
    const [showOptions, setShowOptions] = useState(false);

    const toggleOptions = () => {
        setShowOptions(!showOptions);
    };

    const options = [
        { Icon: CalendarMonthIcon, name: 'Eventos' },
        { Icon: ShowChartIcon, name: 'Administrador de anuncios' },
        { Icon: Diversity2Icon, name: 'Recaudacion de fondos' },
        { Icon: LocalActivityIcon, name: 'Actividad publicitaria' },
        { Icon: CampaignIcon, name: 'Centro de anuncios' },
        { Icon: PublicIcon, name: 'Centro de climatologia' },
        { Icon: BloodtypeIcon, name: 'Donaciones de sangre' },
        { Icon: VideogameAssetIcon, name: 'Jugar' },
        { Icon: MessageIcon, name: 'Messenger' },

    ];

    return (
        <Container>
            <GroupList>
                <LoginLeft>
                    <img
                        src={logo}
                        alt="logo amigas"
                    />
                </LoginLeft>
                {/* <ListItem avatar
                    img='https://thumbs.dreamstime.com/b/colores-vivos-10349002.jpg'
                    name='Usuario'
                />
                <ListItem Icon={PeopleIcon} name='Amigos' />
                <ListItem Icon={GroupIcon} name='Grupos' />
                <ListItem Icon={StorefrontIcon} name='MarketPlace' />
                <ListItem Icon={OndemandVideoIcon} name='Watch' />
                <ListItem Icon={HistoryIcon} name='Recuerdos' />
                <ListItem Icon={BookmarkIcon} name='Guardados' />
                <ListItem Icon={FlagIcon} name='Paginas' />
                <ListItem Icon={KeyboardArrowDownIcon} name='Ver' onClick={toggleOptions} />
                {showOptions && (
                    <OptionsList>
                        {options.map((option, Icon) => (
                            <ListItem key={Icon} name={option.name} Icon={option.Icon} />
                        ))}
                    </OptionsList>
                )} */}
            </GroupList>
        </Container>
    )
}

export default Sidebar;

const Container = styled.div`
    flex: 0.25;
    top: 8vh;
    position: sticky; 
    background-color: #f0f0f0;
    right: 0;
    height: 92vh;
    overflow-x: scroll; 

    @media (max-width: 1200px) {
        display: none;
    }
`;

const LoginLeft = styled.div`
    width: 100%;
    height: 100%;
    min-height: 10vh;
    display: flex;
    flex-direction: column;
    padding: 10px;
    margin: 10px ; 

    img {
        width: 20em;
        display: block; 
        margin: 0 auto; 
    }
    

    p {
        font-size: 20px;
        font-weight: 400;
        padding: 15px 10px;
        

    }

    @media (max-width: 1500px) {
        width: 50%;
    }

    @media (max-width: 1200px) {
        display: none;
    }
`;

const GroupList = styled.div`
`;


const OptionsList = styled(motion.div)`
    width: 100%;
    margin-top: 10px;
    background-color: #f0f0f0;
    padding: 10px;
    position: sticky;
    top: 8vh;
    left: 0;
    height: auto;
    font-size: 14px;
    overflow: auto;

    @media (max-width: 1200px){
        background-color: #f0f0f0;
        color: transparent;
        align-items: center; 
        height: auto;
        width: 100%;
        padding: 1px 1px 1px 5px;
        left: 0;
        
    }
`;


import styled from '@emotion/styled';
import { Avatar } from '@mui/material';
import React from 'react';

const ListItem = ({ avatar, img, name, Icon, onClick }) => {
    return (
        <Container onClick={onClick}>
            {avatar &&
                <Avatar src={img} alt='logo' />
            }
            {Icon &&
                <Icon />
            }
            <h4>{name}</h4>
        </Container>
    )
}

export default ListItem;

const Container = styled.div`
    display: flex;
    align-items: center;
    padding: 15px 20px;

    .MuiAvatar-root {
        width: 50px;
        height: 50px;
        color: black;
    }
    
    h4 {
        margin-left: 10px;
        font-size: 20px;
        font-weight: 500;
    }
    &:hover {
        background: linear-gradient(to right, #cfcfcf, #FFFF);
    }

    .MuiSvgIcon-root {
        font-size: 40px;
        color: #3964bf;

        @media (max-width: 1200px) {
            &:hover {
                border: 2px solid #FFFF;
                border-radius: 50px;
                background: linear-gradient(to right, #cfcfcf, #000);
        } 
    }
    
     
`;

import React, { useState } from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import Body from '../components/Body';
import Chat from '../components/Chat';

const Homepages = () => {
    const [openChat, setCloseUser] = useState(false);

    return (
        <Container>
            <Header />
            <Body />
            {openChat && 
                <Chat user={setCloseUser}/>
            }
        </Container>
    )   
}

export default Homepages;

const Container = styled.div`

  background-color:red;
`;
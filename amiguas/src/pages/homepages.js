import React from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import Body from '../components/Body';

const Homepages = () => {
    return (
        <Container>
            <Header />
            <Body />
        </Container>
    )   
}

export default Homepages

const Container = styled.div``;
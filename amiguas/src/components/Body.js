import React from 'react';
import styled from '@emotion/styled';
import Sidebar from './Sidebar';
import Story from './Story';


const Body = () => {
    return (
        <Container>
            <Sidebar />
            <Feed>
                <Carousel>
                    <Stories>
                        <Story />
                        <Story />
                        <Story />
                        <Story />
                        <Story />
                        <Story />
                        <Story />
                        <Story />
                        <Story />
                        <Story />
                        <Story />
                        <Story />
                        <Story />
                        <Story />
                        <Story />
                        <Story />
                        <Story />
                    </Stories>
                </Carousel>
            </Feed>
        </Container>
    )   
}

export default Body;

const Container = styled.div`
    width: 100%;
    display: flex;
    overflow-x: hidden;
`;

const Feed = styled.div`
    display: flex;
    flex-direction: column;
    flex: 0.50;
    align-items: center;
`;

const Carousel = styled.div`
    width: 50em;
    background-color: gray;
    height: 30vh;
    margin-top: 20px;
    border-radius: 15px;
    overflow-x: hidden;
`;

const Stories = styled.div`
    display: flex;
    height: 100%;
    width: 90em;
    flex-wrap: wrap;
`;


import React from 'react';
import styled from '@emotion/styled';
import Sidebar from './Sidebar';
import Story from './Story';
import ImgStory from '../ImageStore';
import { motion } from "framer-motion";
import NewPost from './NewPost';


const Body = () => {
    return (
        <Container>
            <Sidebar />
            <Feed>
                <Carousel>
                    <Stories drag='x' dragConstraints={{ right: 0, left: -270 }}>
                        {ImgStory.map((image) => (
                            <Story
                                img={image.imgProfile}
                                bgImage={image.url}
                                user={image.name}
                            />))}
                    </Stories>
                </Carousel>
                <NewPost />
            </Feed>
        </Container>
    )
}

export default Body;

const Container = styled.div`
    width: 100%;
    display: flex;
    background-color: #FFFF;
`;

const Feed = styled.div`
    display: flex;
    flex-direction: column;
    flex: 0.50;
    align-items: center;

    @media (max-width: 1200px) {
        width: 100%;
        max-width: 100%;   
        height: auto; 
        overflow: hidden;
    }
`;

const Carousel = styled(motion.div)`
    width: 50em;
    background-color: #FFFF;
    height: 30vh;
    margin-top: 20px;
    border-radius: 15px;
    overflow: hidden;

    @media (max-width: 1200px) {
        width: 60em;
    }
`;

const Stories = styled(motion.div)`
    display: flex;
    height: 100%;
    width: 90em;
    flex-wrap: wrap;

    @media (max-width: 1200px) {
        width: 100em;
        border-radius: 1px 1px;
    }
`;


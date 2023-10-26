import React from 'react';
import styled from '@emotion/styled';
import Sidebar from './Sidebar';
import Story from './Story';
import ImgStory from '../ImageStore';
import { motion } from "framer-motion";
import NewPost from './NewPost';
import Post from './Post';
import { useEffect, useState } from 'react';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../firebase';
import RedeemIcon from '@mui/icons-material/Redeem';
import Chats from './Chats';


const Body = () => {
    const [posts, setposts] = useState([]);

    useEffect(() => {
        const q = query(collection(db, 'posts'), orderBy('timeStamp', 'desc'));

        onSnapshot(q, (snapshot) => {
            setposts(snapshot.docs.map((doc) => doc.data()));
        })
    },[])

    return (
        <Container>
            <Sidebar />
            <Feed>
                <Carousel>
                    <Stories drag='x' dragConstraints={{ right: 0, left: -270 }}>
                        {ImgStory.map((image, index) => (
                            <Story
                                key={index}
                                img={image.imgProfile}
                                bgImage={image.url}
                                user={image.name}
                            />))}
                    </Stories>
                </Carousel>
                <NewPost />
                {posts.map((post, index) => {
                    return (
                        <Post
                            key={index}
                            name={post.name}
                            imgProfile={post.imgProfile}
                            postText={post.postText}
                            postImage={post.postImage}
                            imageUrl={post.imageUrl}
                        />
                    );
                })}
            </Feed>
            <SectionRight>
                <TopBar>
                    <h3>Cumpleaños</h3>
                    <Birthday>
                        <RedeemIcon />
                        <h4>Hoy es el Cumpleaños de dos de tus amigos</h4>
                    </Birthday>
                </TopBar>
                <Chats />
            </SectionRight> 
        </Container>
    )
}

export default Body;

const Container = styled.div`
    width: 100%;
    display: flex;
    background-color: blue;

    
`;

const Feed = styled.div`
    display: flex;
    flex-direction: column;
    flex: 0.50;
    align-items: center;

    @media (max-width: 1200px) {
        flex: 0.70;
    }

    @media (max-width: 990px) {
        flex: 0.25;
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

    @media (max-width: 990px) {
        width: 47em;
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

const SectionRight = styled.div`
    flex: 0.25;
    top: 8vh;
    position: sticky; 
    background-color: #cfcfcf;
    right: 0;
    height: 92vh;
    overflow-x: scroll; 

    @media (max-width: 1200px) {
        flex:0.30;
    }

    @media (max-width: 990px) {
        display: none;
    }
`;

const TopBar = styled.div`
    background-color: #f0f0f0;
    width: 100%;
    padding: 30px 15px;
    border-bottom: 1px solid #6b6b6b;
    padding-bottom: 15px;
    margin: 5px;
    border-radius: 8px;

    h3 {
        font-size: 24px;
        color: #6b6b6b;
    }
`;

const Birthday = styled.div`
    display: flex;
    align-items: center;
    padding: 10px 0;

    .MuiSvgIcon-root {
        font-size: 50px;
        color: #3964bf;
    }

    h4 {
        font-size: 17px;
        margin-left: 10px;
        font-weight: 500;
        color: #6b6b6b;
    }
`;
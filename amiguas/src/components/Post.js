import React from 'react';
import { styled } from 'styled-components';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import TextsmsIcon from '@mui/icons-material/Textsms';
import ShareIcon from '@mui/icons-material/Share';

const Post = ({ name,imgProfile, postText, postImage, imageUrl }) => {
    console.log('URL de la imagen:', imageUrl);
    return (
        <Container>
            <Header>
                <HeaderUser>
                    <img src={imgProfile}
                    alt='imagen user' />
                    <h4>{name}</h4>
                </HeaderUser>
                <MoreHorizIcon />
            </Header>
            <PostContent>
                <p>{postText}</p>
                <img
                    src={imageUrl}
                    alt='imagen de la publicación..'
                />
            </PostContent>
            {/* <div>
                {imageUrl && (
                    <div>
                    <img 
                    src={imageUrl}
                    alt="Imagen subida" />
                    </div>
                )}
            </div> */}
            <Footer>
                <IconFooter>
                    {/* <ThumbUpIcon /> negro*/}
                    <ThumbUpOffAltIcon />
                    <h4>Like</h4>
                </IconFooter>
                <IconFooter>
                    {/* <TextsmsIcon /> negro*/}
                    <ChatBubbleOutlineIcon />
                    <h4>Comentar</h4>
                </IconFooter>
                <IconFooter>
                    <ShareIcon />
                    <h4>Compartir</h4>
                </IconFooter>
            </Footer>
        </Container>
    );
}

export default Post;

const Container = styled.div`
    width: 80%;
    margin-top: 20px;
    background-color: #f0f0f0;
    overflow-x: hidden;
    display: flex;
    flex-direction: column;
    border: 1px solid #f0f0f0;
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
    

    @media (max-width: 1200px) {
        width: 95%;
        height: auto;
    }
`;

const Header = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 15px;
    flex-direction: row;

    img {
        width: 30px;
        height: 25px;
    }
`;


const HeaderUser = styled.div`
    display: flex;
    align-items: center;

    img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        object-fit: cover;
    }

    h4 {
        margin-left: 10px;
        font-size: 18px;
        font-weight: 500;
        color: #6b6b6b;
    }
`;
const PostContent = styled.div`
    height: 70vh;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: red;

    img {
        width: 100%;
        height: 90%;
        object-fit: cover;
        border-radius: 15px;
        padding: 5px;
        object-fit: contain; 
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
    }

    p {
        width: 100%;
        padding: 15px;
        font-size: 18px;
        margin: auto; 
        margin-left: 10px; 
        margin-right: 10px;
        overflow: auto;
        color: #6b6b6b;
    }
    

    @media (max-width: 1200px) {
        width: 100%;
        height: 90%;
        padding: 5px;
        flex-direction: column;
        justify-content: space-between;

        img {
            width: 100%;
            height: 90%;
            object-fit: cover;
            border-radius: 10px;
            padding: 5px;
            object-fit: contain; 
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
        }

        p {
            width: 100%;
            padding: 5px;
            margin: 20px 10px;
            font-size: 14px;
            margin: 5px 0;
            overflow-y: auto;
        }
    }
`;


const Footer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 15px;
    border-top: 5px solid blue;
`;

const IconFooter = styled.div`
    display: flex;
    align-items: center;
    margin-right: 50px; 
    margin-left: 55px; 

    .MuiSvgIcon-root {
        font-size: 25px;
        color: #3964bf;
        
    }

    h4 {
        margin-left: 10px;
        font-size: 17px;
        font-weight: 500;
        color: #6b6b6b;
    }

    &:hover {
        width: auto;
        height: auto;
        border-radius: 10px;
        background-color: rgba(0, 0, 0, 0.2);
        cursor: pointer;
    }

    @media (max-width: 1200px) {
        .MuiSvgIcon-root {
            font-size: 18px;
            color: #3964bf;
        }
    
        h4 {
            margin-left: 10px;
            font-size: 14px;
            font-weight: 500;
            color: #6b6b6b;
        }
        
    }
`;

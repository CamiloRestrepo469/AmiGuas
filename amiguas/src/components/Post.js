import React from 'react';
import { styled } from 'styled-components';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

const Post = () => {
    return (
        <Container>
            <Header>
                <HeaderUser>
                    <img src='https://media.istockphoto.com/id/1209807747/es/foto/fondo-tecnol%C3%B3gico-en-color-azul-tel%C3%B3n-de-fondo-de-tecnolog%C3%ADa-futurista-renderizado-3d.webp?s=2048x2048&w=is&k=20&c=MoITMaf1eHoxuzsMD4r9TH9Eda-w_cFUN1WJ1wuBzX4='
                    alt='imagen user' />
                    <h4>uno</h4>
                </HeaderUser>
                <MoreHorizIcon />
            </Header>
            <PostContent>
                <p>esta es tu plublicacion</p>
                <img 
                src='https://media.istockphoto.com/id/1018442074/es/foto/ind%C3%ADgenas-brasile%C3%B1os-j%C3%B3venes-hombre-retrato-de-etnia-guaran%C3%AD-dar-la-bienvenida-al-turista.jpg?s=612x612&w=0&k=20&c=ahjJaU1G0RBafwPqpykHbbyyu3yoPX2-C01ImW2lDnA=' 
                alt='imagen de la publicacion..' 
                />
            </PostContent>
        </Container>
    )
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
    height: 90vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    img {
        width: 100%;
        height: 90%;
        object-fit: cover;
    }

    @media (max-width: 1200px) {
        width: 100%;
        height: 90%;
        flex-direction: column;
        justify-content: space-between;
        object-fit: cover;
    }

    p {
        height: 10%;
        padding: 15px 10px;
        font-size: 18px;
        overflow-y: auto;
    }
`;

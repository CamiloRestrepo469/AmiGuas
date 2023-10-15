import React from 'react';
import styled from 'styled-components';

const Story = () => {
    return (
        <Container>
            <img
                src='https://media.istockphoto.com/id/1155361782/es/vector/brillante-fondo-de-dise%C3%B1o-radiante-l%C3%ADneas-de-estilo-ne%C3%B3n-concepto-de-tecnolog%C3%ADa-vector.webp?s=2048x2048&w=is&k=20&c=Ck8OpccDY6qnUvwqAXau7lN29Ca4ohqIGQRXEzMs4Wo='
                alt='titulo carrusel'
            />
            <h4>Titulo</h4>
        </Container>
    )
}

export default Story;

const Container = styled.div`
    width: 10em;
    height: 100%;
    background-image:url('https://media.istockphoto.com/id/1040315976/es/foto/mujer-busca-en-vista-de-una-cueva-de-matera-basilicata-italy.jpg?s=612x612&w=0&k=20&c=CvPhy2wn5bVqeCRZ0Tbp9WjJX5VZgTxFdAgqcudngFg=');
    background-position: center; 
    background-size: cover;
    border-radius: 10%; 
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    padding: 10px 15px;
    margin: 0 2px;

    img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
    }
`;

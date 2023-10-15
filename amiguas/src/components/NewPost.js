import React from 'react';
import styled from 'styled-components';

const Story = ({img, bgImage, user}) => {
    return (
        <Container background={bgImage}>
            <img
                src={img}
                alt='carrusel'
            />
            <h4>{user}</h4>
        </Container>
    )
}

export default Story;
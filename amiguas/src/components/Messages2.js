import React from 'react';
import Message2 from './Message2';
import { styled } from 'styled-components';


const Messages2 = () => {
    return (
      <Container className="Messages2">
        <div className='container'>
            <Message2 />
            <Message2 />
            <Message2 />
            <Message2 />
            <Message2 />
            <Message2 />
            <Message2 />
        </div>
       
      </Container>
    ); 
}

export default Messages2;

const Container = styled.div`
    background-color: 0f0f0f;
    padding: 10px;
    height: calc(100% - 110px);
    overflow: scroll;
`;
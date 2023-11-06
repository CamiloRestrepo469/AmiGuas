import { Avatar } from '@mui/material';
import React, { useContext } from 'react';
import { styled } from 'styled-components';
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';


const Message2 = ({message}) => {
  const {currentUse} = useContext(AuthContext);
  const {data} = useContext(ChatContext);

  console.log(message);
    return (
      <Container className="message owner">
        {/* <MessageInfo>
          <Avatar />
          <Span> Justo ahora</Span>
        </MessageInfo>
        <MessageContent>
          <P>hello</P>
          <img src={}
          alt='foto'
          />
        </MessageContent> */}
      </Container>
    ); 
}

export default Message2;


const Container = styled.div`
  display: flex;
  gap: 2px;
  margin-bottom: 10px;

  &.owner{
    flex-direction: row-reverse;

    p{
      background-color: #8da4f1;
      padding: 8px 20px;
      border-radius: 10px 0px 10px 10px; 
    }


    img{
      max-widht: 60%;
      border: 1px solid red;

    }
  }
`;

const MessageInfo = styled.div`
  display: flex;
  flex-direction: column;
  color: gray;
  font-weight: 400;

  .MuiAvatar-root {
    width: 35px;
    height: 35px;
    position: relative;
    margin-left: 10px;
    object-fit: cover;
  }

`;

const Span = styled.div`
    font-size: 10px;
    margin: 4px;

`;


const MessageContent = styled.div`
    max-width: 50%;
    display: flex;
    flex-direction: column;
    gap: 1px;
    align-items: flex-end;

    p{
      background-color: #FFF;
      padding: 8px 20px;
      border-radius: 0px 10px 10px 10px;
      max-width: max-content;
    }

    img{
      max-width: 60%;
      border: 1px solid red;
    }

`;

const P = styled.p`
    font-size: 10px;
    margin: 4px;

`;

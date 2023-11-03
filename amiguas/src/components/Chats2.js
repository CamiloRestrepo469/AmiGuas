import React from 'react';
import styled from '@emotion/styled';
import { Avatar } from '@mui/material';


const Chats2 = () => {
  return (
    <Container className="Chat2">
      <UserChat className=' UserChat'>
        <Avatar src='https://images.pexels.com/photos/18802844/pexels-photo-18802844/free-photo-of-mar-oceano-barcos-yates.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load' />
        <UserChatInfo className='UserChatInfo'>
          <Span>Junio</Span>
          <P>Hello</P>
        </UserChatInfo>
      </UserChat>

      <UserChat className=' UserChat'>
        <Avatar src='https://images.pexels.com/photos/18802844/pexels-photo-18802844/free-photo-of-mar-oceano-barcos-yates.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load' />
        <UserChatInfo className='UserChatInfo'>
          <Span>Junio</Span>
          <P>Hello</P>
        </UserChatInfo>
      </UserChat>

      <UserChat className=' UserChat'>
        <Avatar src='https://images.pexels.com/photos/18802844/pexels-photo-18802844/free-photo-of-mar-oceano-barcos-yates.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load' />
        <UserChatInfo className='UserChatInfo'>
          <Span>Junio</Span>
          <P>Hello</P>
        </UserChatInfo>
      </UserChat>

      <UserChat className=' UserChat'>
        <Avatar src='https://images.pexels.com/photos/18802844/pexels-photo-18802844/free-photo-of-mar-oceano-barcos-yates.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load' />
        <UserChatInfo className='UserChatInfo'>
          <Span>Junio</Span>
          <P>Hello</P>
        </UserChatInfo>
      </UserChat>
    </Container>
  );
}

export default Chats2;

const Container = styled.div`
  
`;


const UserChat = styled.div`
  padding: 10px;
  display: flex;
  align-items: center;
  gap: 10px;
  color: white;
  cursor: pointer;

  &:hover{
    background-color: rgba(255, 255, 255, 0.7);
  }

  .MuiAvatar-root {
    width: 40px;
    height: 40px;  
    object-fit: cover;
`;

const UserChatInfo = styled.div`
  color: red;
  font-size: 18px;
`;

const Span = styled.span`
  font-weight: bold;
`;

const P = styled.p`
  color: blue;
  font-size: 12px;
  
`;
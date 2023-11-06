import React, { useContext } from 'react';
import styled from '@emotion/styled';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Messages2 from './Messages2';
import Input2 from './Input2';
import { ChatContext } from '../context/ChatContext';



const Chat2 = () => {
  const { data } = useContext(ChatContext);
  console.log(data);
  console.log(useContext);
  console.log(ChatContext);
  return (
    <Container className="Chat2">
      <ChatInfo>
        <Span>{data.user?.displayName}</Span>
        <ChatIcons>
          <VideoCallIcon />
          <PersonAddIcon />
          <MoreHorizIcon />
        </ChatIcons>
      </ChatInfo>
      <Messages2 />
      <Input2 />
    </Container>
  );
}

export default Chat2;

const Container = styled.div`
  flex: 2;
`;

const ChatInfo = styled.div`
  height: 50px;
  background-color: #5d5b8d;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  color: lightgray;
`;

const ChatIcons = styled.div`
  display: flex;
  gap: 10px;

  .MuiSvgIcon-root {
    font-size: 25px;
    color: lightgray;
    cursor: pointer;

`;

const Span = styled.span`
  color: lightgray;
  font-size: 18px;
`;
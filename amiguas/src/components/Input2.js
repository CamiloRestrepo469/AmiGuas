import React from 'react';
import { styled } from 'styled-components';
import AttachFileIcon from '@mui/icons-material/AttachFile';import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import ImageIcon from '@mui/icons-material/Image';

const Input2 = () => {
  return (
    <Container className="Input2">
      <input
        type='text'
        placeholder='Mensaje nuevo...'
      />
      <InconInput>
      <Stack direction="row" spacing={3}>
        <AttachFileIcon />
        <input 
        type='file'
        style={{display: 'none'}}
        id='file'
        />
        <label htmlFor='file'>
        <ImageIcon />
        </label>
        <SendIcon />
      </Stack>
      </InconInput>
    </Container>
  );
}

export default Input2;

const Container = styled.div`
  color: blue;
  height: 60px;
  background-color: #FFF;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;

   input{
    width: 100%;
    border: none;
    outline: none;
    color: #2f2d52;
    font-size: 18px;

    &::placeholder{
      color: #cfcfcf;
    }
   }
`;

const  InconInput = styled.div`
  .MuiSvgIcon-root {
    font-size: 25px;
    transition: color 0.3s;
    cursor: pointer;
    display: flex;
    align-items: center;
  }
`;
import React from 'react';
import styled from '@emotion/styled';
import { Avatar } from '@mui/material';


const Search2 = () => {
  return (
    <Search className='Search'>
      <SearchForm className='SearchForm'>
        <input 
        type='text'
        placeholder='Buscar Amiguas'
        />
      </SearchForm>

      <UserChat className=' UserChat'>
        <Avatar src='https://images.pexels.com/photos/18802844/pexels-photo-18802844/free-photo-of-mar-oceano-barcos-yates.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load'/>
        <UserChatInfo className='UserChatInfo'>
          <Span>Junio</Span>
        </UserChatInfo>
      </UserChat>
    </Search>
  );
}

export default Search2;

const Search = styled.div`
  border-right: 1px solid blue;
  background-color: #cfcfcf;
`;

const SearchForm = styled.div`
padding: 10px;

  input {
    background-color: transparent;
    border: none;
    color: #FFF;
    outline: none;

    &::placeholder{
      color: black;
    }
  }
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
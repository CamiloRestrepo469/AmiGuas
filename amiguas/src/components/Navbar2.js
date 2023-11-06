import React, { useContext } from 'react';
import styled from '@emotion/styled';
import Button from '@mui/material/Button';
import { Avatar } from '@mui/material';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { AuthContext } from '../context/AuthContext';
import  userProfile from './NewPost';

const Navbar2 = () => {
  const {currentUser} = useContext(AuthContext)
    return (
      <Container className='navbar'>
        <Span className='logo' >Chat</Span>
        <ContainerUser className='user'>
          <HeaderImag>
            <Avatar 
              src={currentUser.photoUrl}
              alt='user'
            />
          </HeaderImag>
            <Span>{currentUser.displayName}</Span>
            <Button variant="contained" onClick={()=>signOut(auth)}>logout</Button>
        </ContainerUser>
       
      </Container>
    ); 
}

export default Navbar2;

const Container = styled.div`
  border: 1px solid blue;
  display: flex;
  align-items: center;
  background-color: #2f2d52;
  height: 50px;
  padding: 10px;
  justify-content: space-between;
  color: #FFF;

  @mixin mobile {
    @media screen and (max-width: 480px){
      @content;
    }
  }

  @mixin table {
    @media screen and (max-width: 768px){
      @content;
    }
  }

  @mixin laptop {
    @media screen and (max-width: 1200px){
      @content;
    }
`;

const Span = styled.span`
  font-weight: bold;

  @mixin mobile {
    @media screen and (max-width: 480px){
      @content;
    }
  }

  @media screen and (max-width: 768px){
    display: none;
  }
  

  @mixin laptop {
    @media screen and (max-width: 1200px){
      @content;
    }
`;

const ContainerUser = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  @mixin mobile {
    @media screen and (max-width: 480px){
      @content;
    }
  }

  @mixin table {
    @media screen and (max-width: 768px){
      @content;
    }
  }

  @mixin laptop {
    @media screen and (max-width: 1200px){
      @content;
    }
`;

const HeaderImag = styled.div`
.MuiAvatar-root {
  width: 35px;
  height: 35px;  
  object-fit: cover;

  @mixin mobile {
    @media screen and (max-width: 480px){
      @content;
    }
  }

  @mixin table {
    @media screen and (max-width: 768px){
      @content;
    }
  }

  @mixin laptop {
    @media screen and (max-width: 1200px){
      @content;
    }
`;


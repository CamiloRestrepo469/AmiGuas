import React from 'react';
import styled from '@emotion/styled';
import Button from '@mui/material/Button';
import { Avatar } from '@mui/material';

const Navbar2 = () => {
    return (
      <Container className='navbar'>
        <Span className='logo' >Chat</Span>
        <ContainerUser className='user'>
          <HeaderImag>
            <Avatar 
              src='https://images.pexels.com/photos/15104206/pexels-photo-15104206/free-photo-of-coches-vehiculos-animal-perro.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load'
              alt='user'
            />
          </HeaderImag>
            
            <Span>John</Span>
            <Button variant="contained">logout</Button>
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


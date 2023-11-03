import React from 'react';
import styled from '@emotion/styled';
import Navbar2 from './Navbar2';
import Search2 from './Search2';
import Chats2 from './Chats2';


const Sidebar2 = () => {
    return (
      <Container className="Sidebar2">
        <div className='container'>
            <Navbar2 />
            <Search2 />
            <Chats2 />    
        </div>
       
      </Container>
    ); 
}

export default Sidebar2;

const Container = styled.div`
  flex: 1;
  border-right: 1px solid red;
  background-color: #cfcfcf;

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

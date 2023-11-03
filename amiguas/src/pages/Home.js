import React from "react";
import Sidebar2 from "../components/Sidebar2";
import Chat2 from "../components/Chat2";
import styled from "@emotion/styled";

const Home = () => {
    return (
      <Container className="Home">
        <FormComponent className='container'>
        <Sidebar2 />
        <Chat2 />
        </FormComponent>
       
      </Container>
    ); 
}

export default Home;


const Container = styled.div`
    position: absolute;
    width: 100vw;
    background-color: rgba(255, 255, 255, 0.7);
    height: 100vh;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;

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

const FormComponent = styled.div`
    width: 65%;
    height: 80%;
    display: flex;
    // flex-direction: column;
    // align-items: center;
    // padding: 15px 0;
    // justefy-content: space-between;
    border: 1px solid red;
    box-shadow: 1px 1px 5px rgba(145, 145, 145, 0.6), 0px -1px 5px rgba(145, 145, 145, 0.4);
    background-color: #f0f0f0;
    overflow: hidden;
    border-radius: 10px;

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
    }

`;


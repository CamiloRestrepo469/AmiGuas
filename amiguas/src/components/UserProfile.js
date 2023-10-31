import React, { useEffect, useState } from 'react';
import { auth } from '../firebase';
import { styled } from 'styled-components';
import { Avatar } from '@mui/material';


function UserProfile() {
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      const displayName = user.displayName;
      const photoURL = user.photoURL;
      const phoneNumber = user.phoneNumber;

      setUserProfile({ displayName, photoURL, phoneNumber });
    }
  }, []);

  function renderUserProfile() {
    if (userProfile) {
      const userProfileData = [
        <Avatar />,
        <input
        type="text"
        placeholder={`¿Qué estás pensando,${userProfile.phoneNumber}?`}
        onChange={(e) => setUserProfile(e.target.value)}
      />,
      ];

      return userProfileData.map((data, index) => (
        <p key={index}
           
        >{data}</p>
      ));
    } else {
      return <p>No se han cargado los datos del usuario.</p>;
    }
  }

  return (
    <Container>
       <InputText>
        {renderUserProfile()}  

       </InputText>
    </Container>
  );
}

export default UserProfile;


const Container = styled.div`
    width: 80%;
    color: #FFFF;
    background-color: #f0f0f0;
    margin: 20px;
    border-radius: 10px; 
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 15px 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    @media (max-width: 1200px) {
        width: 95%;
        height: auto;
    }

`;

const InputText = styled.div`
    display: flex;
    width: 100%;

    .MuiAvatar-root {
        width: 45px;
        height: 45px;
        background-color: #cfcfcf;
        cursor: pointer;

        @media (max-width: 1200px) {
           color: black;
        }
    }
    
    input {
        background-color: #cfcfcf;
        width: 90%;
        height: 45px;
        margin-left: 10px;
        border-radius: 25px;
        font-size: 18px;
        padding: 10px;
        border: none;
        outline: none;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;

        @media (max-width: 1200px) {
            width: 80%;
            height: 45px;
            font-size: 14px;
        }
    }
`;
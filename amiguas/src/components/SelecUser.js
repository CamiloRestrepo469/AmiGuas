import React, { useState, useEffect } from 'react';
import { collection, query, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import Chat from './Chat';
import { styled } from 'styled-components';
import { Avatar, Button } from '@mui/material';

function SelectUser() {
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);


    const [users, setUsers] = useState([]);

    const onUserSelected = (user) => {
        setSelectedUser(user);
        setIsChatOpen(selectedUser);
        console.log(user);
    }



    useEffect(() => {
        const fetchUsers = async () => {
            const usersCollection = collection(db, 'users');
            console.log(usersCollection);
            console.log(db);
            console.log(collection);
            const usersSnapshot = await getDocs(usersCollection);
            const usersData = [];
            usersSnapshot.forEach((doc) => {
                const userData = doc.data();
                usersData.push({ id: doc.id, ...userData });
            });
            setUsers(usersData);
        };


        fetchUsers();
    }, []);

    return (
        <Container>
            <Span>Selecionar usuario</Span>

            <UserChat>
                {users.map((user) => (
                    <UserIl key={user.id}>
                        <UserBootton>
                            <Button onClick={() => onUserSelected(user)}>
                                <Avatar src={user.photoURL}/>
                                <UserText>
                                    {user.displayName}
                                </UserText>
                            </Button>
                        </UserBootton>
                        {isChatOpen && selectedUser && <Chat user={selectedUser} />}


                    </UserIl>
                ))}
            </UserChat>
        </Container>
    );
}

export default SelectUser;

const Container = styled.div`
    position: sticky; 
    background-color: #f0f0f0;
    right: 0;
    height: 92vh;
    overflow-x: scroll; 

    @media (max-width: 1200px) {
        display: none;
    }
`;

const UserChat = styled.div`
    padding: 10px;
    list-style:none;
    
`;


const UserIl = styled.div`
    display:flex;
    flex-direction:row;
    margin-left;
    &:hover{
        background-color: #e0fbfc;
    }
`;


const UserBootton = styled.div`
    display:flex;
    flex-direction:row;
    margin-left;

    .MuiAvatar-root {
        width: 45px;
        height: 45px;
        position: relative;
        margin: 3px 10px; 
        color: #3d5a80;
    }

`;

const UserText = styled.p`
    font-size: 15px;
    color: #3d5a80;
`;
const Span = styled.div`
    margin: 10px;
    font-size: 30px;
    color: #3d5a80;
    
`;

import React from 'react';
import {
    AppBar,
    Container,
} from '@mui/material';
import {useParams} from 'react-router-dom';

import PropTypes from 'prop-types';

import UserList from './UserList/UserList.jsx';
import HeaderToolbar from './HeaderToolbar.jsx';


const Header = ({setIsShareModalOpen, userList}) => {
    const {chat} = useParams();

    return (
        <AppBar
            position='fixed'
            elevation={4}
        >
            <Container sx={{width: 'md', p: 0}}>
                <HeaderToolbar setIsShareModalOpen={setIsShareModalOpen}/>
            </Container>
            {
                chat ?
                    <UserList userList={userList}/> : <></>
            }
        </AppBar>
    );
};

Header.propTypes = {
    setIsShareModalOpen: PropTypes.func,
    userList: PropTypes.arrayOf(PropTypes.string),
};

export default Header;

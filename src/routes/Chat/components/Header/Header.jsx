import React from 'react';
import {
    AppBar,
    Container,
} from '@mui/material';
import {useParams} from 'react-router-dom';

import PropTypes from 'prop-types';

import UserList from './UserList/UserList.jsx';
import HeaderToolbar from './HeaderToolbar.jsx';


const Header = ({setIsShareModalOpen, userList, wsApi}) => {
    const {chat} = useParams();

    return (
        <AppBar
            position='fixed'
            elevation={4}
        >
            <Container sx={{width: 'md', p: 0}}>
                <HeaderToolbar
                    setIsShareModalOpen={setIsShareModalOpen}
                    wsApi={wsApi}
                />
            </Container>
            {
                chat ?
                    <UserList userList={userList}/> : <></>
            }
        </AppBar>
    );
};

Header.propTypes = {
    wsApi: PropTypes.object,
    setIsShareModalOpen: PropTypes.func,
    userList: PropTypes.arrayOf(PropTypes.string),
};

export default Header;

import React from 'react';
import PropTypes from 'prop-types';
import {Avatar, Chip} from '@mui/material';

import {useLoaderData} from 'react-router-dom';
import './UserActive.css';


const UserListItem = ({userName, isActive=false}) => {
    const {randImgApi} = useLoaderData();

    return (
        <Chip
            label={userName}
            className={'userListElement' + (isActive && ' active')}
            avatar={
                <Avatar
                    src={randImgApi.getLink(
                        import.meta.env.VITE_RANDIMG_API_MODEL, userName,
                    )}
                />}
        />
    );
};

UserListItem.propTypes = {
    userName: PropTypes.string,
    isActive: PropTypes.bool,
};

export default UserListItem;

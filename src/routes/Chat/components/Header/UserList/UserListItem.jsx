import React from 'react';
import PropTypes from 'prop-types';
import {Avatar, Chip} from '@mui/material';

import hashMapsApi from '../../../APIs/HashMapsApi.js';

const UserListItem = ({userName}) => {
    return (
        <Chip
            label={userName}
            avatar={
                <Avatar
                    src={hashMapsApi.link(userName, 'hashmap')}
                />}
        />
    );
};

UserListItem.propTypes = {
    userName: PropTypes.string,
};

export default UserListItem;

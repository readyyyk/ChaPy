import React from 'react';
import PropTypes from 'prop-types';
import {Avatar, Chip} from '@mui/material';

import {useLoaderData} from 'react-router-dom';

const UserListItem = ({userName}) => {
    const {randImgApi} = useLoaderData();

    return (
        <Chip
            label={userName}
            avatar={
                <Avatar
                    src={randImgApi.getLink(
                        import.meta.env.VITE_RANDIMG_API_MODEL, userName
                    )}
                />}
        />
    );
};

UserListItem.propTypes = {
    userName: PropTypes.string,
};

export default UserListItem;

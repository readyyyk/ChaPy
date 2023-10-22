import React from 'react';
import {Paper, Stack} from '@mui/material';
import PropTypes from 'prop-types';
import UserListItem from './UserListItem.jsx';

const UserList = ({userList}) => {
    return (
        <Paper elevation={1} sx={{px: 2, py: 1, overflowX: 'scroll'}}>
            <Stack
                spacing={{xs: 1, sm: 2}}
                justifyContent='center'
                direction="row"
                useFlexGap
            >
                {userList.map(
                    (el)=>
                        (<UserListItem
                            userName={el.name}
                            isActive={el.isActive}
                            key={`user-list-${el.name}`}
                        />),
                )}
            </Stack>
        </Paper>
    );
};

UserList.propTypes = {
    userList: PropTypes.arrayOf(PropTypes.object),
};

export default UserList;

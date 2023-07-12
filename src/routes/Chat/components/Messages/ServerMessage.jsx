import React from 'react';
import {Avatar, Chip, Container} from '@mui/material';
import hashMapsApi from '../../APIs/HashMapsApi.js';

import PropTypes from 'prop-types';

const ServerMessage = ({text, sender}) => {
    return (
        <Container
            sx={{
                width: 1,
                display: 'flex',
                justifyContent: 'center',
                p: '.5rem',
            }}
        >
            <Chip
                avatar={
                    <Avatar
                        alt="Test"
                        src={hashMapsApi.link(sender, 'hashmap')}
                    />
                }
                color={text.includes('dis') ? 'warning' : 'success'}
                label={text}/>
        </Container>
    );
};

ServerMessage.propTypes = {
    text: PropTypes.string,
    sender: PropTypes.string,
};

export default ServerMessage;

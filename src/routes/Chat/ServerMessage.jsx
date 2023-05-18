import React from 'react';
import {Avatar, Chip, Container} from '@mui/material';
import hashMapsApi from './hashMapsApi.js';

import PropTypes from 'prop-types';

const ServerMessage = ({text, owner}) => {
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
                        src={hashMapsApi.link(owner)}
                    />
                }
                color={text.includes('dis') ? 'warning' : 'success'}
                label={text}/>
        </Container>
    );
};

ServerMessage.propTypes = {
    text: PropTypes.string,
    owner: PropTypes.string,
};

export default ServerMessage;

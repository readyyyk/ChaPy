import React from 'react';
import {Avatar, Chip, Container} from '@mui/material';
import hashMapsApi from './hashMapsApi.js';

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
    text: String,
    owner: String,
};

export default ServerMessage;

import React from 'react';
import {Avatar, Chip, Container} from '@mui/material';

import PropTypes from 'prop-types';
import {useLoaderData} from 'react-router-dom';

const ServerMessage = ({text, sender}) => {
    const {randImgApi} = useLoaderData();

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
                        src={randImgApi.getLink(
                            import.meta.env.VITE_RANDIMG_API_MODEL, sender
                        )}
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

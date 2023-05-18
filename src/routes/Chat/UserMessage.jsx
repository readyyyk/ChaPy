import React from 'react';
import {Avatar, Container, Paper, Typography, useTheme} from '@mui/material';
import hashMapsApi from './hashMapsApi.js';
import PropTypes from 'prop-types';

const UserMessage = ({owner, text, mb}) => {
    const theme = useTheme();

    const isThisUser = owner === 'smb';
    return (
        <Container sx={{
            display: 'flex',
            flexDirection: isThisUser ? 'row-reverse' : 'row',
            justifyContent: isThisUser ? 'end' : 'start',
            width: 1,
            pb: mb?'.5rem':'',
        }}>
            { !isThisUser ?
                <Avatar
                    src={hashMapsApi.link(owner)}
                    variant="soft"
                    size={'lg'}
                    sx={{
                        m: isThisUser ? '0 0 0 .5rem' : '0 .5rem 0 0',
                    }}
                /> : <></>
            }
            <Paper
                elevation={2}
                sx={{
                    alignItems: 'center',
                    background: isThisUser ?
                        'primary' :
                        theme.palette.mode==='dark' ?
                            theme.palette.info.dark :
                            theme.palette.info.light,
                    display: 'flex',
                    p: '.5rem 1rem',
                    maxWidth: isThisUser?'87%':'73%',
                }}
            >
                <Typography variant={'body1'}>{text}</Typography>
            </Paper>
        </Container>
    );
};

UserMessage.propTypes = {
    text: PropTypes.string,
    owner: PropTypes.string,
    mb: PropTypes.bool,
};

export default UserMessage;

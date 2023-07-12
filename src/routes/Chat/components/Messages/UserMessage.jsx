import React from 'react';
import {Avatar, Container, Paper, Typography, useTheme} from '@mui/material';
import hashMapsApi from '../../APIs/HashMapsApi.js';
import PropTypes from 'prop-types';

const UserMessage = ({isThisUser, sender, text, l, f}) => {
    const theme = useTheme();
    const borderRadiusValue = isThisUser ?
        `13px ${f?'13px':'2px'} ${l?'13px':'2px'} 13px` :
        `${f?'13px':'2px'} 13px 13px ${l?'13px':'2px'}`;
    return (
        <Container sx={{
            display: 'flex',
            flexDirection: isThisUser ? 'row-reverse' : 'row',
            justifyContent: isThisUser ? 'end' : 'start',
            alignItems: 'end',
            width: 1,
            [theme.breakpoints.down('md')]: {
                width: .96,
            },
            p: 0,
            pb: l?'.5rem':'',
        }}>
            { !isThisUser ?
                l ?
                    <Avatar
                        src={hashMapsApi.link(sender, 'hashmap')}
                        variant="soft"
                        size={'lg'}
                        sx={{
                            mr: '.5rem',
                        }}
                    /> :
                    <div style={{
                        width: '40px',
                        marginInlineEnd: '.5rem',
                    }}></div> :
                <></>
            }
            <Paper
                elevation={12}
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
                    borderRadius: borderRadiusValue,
                    objectFit: 'contain',
                }}
            >
                <Typography variant={'body1'}>{text}</Typography>
            </Paper>
        </Container>
    );
};

UserMessage.propTypes = {
    isThisUser: PropTypes.bool,
    text: PropTypes.string,
    sender: PropTypes.string,
    f: PropTypes.bool,
    l: PropTypes.bool,
};

export default UserMessage;

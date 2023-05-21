import React from 'react';
import {Avatar, Container, Paper, Typography, useTheme} from '@mui/material';
import hashMapsApi from '../hashMapsApi.js';
import PropTypes from 'prop-types';

const UserMessage = ({owner, text, l, f}) => {
    const theme = useTheme();
    const isThisUser = owner === 'smb';
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
                        src={hashMapsApi.link(owner)}
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
    f: PropTypes.bool,
    l: PropTypes.bool,
};

export default UserMessage;

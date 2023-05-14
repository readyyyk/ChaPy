import React from 'react';
import {Avatar, Container, Paper, Typography, useTheme} from "@mui/material";

const UserMessage = ({owner, text}) => {
    const theme = useTheme();

    const isThisUser = owner === null
    return (
        <Container sx={{
            display: 'flex',
            flexDirection: isThisUser ? 'row-reverse' : 'row',
            justifyContent: isThisUser ? 'end' : 'start',
            width: 1,
        }}>
            <Avatar variant="soft" size={'lg'} sx={{m: isThisUser?'0 0 0 .5rem':'0 .5rem 0 0'}}/>
            <Paper elevation={2} sx={{
                alignItems: 'center',
                background: isThisUser
                    ? 'primary'
                    : theme.palette.mode=="dark"
                        ? theme.palette.info.dark
                        : theme.palette.info.light,
                display: 'flex',
                maxWidth: .85,
                p: 2
            }}>
                <Typography variant={'body1'}>{text}</Typography>
            </Paper>
        </Container>
    );
};

export default UserMessage;
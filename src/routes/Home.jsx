import React from 'react';
import {
    Box,
    Button,
    Typography,
} from '@mui/material';

const Home = () => {
    const letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const redirectToNewChat = () => location.replace(
        Array(5).fill('').reduce((acc)=>
            acc+letters[Math.floor(Math.random()*letters.length)], ''),
    );

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                height: '100dvh',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: 'background.default',
                color: 'text.primary',
                borderRadius: 1,
                p: 3,
            }}
        >
            <Typography variant="h1"> Home </Typography>
            <Button
                onClick={redirectToNewChat}
                variant="outlined"
                size="large"
            >
                New chat
            </Button>
        </Box>
    );
};
export default Home;

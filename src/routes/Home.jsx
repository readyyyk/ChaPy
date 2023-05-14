import React from 'react';
import {Box, Button, Link, Typography} from "@mui/material";
const Home = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                height: "100dvh",
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: 'background.default',
                color: 'text.primary',
                borderRadius: 1,
                p: 3,
            }}
        >
            <Typography variant="h1"> Home </Typography>
            <Link href='/newChat' color='inherit'>
                <Button variant="outlined" size="large"> New chat </Button>
            </Link>
        </Box>
    );
};
export default Home
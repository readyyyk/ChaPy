import React from 'react';
import {
    Box,
    Button,
    Link,
} from '@mui/material';

const NotFound = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                height: '100dvh',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'text.primary',
                borderRadius: 1,
                p: 3,
            }}
        >
            <div>
                <span style={{'fontSize': '96px'}}> 404 </span>
                <span style={{'fontSize': '42px'}}> Not found </span>
            </div>
            <Link href="/">
                <Button
                    variant="contained"
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <img src="/chatbin.svg" alt="icon" height="96px"/>
                </Button>
            </Link>
        </Box>
    );
};

export default NotFound;

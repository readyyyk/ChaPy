import React from 'react';
import {Box, Button, Link, Typography} from "@mui/material";

const NotFound = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: 'background.default',
                color: 'text.primary',
                borderRadius: 1,
                p: 3,
            }}
            style={{height: "100dvh"}}
        >
            <div>
                <span style={{"fontSize": "96px"}}> 404 </span>
                <span style={{"fontSize": "42px"}}> Not found </span>
            </div>
            <Link href="/">
                <Button variant="contained" sx={{display: 'flex', flexDirection: 'column'}}>
                    <img src="/chatbin.svg" alt="icon" height="96px"/>
                    {/*<Typography variant="h4"> Home </Typography>*/}
                </Button>
            </Link>
        </Box>
    );
};

export default NotFound;
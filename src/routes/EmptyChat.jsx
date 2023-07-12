import React, {useState} from 'react';
import {Box, Button, TextField, Typography} from '@mui/material';
import {useNavigate} from 'react-router-dom';

const EmptyChat = () => {
    const navigate = useNavigate();
    const [inputValue, setInputValue] = useState('');
    const redirectToChat = () => navigate(`/${inputValue}`);
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                height: '100dvh',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 1,
                p: 3,
            }}
        >
            <Typography variant="h3"> Chat: </Typography>
            <TextField
                inputProps={{
                    pattern: '[a-zA-Z]{5}',
                    sx: {
                        fontSize: '2rem',
                        width: '2.7em',
                    },
                }}
                label='Chat ID'
                sx={{
                    fontSize: '2rem',
                    mb: '1rem',
                    mt: '1.5rem',
                }}
                autoFocus
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
            />
            <Button
                onClick={redirectToChat}
                variant="outlined"
                size="large"
            >
                Connect
            </Button>
        </Box>
    );
};

export default EmptyChat;

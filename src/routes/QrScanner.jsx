import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';

import {Box, Button, Typography} from '@mui/material';
import LaunchIcon from '@mui/icons-material/Launch';

import {useZxing} from 'react-zxing';

import Header from './Chat/components/Header/Header.jsx';


const QrScanner = () => {
    const navigate = useNavigate();

    const [text, setText] = useState('No data found!');
    const [isAbleToConnect, setIsAbleToConnect] = useState('');

    const {ref} = useZxing({
        onDecodeResult(result) {
            setText(result.getText());
        },
    });

    useEffect(() => {
        setIsAbleToConnect(/\/[a-zA-Z]{5}$/.test(text) ?
            /\/[a-zA-Z]{5}$/.exec(text)[0] : false);
    }, [text]);

    return (
        <Box
            sx={{
                display: 'flex',
                gap: '1rem',
                flexDirection: 'column',
                width: '100%',
                height: '100dvh',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: 'background.default',
                color: 'text.primary',
            }}
        >
            <Header
                setIsShareModalOpen={()=>false}
                userList={['']}
            />

            <video ref={ref} style={{
                width: '300px',
                height: '300px',
                border: '1.33px solid #fff',
                borderRadius: 4,
            }}/>

            <Typography>{text}</Typography>
            <Button
                onClick={()=>navigate(isAbleToConnect)}
                variant='outlined'
                size='large'
                sx={{
                    display: isAbleToConnect ? '' : 'none',
                }}
            >
                Connect <LaunchIcon sx={{ml: .5}}/>
            </Button>
        </Box>
    );
};

export default QrScanner;

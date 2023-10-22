import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';

import {Box, Button, Stack, Typography} from '@mui/material';
import LaunchIcon from '@mui/icons-material/Launch';
import CameraAltIcon from '@mui/icons-material/CameraAlt';

import {useZxing} from 'react-zxing';

import Header from './Chat/components/Header/Header.jsx';


const QrScanner = () => {
    const navigate = useNavigate();

    const [text, setText] = useState('No data found!');
    const [isAbleToConnect, setIsAbleToConnect] = useState('');

    const callPermission = async () => {
        try {
            navigator.getUserMedia = navigator.getUserMedia ||
                navigator.webkitGetUserMedia ||
                navigator.mozGetUserMedia ||
                navigator.msGetUserMedia;
            await navigator.mediaDevices.getUserMedia({video: true});
            location.reload();
        } catch (e) {}
    };

    const {ref} = useZxing({
        onDecodeResult(result) {
            setText(result.getText());
        },
    });
    useEffect(() => {
        setIsAbleToConnect(/\/[a-zA-Z]{5}$/.test(text) ?
            /\/[a-zA-Z]{5}$/.exec(text)[0] : false);
    }, [text]);

    navigator.permissions.query({name: 'camera'}).then((res) => {
        res.onchange = (e) => {
            localStorage['_isCameraAllowed'] = e.state === 'granted';
            location.reload();
        };
        localStorage['_isCameraAllowed'] = res.state==='granted';
    });

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
                setIsShareModalOpen={(_)=>{}}
                userList={[{}]}
                wsApi={{}}
            />

            <video ref={ref} style={{
                width: '300px',
                height: '300px',
                border: '1.33px solid #fff',
                borderRadius: 4,
            }} />

            <Stack useFlexGap gap={'2rem'}>
                <Stack alignItems={'center'}>
                    <Typography align={'center'}>{text}</Typography>
                    <Button
                        onClick={()=>navigate(isAbleToConnect)}
                        variant='outlined'
                        size='large'
                        sx={{
                            width: 'min-content',
                            display: isAbleToConnect ? '' : 'none',
                        }}
                    >
                        Connect <LaunchIcon sx={{ml: .5}}/>
                    </Button>
                </Stack>
                <Button
                    onClick={()=>callPermission()}
                    variant='outlined'
                    color={'success'}
                    size='large'
                    sx={{
                        display: localStorage['_isCameraAllowed']==='true' ?
                            'none' : 'flex',
                    }}
                >
                    <CameraAltIcon/>
                </Button>
            </Stack>
        </Box>
    );
};

export default QrScanner;

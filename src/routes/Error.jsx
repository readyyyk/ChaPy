import React from 'react';
import {
    Link,
    Stack,
    Button,
    Typography,
} from '@mui/material';
import {
    useParams,
    useNavigate,
    useRouteError,
} from 'react-router-dom';

import logo from '../../public/chapy192-beta.png';

import PropTypes from 'prop-types';


const BackButton = ({to}) => {
    const navigate = useNavigate();
    const toText = (
        <Typography
            fontWeight={'bold'}
            fontFamily={'Monospace'}
            sx={{textDecoration: 'underline'}}
        >{to}</Typography>);
    return (
        <Button
            variant={'contained'}
            color={'secondary'}
            sx={{textTransform: 'none'}}
            onClick={()=>navigate(`/${to}`)}
        >
            Go back ({toText})
        </Button>);
};
BackButton.propTypes = {
    to: PropTypes.string,
};

const Error = ({manualError, routerError}) => {
    const urlParams = new URLSearchParams(location.search);
    const navigate = useNavigate();
    const errors = {
        400: ['Bad request.', 'Probably you entered invalid chat id'],
        404: ['Not found.', 'Probably you entered invalid URL'],
        408: ['Request Timeout', 'Probably you left the page for too long.'],
        4: ['Request error.', 'Unhandled 4xx error'],
        500: ['Internal server error.', 'Probably API isn\'t set up ' +
            'correctly. Contact https://t.me/Ready_k'],
        5: ['Internal server error.',
            'Unhandled 5xx error. Contact https://t.me/Ready_k'],
        10: ['WebSocket Error',
            'Unhandled websocket error. Contact https://t.me/Ready_k'],
        1006: ['Connection with chat lost...',
            (<>Do you want to reconnect? <BackButton to={urlParams.get('back')}/></>)],
        1012: ['Server was in restarting stage...',
            (<>Do you want to reconnect? <BackButton to={urlParams.get('back')}/></>)],
    };

    let {errorCode} = useParams();
    let routerErrorData = '';

    if (manualError) {
        errorCode = manualError;
    } else if (routerError) {
        errorCode = 500;
        routerErrorData = useRouteError();
    }

    try {
        errorCode = Number(errorCode);
    } catch (e) {
        console.error(e);
        navigate('/error/500');
    }

    const simplifiedCode = Math.floor(errorCode/100);
    const errorDescription = routerErrorData || Number(errorCode) in errors ?
        errors[errorCode] : errors[simplifiedCode];

    return (
        <Stack
            alignItems={'center'}
            justifyContent={'center'}
            gap={5}
            sx={{
                height: '100dvh',
                p: 3,
            }}
        >
            <Typography variant='h1'> {errorCode} </Typography>
            <Stack alignItems={'center'} gap={1}>
                <Typography variant='h3'> {errorDescription[0]} </Typography>
                <Typography
                    variant='h6'
                    color={'secondary'}
                    sx={{maxWidth: 350}}
                    align={'center'}
                    fontWeight={'regular'}
                > {errorDescription[1]} </Typography>
            </Stack>
            <Link href="/">
                <Button
                    variant="outlined"
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        padding: '-1rem',
                        borderColor: 'transparent !important',
                    }}
                >
                    <img src={logo} alt="icon" height="96px"/>
                    <Typography variant='h6'> Home </Typography>
                </Button>
            </Link>
        </Stack>
    );
};

Error.propTypes = {
    manualError: PropTypes.number,
    routerError: PropTypes.bool,
};

export default Error;

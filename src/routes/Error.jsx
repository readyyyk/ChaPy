import React from 'react';
import {
    Box,
    Button,
    Link,
    Typography,
} from '@mui/material';
import {
    useParams,
    useRouteError,
} from 'react-router-dom';

import logo from '../../public/chapy192-beta.png';

import PropTypes from 'prop-types';

const Error = ({manualError, routerError}) => {
    const errors = {
        400: ['Bad request.', 'Probably you entered invalid chat id'],
        404: ['Not found.', 'Probably you entered invalid URL'],
        408: ['Request Timeout', 'Probably you left the page for too long.'],
        4: ['Request error.', 'Unhandled 4xx error'],
        500: ['Internal server error.', 'Probably API isn\'t set up ' +
            'correctly. Contact https://t.me/Ready_k'],
        5: ['Internal server error.',
            'Unhandled 5xx error. Contact https://t.me/Ready_k'],
    };

    let {errorCode} = useParams();
    let routerErrorData = '';

    if (manualError) {
        errorCode = manualError;
    } else if (routerError) {
        errorCode = 500;
        routerErrorData = useRouteError();
    }
    if (!Number(errorCode) || String(errorCode).length > 3) {
        location.replace('/error/500');
    } else {
        errorCode = Number(errorCode);
    }

    const simplifiedCode = Math.floor(errorCode/100);
    const errorDescription = routerErrorData || Number(errorCode) in errors ?
        errors[errorCode] :
        errors[simplifiedCode];

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
            <Typography variant='h1'> {errorCode} </Typography>
            <br />
            <Typography variant='h3'> {errorDescription[0]} </Typography>
            <Typography
                variant='h6'
                color={'secondary'}
                sx={{maxWidth: 350, mb: 5}}
                align={'center'}
                fontWeight={'regular'}
            > {errorDescription[1]} </Typography>
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
        </Box>
    );
};

Error.propTypes = {
    manualError: PropTypes.number,
    routerError: PropTypes.bool,
};

export default Error;

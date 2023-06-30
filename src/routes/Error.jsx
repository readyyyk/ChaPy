import React from 'react';
import {Box, Button, Link, Typography} from '@mui/material';
import {useParams} from 'react-router-dom';
import PropTypes from 'prop-types';

const Error = ({manualError}) => {
    // eslint-disable-next-line max-len
    const errors = {
        400: ['Bad request.', 'Probably you entered invalid chat id'],
        404: ['Not found.', 'Probably you entered invalid URL'],
        4: ['Request error.', 'Unhandled 4xx error'],
        500: ['Internal server error.', 'Probably API isn\'t set up correctly. Contact https://t.me/Ready_k'],
        5: ['Internal server error.', 'Unhandled 5xx error. Contact https://t.me/Ready_k'],
    };

    let {errorCode} = useParams();
    if (manualError) {
        errorCode = manualError;
    } else if (!Number(errorCode) || errorCode.length > 3) {
        location.replace('/error/400');
    } else {
        errorCode = Number(errorCode);
    }

    const simplifiedCode = Math.floor(errorCode/100);
    const errorDescription = Number(errorCode) in errors ?
        errors[errorCode] : errors[simplifiedCode];

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
                    <img src="/chatbin.png" alt="icon" height="96px"/>
                    <Typography variant='h6'> Home </Typography>
                </Button>
            </Link>
        </Box>
    );
};

Error.propTypes = {
    manualError: PropTypes.number,
};

export default Error;

import React from 'react';

import {
    Backdrop,
    LinearProgress,
    Typography,
    useTheme,
} from '@mui/material';

import PropTypes from 'prop-types';

const ChatBackdrop = ({isLoaded, chatId}) => {
    const theme = useTheme();
    return <Backdrop
        sx={{
            zIndex: theme.zIndex.drawer + 1,
            color: '#fff',
            flexDirection: 'column',
        }}
        open={!isLoaded}
    >
        <Typography
            variant="h2"
            align="center"
            gutterBottom
        >
            Entering <b><i>{chatId}</i></b>
        </Typography>
        <LinearProgress
            color={'info'}
            sx={{
                width: .9,
                borderRadius: 1,
            }}
        />
    </Backdrop>;
};

ChatBackdrop.propTypes = {
    isLoaded: PropTypes.bool,
    chatId: PropTypes.string,
};

export default ChatBackdrop;

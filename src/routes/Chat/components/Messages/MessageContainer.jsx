import React from 'react';

import {Container} from '@mui/material';

import MessageStack from './MessageStack.jsx';
import MessageInput from './MessageInput.jsx';

import PropTypes from 'prop-types';

const MessageContainer = ({msgs, userName, wsApi}) => {
    return <Container
        sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            height: '100svh',
            overflow: 'hidden',
            justifyContent: 'end',
            alignItems: 'center',
            p: '9rem 0 0 0',
        }}
    >
        <MessageStack msgs={msgs} currentUserName={userName}/>
        <MessageInput ws={wsApi}/>
    </Container>;
};

MessageContainer.propTypes = {
    msgs: PropTypes.arrayOf(PropTypes.any),
    userName: PropTypes.string,
    wsApi: PropTypes.object,
};

export default MessageContainer;

import React, {useEffect, useRef} from 'react';
import ServerMessage from './ServerMessage.jsx';
import UserMessage from './UserMessage.jsx';
import {Paper, Stack} from '@mui/material';
import PropTypes from 'prop-types';

const MessageStack = ({msgs, currentUserName}) => {
    const msgStack = useRef();
    useEffect(() => {
        msgStack
            .current
            ?.lastElementChild
            ?.scrollIntoView({behavior: 'smooth'});
    }, [msgs]);
    const messageElements = msgs.map((el, i) => {
        return <div key={`msg-${i}`}>
            {
                el.type === 'server' ?
                    <ServerMessage text={el.text} sender={el.sender}/> :
                    <UserMessage
                        isThisUser={el.sender===currentUserName}
                        text={el.text}
                        sender={el.sender}
                        l={i===msgs.length-1 || el.sender!==msgs[i + 1].sender}
                        f={i > 0 && el.sender !== msgs[i - 1].sender}
                    />
            }
        </div>;
    });
    return (
        <Paper
            elevation={3}
            sx={{
                width: .95,
                overflowY: 'scroll',
                py: '1rem',
            }}
        >
            <Stack
                direction='column'
                justifyContent='flex-start'
                alignItems='stretch'
                spacing={.5}
                ref={msgStack}
            >
                {messageElements}
            </Stack>
        </Paper>
    );
};

MessageStack.propTypes = {
    msgs: PropTypes.array,
    currentUserName: PropTypes.string,
};

export default MessageStack;

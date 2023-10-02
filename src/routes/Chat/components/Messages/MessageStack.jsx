import React, {useEffect, useRef} from 'react';
import ServerMessage from './ServerMessage.jsx';
import UserMessage from './UserMessage.jsx';
import {Chip, Divider, Paper, Stack} from '@mui/material';
import PropTypes from 'prop-types';
import OldMessage from './OldMessage.jsx';

const MessageStack = ({msgs, currentUserName}) => {
    const msgStack = useRef();
    useEffect(() => {
        msgStack
            .current
            ?.lastElementChild
            ?.scrollIntoView({behavior: 'smooth'});
    }, [msgs]);
    const messageElements = msgs.map((el, i) => {
        const isFirst = i === 0 || (i > 0 &&
            (msgs[i - 1].type === 'server' ||
            el.sender !== msgs[i - 1].sender));
        const isLast= i === msgs.length-1 ||
            msgs[i + 1].type === 'server' ||
            el.sender !== msgs[i + 1].sender;
        let element = el.type === 'server' ?
            <ServerMessage
                text={el.text}
                sender={el.sender}
            /> :
            <UserMessage
                isFirst={isFirst}
                isLast={isLast}
                isThisUser={el.sender===currentUserName}
                text={el.text}
                sender={el.sender}
            />;

        if (el.isOld) {
            element = (
                <OldMessage>
                    {element}
                </OldMessage>
            );
            if (i<msgs.length-1 && !msgs[i+1].isOld) {
                element = (
                    <>
                        {element}
                        <Divider sx={{my: 3}}>
                            <Chip label="New messages" sx={{color: '#c9c9c9'}}/>
                        </Divider>
                    </>
                );
            }
        }

        return (
            <div key={`msg-${i}`}>
                {
                    element
                }
            </div>
        );
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

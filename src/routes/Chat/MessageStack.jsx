import React, {useEffect, useRef} from 'react';
import ServerMessage from './serverMessage.jsx';
import UserMessage from './userMessage.jsx';
import {Stack} from '@mui/material';

const MessageStack = ({msgs}) => {
    const msgStack = useRef();
    useEffect(() => {
        msgStack
            .current
            ?.lastElementChild
            ?.scrollIntoView({behavior: 'smooth'});
    }, [msgs]);
    const messageElements = msgs.map((el, i) => {
        return <div key={`m-${i}`}>
            {el.type === 'server' ?
                <ServerMessage text={el.text} owner={el.owner}/> :
                i < msgs.length - 1 && el.owner === msgs[i + 1].owner ?
                    <UserMessage text={el.text} owner={el.owner}/> :
                    <UserMessage text={el.text} owner={el.owner} mb/>}
        </div>;
    });
    return (
        <Stack
            direction='column'
            justifyContent='flex-start'
            alignItems='stretch'
            spacing={1}
            sx={{width: 1, overflowY: 'scroll', pb: '1rem'}}
            ref={msgStack}
        >
            {messageElements}
        </Stack>
    );
};

MessageStack.propTypes = {
    msgs: Array,
};

export default MessageStack;

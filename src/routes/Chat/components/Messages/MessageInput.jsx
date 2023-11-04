import React, {useState} from 'react';

import '../../../../assets/styles/InputStyles.css';

import {
    Container,
    TextField,
    IconButton,
} from '@mui/material';

import SendIcon from '@mui/icons-material/Send';
import PropTypes from 'prop-types';

const MessageInput = ({ws}) => {
    const [inputValue, setInputValue] = useState('');
    const newMessage = (e) => {
        e.preventDefault();
        const inputValue_ = inputValue.trim();
        if (inputValue_) {
            ws.emit('message', {text: inputValue_});
            setInputValue('');
        }
    };
    const handleKeyDown = (e) => {
        if (e.ctrlKey && e.keyCode===13) {
            newMessage(e);
        }
    };
    return <Container sx={{py: 1, backgroundColor: 'transparent'}}>
        <form
            style={{display: 'flex', alignItems: 'center'}}
            onSubmit={newMessage}
            autoComplete='off'
        >
            <TextField
                multiline
                maxRows={4}
                label='Message'
                placeholder='Ctrl + Enter to send'
                sx={{
                    width: 1,
                    borderRadius: '10rem',
                }}
                autoFocus
                value={inputValue}
                inputProps={{maxLength: 800}}
                onKeyDown={(e) => handleKeyDown(e)}
                onChange={(e) => setInputValue(e.target.value)}
            />
            <IconButton
                sx={{ml: 1}}
                type={'submit'}
                onClick={newMessage}
                color='primary'
                tabIndex={2}
            >
                <SendIcon/>
            </IconButton>
        </form>
    </Container>;
};

MessageInput.propTypes = {
    addMsg: PropTypes.func,
    ws: PropTypes.object,
};

export default MessageInput;

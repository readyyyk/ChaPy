import React, {useState} from 'react';
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
    return <Container sx={{py: 1, backgroundColor: 'transparent'}}>
        <form
            style={{display: 'flex', alignItems: 'center'}}
            onSubmit={newMessage}
        >
            <TextField label='Message'
                sx={{
                    width: 1,
                    borderRadius: '10rem',
                }}
                autoFocus
                value={inputValue}
                inputProps={{maxlength: 800}}
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

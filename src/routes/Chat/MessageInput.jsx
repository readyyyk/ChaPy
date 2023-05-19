import React, {useState} from 'react';
import {
    Container,
    Box,
    TextField,
    IconButton,
} from '@mui/material';

import SendIcon from '@mui/icons-material/Send';
import PropTypes from 'prop-types';

const MessageInput = ({addMsg}) => {
    const [inputValue, setInputValue] = useState('');
    const newMessage = () => {
        if (inputValue) {
            addMsg({text: inputValue, owner: 'smb'});
            setInputValue('');
        }
    };
    return <Container sx={{py: 1}}>
        <Box sx={{display: 'flex', alignItems: 'center'}}>
            {/* TODO: form element for submission with Enter */}
            <TextField label='Message'
                sx={{width: 1}}
                tabIndex={1}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
            />
            <IconButton
                sx={{ml: 1}}
                onClick={newMessage}
                color='primary'
                tabIndex={2}
            >
                <SendIcon/>
            </IconButton>
        </Box>
    </Container>;
};

MessageInput.propTypes = {
    addMsg: PropTypes.func,
};

export default MessageInput;

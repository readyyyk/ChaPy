import React from 'react';
import {
    Button,
    Modal, Paper,
    Typography,
} from '@mui/material';
import PropTypes from 'prop-types';

const IntroModal = ({open, setIsConnected, chat}) => {
    const handleClick = () => {
        console.log('test');
        setIsConnected(true);
    };
    return (
        <Modal
            open={open}
            sx={{
                width: 1,
                height: 1,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Paper
                sx={{
                    width: 'fit-content',
                    height: 'min-content',
                    p: 3,
                }}
            >
                <Typography variant="h6" component="h2">
                    Entering <b>{chat}</b>
                </Typography>
                <Typography sx={{mt: 2}}>
                    Duis mollis, est non commodo luctus, nisi erat porttitor.
                </Typography>
                <Button
                    variant={'contained'}
                    color={'error'}
                    onClick={handleClick}
                >
                    Close
                </Button>
            </Paper>
        </Modal>
    );
};

IntroModal.propTypes = {
    open: PropTypes.bool,
    chat: PropTypes.string,
    setIsConnected: PropTypes.func,
};

export default IntroModal;

import React from 'react';
import {
    Box,
    Alert,
    Collapse,
    IconButton, useTheme,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import PropTypes from 'prop-types';

const ConnectionToast = ({isOpen, setIsOpen}) => {
    const theme = useTheme();
    setTimeout(() => setIsOpen(false), 6000);
    return (
        <Box sx={{
            position: 'fixed',
            top: '10px',
            right: '10px',
            zIndex: theme.zIndex.tooltip,
        }}>
            <Collapse in={isOpen}>
                <Alert
                    action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={() => {
                                setIsOpen(false);
                            }}
                        >
                            <CloseIcon fontSize="inherit" />
                        </IconButton>
                    }
                    severity={'info'}
                    variant={'filled'}
                >
                    Somebody is trying to connect...
                </Alert>
            </Collapse>
        </Box>
    );
};

ConnectionToast.propTypes = {
    isOpen: PropTypes.bool,
    setIsOpen: PropTypes.func,
};

export default ConnectionToast;

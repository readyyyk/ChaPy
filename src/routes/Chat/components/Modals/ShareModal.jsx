import React, {useEffect, useRef, useState} from 'react';
import {
    Box,
    IconButton,
    Modal,
    Paper,
    Stack,
    Tooltip,
    Typography,
} from '@mui/material';
import PropTypes from 'prop-types';
import LinkIcon from '@mui/icons-material/Link';

import QRCode from 'qrcode';

const ShareModal = ({open, setOpen}) => {
    const qrContainer = useRef(null);
    useEffect(()=>{
        QRCode.toString(
            location.href,
            {correctLevel: 'H'},
        ).then((data)=>{
            qrContainer.current.insertAdjacentHTML(
                'afterend',
                data,
            );
        });
    }, []);
    const [isLinkCopied, setIsLinkCopied] = useState(false);
    const copyLink = () => {
        setIsLinkCopied(true);
        setTimeout(()=>setIsLinkCopied(false), 10000);
        navigator.clipboard.writeText(location.href);
    };
    return (
        <Modal
            onClose={()=>setOpen(false)}
            open={open}
            keepMounted
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Paper sx={{width: 'fit-content', p: 3}}>
                <Typography variant={'h4'}> Share the chat </Typography>
                <Box
                    sx={{
                        w: 1,
                        display: 'flex',
                        justifyContent: 'center',
                        py: 3,
                    }}
                    ref={qrContainer}
                />
                {/* copy btn */}
                <Stack
                    direction={'row'}
                    justifyContent='center'
                    spacing={1}
                    sx={{width: 1, mt: 1}}
                >
                    <Tooltip
                        title={isLinkCopied ? 'Link copied!' : 'Copy link!'}
                        arrow
                        disableInteractive
                        componentsProps={{
                            tooltip: {
                                sx: {
                                    bgcolor: isLinkCopied ?
                                        'success.main' : 'grey.main',
                                },
                            },
                            arrow: {
                                sx: {
                                    color: isLinkCopied ?
                                        'success.main' : 'grey.main',
                                },
                            },
                        }}
                    >
                        <IconButton
                            onClick={copyLink}
                            color={'info'}
                            size={'large'}
                            sx={{
                                border: '1px solid rgba(41, 182, 246, 0.08)',
                            }}
                        >
                            <LinkIcon />
                        </IconButton>
                    </Tooltip>
                </Stack>
            </Paper>
        </Modal>
    );
};

ShareModal.propTypes = {
    open: PropTypes.bool,
    setOpen: PropTypes.func,
};

export default ShareModal;

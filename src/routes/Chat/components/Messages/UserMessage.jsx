import React from 'react';
import {
    Avatar,
    Container,
    Paper,
    useTheme,
} from '@mui/material';
import PropTypes from 'prop-types';
import {useLoaderData} from 'react-router-dom';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import './mdStyling.css';


const UserMessage = ({isThisUser, sender, text, isLast, isFirst}) => {
    const {randImgApi} = useLoaderData();

    const theme = useTheme();
    const borderRadiusValue = isThisUser ?
        `13px ${isFirst?'13px':'2px'} ${isLast?'13px':'2px'} 13px` :
        `${isFirst?'13px':'2px'} 13px 13px ${isLast?'13px':'2px'}`;
    return (
        <Container sx={{
            display: 'flex',
            flexDirection: isThisUser ? 'row-reverse' : 'row',
            justifyContent: isThisUser ? 'end' : 'start',
            alignItems: 'end',
            width: 1,
            [theme.breakpoints.down('md')]: {
                width: .96,
            },
            p: 0,
            pb: isLast ? '.5rem' : '',
        }}>
            { !isThisUser ?
                isLast ?
                    <Avatar
                        alt={sender}
                        src={randImgApi.getLink(
                            import.meta.env.VITE_RANDIMG_API_MODEL, sender,
                        )}
                        variant='soft'
                        size={'lg'}
                        sx={{
                            mr: '.5rem',
                        }}
                    /> :
                    <div style={{
                        width: '40px',
                        marginInlineEnd: '.5rem',
                    }}></div> :
                <></>
            }
            <Paper
                elevation={12}
                sx={{
                    alignItems: 'center',
                    background: isThisUser ?
                        'primary' :
                        theme.palette.mode==='dark' ?
                            theme.palette.info.dark :
                            theme.palette.info.light,
                    display: 'flex',
                    p: '.5rem 1rem',
                    maxWidth: isThisUser?'87%':'73%',
                    borderRadius: borderRadiusValue,
                    objectFit: 'contain',
                }}
            >
                <div className={'markdown'}>
                    <Markdown remarkPlugins={[remarkGfm]}>{text}</Markdown>
                </div>
            </Paper>
        </Container>
    );
};

UserMessage.propTypes = {
    isThisUser: PropTypes.bool,
    text: PropTypes.string,
    sender: PropTypes.string,
    isFirst: PropTypes.bool,
    isLast: PropTypes.bool,
};

export default UserMessage;

import React, {useState} from 'react';
import {
    Typography,
    Container,
    LinearProgress,
    Backdrop, useTheme,
} from '@mui/material';
import {useParams} from 'react-router-dom';
import Header from './Header.jsx';

import MessageInput from './MessageInput.jsx';
import MessageStack from './Messages/MessageStack.jsx';
import PropTypes from 'prop-types';
import IntroModal from './Modals/IntroModal.jsx';
import ShareModal from './Modals/ShareModal.jsx';

const Chat = ({ToggleMode}) => {
    const {chat} = useParams();
    const theme = useTheme();

    const [isLoaded, setIsLoaded] = useState(false);
    setTimeout(()=>setIsLoaded(true), 2300);

    const [user, setUser] = useState({connected: false, name: ''});

    const [isShareModalOpen, setIsShareModalOpen] = useState(false);

    const [msgs, setMsgs] = useState([
        {text: 'test connected', owner: '', type: 'server'},
        {text: 'testasd as da sdsda ', owner: 'test'},
        {text: 'test', owner: 'lorem'},
        {text: 'testasd sa dsa d sadsadsas adsddsadsdaa sdsda ', owner: 'smb'},
        {text: 'testasd jansjd sanjks dndk jansk jdnkaj sndkj a', owner: 'smb'},
        {text: 'testasd as da uja sd', owner: 'smb'},
        {text: 'test disconnected', owner: '', type: 'server'},
        {text: 'nskdjn akns d ajsndk jansk jdnkaj sndkj a', owner: 'undefined'},
        {text: 'saldmasdalsk d;lm;lm as;lm;lmasmda', owner: 'undefined'},
        {text: 'testasd sa dsa d sadsadsas adsddsadsdaa sdsda', owner: 'test'},
        {text: 'sadsadsas adsddsadsdaa sdsda testasd sa dsa d', owner: 'test'},
        {text: 'sadsadsas adasd as ddsas da dasdasd asd as da', owner: 'test'},
        {text: 'testasd as da uja sd', owner: 'yess'},
    ]);
    const addMsg = (newMessage) => setMsgs([...msgs, newMessage]);

    return (
        <>
            <Header
                ToggleMode={ToggleMode}
                setIsShareModalOpen={setIsShareModalOpen}
            />
            {
                user.connected ?
                    <Container sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: '100%',
                        height: '100svh',
                        overflow: 'hidden',
                        justifyContent: 'end',
                        alignItems: 'center',
                        p: '4.5rem 0 0 0',
                    }}
                    >
                        <MessageStack msgs={msgs} />
                        <MessageInput addMsg={addMsg}/>
                    </Container> : <></>
            }
            <Backdrop
                sx={{
                    zIndex: ()=>theme.zIndex.drawer+1,
                    color: '#fff',
                    flexDirection: 'column',
                }}
                open={!isLoaded}
            >
                <Typography
                    variant='h2'
                    align='center'
                    gutterBottom
                >
                    Entering <b><i>{chat}</i></b>
                </Typography>
                <LinearProgress
                    color={'info'}
                    sx={{
                        width: .9,
                        borderRadius: 1,
                    }}
                />
            </Backdrop>
            <IntroModal
                open={isLoaded?!user.connected:false}
                setUser={setUser}
                chat={chat}
            />
            <ShareModal open={isShareModalOpen} setOpen={setIsShareModalOpen}/>
        </>
    );
};

Chat.propTypes = {
    ToggleMode: PropTypes.func,
};

export default Chat;

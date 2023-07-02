import React, {
    useEffect,
    useState,
} from 'react';

import {
    Typography,
    Container,
    LinearProgress,
    Backdrop,
    useTheme,
} from '@mui/material';

import {
    useLoaderData,
    useParams,
} from 'react-router-dom';

import Header from './Header.jsx';
import MessageInput from './MessageInput.jsx';
import MessageStack from './Messages/MessageStack.jsx';
import IntroModal from './Modals/IntroModal.jsx';
import ShareModal from './Modals/ShareModal.jsx';

import PropTypes from 'prop-types';

const Chat = () => {
    const {chat} = useParams();
    const theme = useTheme();
    const {chatbinApi, wsApi} = useLoaderData();

    const [isShareModalOpen, setIsShareModalOpen] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    setTimeout(()=>setIsLoaded(true), 2300);

    wsApi.on('connection', (e)=>console.log(e));
    wsApi.addDataChecker('connection', ()=>true);
    wsApi.addDataChecker('message', ()=>true);

    const [user, setUser] = useState({connected: false, name: ''});
    useEffect(()=>{
        wsApi.emit('connection',
            {
                detail: user.name? 'connected' : 'trying to connect',
                name: user.name,
            },
        );
    }, [user.name]);

    const [msgs, setMsgs] = useState([]);
    const addMsg = (newMessage) => {
        setMsgs([...msgs, newMessage]);
    };
    useEffect(()=>{
        wsApi.on('message', (data)=>{
            addMsg({
                text: data.text,
                sender: data.sender || user.name,
            });
        });
    }, [msgs]);

    return (
        <>
            <Header
                setIsShareModalOpen={setIsShareModalOpen}
            />
            {/* TODO: scrollable user list */}
            {
                user.connected ?
                    <Container
                        sx={{
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
                        <MessageStack msgs={msgs} currentUserName={user.name}/>
                        <MessageInput ws={wsApi}/>
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
                chatbinApi={chatbinApi}
            />
            <ShareModal open={isShareModalOpen} setOpen={setIsShareModalOpen}/>
        </>
    );
};

Chat.propTypes = {
    ToggleMode: PropTypes.func,
};

export default Chat;

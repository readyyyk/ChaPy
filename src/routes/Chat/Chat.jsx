import React, {useEffect, useState} from 'react';
import {
    Typography,
    Container,
    LinearProgress,
    Backdrop,
    useTheme,
} from '@mui/material';
import {useParams} from 'react-router-dom';
import Header from './Header.jsx';

import MessageInput from './MessageInput.jsx';
import MessageStack from './Messages/MessageStack.jsx';
import PropTypes from 'prop-types';
import IntroModal from './Modals/IntroModal.jsx';
import ShareModal from './Modals/ShareModal.jsx';

import ChatBinApi from './ChatbinApi.js';
import SocketApi from '@raedyk/socketapi';

const Chat = ({ToggleMode}) => {
    const {chat} = useParams();
    const theme = useTheme();

    if (!/^[a-zA-Z]{5}$/.test(chat)) {
        console.log('smth');
        location.replace('/error/400');
    }

    const [chatbinApi, setChatbinApi] = useState(null);
    const [ws, setWs] = useState(null);
    useEffect(()=>{
        const newChatbinApi = new ChatBinApi(
            chat,
            new URL(import.meta.env.VITE_CHATBIN_API_LINK),
        );
        setChatbinApi(newChatbinApi);

        const newWs = new SocketApi(newChatbinApi.wsLink);
        setWs(newWs);

        if (!newWs && !newChatbinApi) {
            location.replace('/error/500');
        }

        newWs.on('connection', (e)=>console.log(e));
        newWs.addDataChecker('connection', ()=>true);
        newWs.addDataChecker('message', ()=>true);
        // TODO: if some API is not connected - abort to some 500 page
    }, []);

    const [isLoaded, setIsLoaded] = useState(false);
    setTimeout(()=>setIsLoaded(true), 2300);

    const [user, setUser] = useState({connected: false, name: ''});
    useEffect(()=>{
        ws?.emit('connection', {detail: 'connected', name: user.name});
        ws?.on('message', (data)=>{
            addMsg({
                text: data.text,
                sender: data.sender || user.name,
            });
        });
    }, [user.name]);

    const [isShareModalOpen, setIsShareModalOpen] = useState(false);

    const [msgs, setMsgs] = useState([]);
    const addMsg = (newMessage) => {
        setMsgs([...msgs, newMessage]);
    };
    useEffect(()=>{
        ws?.on('message', (data)=>{
            addMsg({
                text: data.text,
                sender: data.sender || user.name,
            });
        });
    }, [msgs]);

    return (
        <>
            <Header
                ToggleMode={ToggleMode}
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
                        <MessageInput ws={ws}/>
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

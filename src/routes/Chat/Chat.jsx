import React, {
    useEffect,
    useState,
} from 'react';

import {
    useLoaderData,
    useParams,
} from 'react-router-dom';

import ChatBackdrop from './Backdrop/ChatBackdrop.jsx';
import Header from './Header/Header.jsx';
import MessageContainer from './Messages/MessageContainer.jsx';
import IntroModal from './Modals/IntroModal.jsx';
import ShareModal from './Modals/ShareModal.jsx';

const Chat = () => {
    const {chat} = useParams();
    const {chatbinApi, wsApi} = useLoaderData();

    const [isShareModalOpen, setIsShareModalOpen] = useState(false);

    const [isLoaded, setIsLoaded] = useState(false);
    setTimeout(()=>setIsLoaded(true), 2300);

    wsApi.on('connection', (e)=>console.log(e));
    wsApi.addDataChecker('connection', ()=> true);
    wsApi.addDataChecker('message', ()=> true);

    const [user, setUser] = useState({connected: false, name: ''});
    useEffect(()=>{
        wsApi.emit('connection',
            {
                detail: user.connected ? 'connected' : 'trying to connect',
                name: user.name,
            },
        );
    }, [user.connected]);

    const [msgs, setMsgs] = useState([]);
    useEffect(()=>{
        wsApi.on('message', (data) => {
            setMsgs([...msgs, {
                text: data.text,
                sender: data.sender || user.name,
            }]);
        });
    }, [msgs, user.name]);

    return (
        <>
            <Header
                setIsShareModalOpen={setIsShareModalOpen}
            />
            {/* TODO: scrollable user list */}
            {
                user.connected &&
                    <MessageContainer
                        msgs={msgs}
                        userName={user.name}
                        wsApi={wsApi}
                    />
            }
            <ChatBackdrop
                isLoaded={isLoaded}
                chatId={chat}
            />
            <IntroModal
                open={isLoaded ? !user.connected : false}
                setUser={setUser}
                chat={chat}
                chatbinApi={chatbinApi}
            />
            <ShareModal
                open={isShareModalOpen}
                setOpen={setIsShareModalOpen}
            />
        </>
    );
};

export default Chat;

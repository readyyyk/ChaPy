import React, {
    useCallback,
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
import ConnectionToast from './Toasts/ConnectionToast.jsx';

const Chat = () => {
    const {chat} = useParams();
    const {chatbinApi, wsApi} = useLoaderData();

    const [isConnectionToastOpen, setIsConnectionToastOpen] = useState(false);
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
    const addMsg = {
        message: useCallback(() => (data) => {
            setMsgs([...msgs, {
                text: data.text,
                sender: data.sender || user.name,
            }]);
        }, [msgs, user.name])(),
        connection: useCallback(() => (data) => {
            console.log(data);
            if (data.detail === 'trying to connect') {
                setIsConnectionToastOpen(true);
            } else {
                setMsgs([...msgs, {
                    text: data.name + ' ' + data.detail,
                    sender: data.name,
                    type: 'server',
                }]);
            }
        }, [msgs])(),
    };
    wsApi.on('message', addMsg.message);
    wsApi.on('connection', (data)=>{
        console.log(data); addMsg.connection(data);
    });

    return (
        <>
            <Header
                setIsShareModalOpen={setIsShareModalOpen}
            />
            {/* TODO: scrollable user list */}
            {
                user.connected &&
                    <>
                        <MessageContainer
                            msgs={msgs}
                            userName={user.name}
                            wsApi={wsApi}
                        />
                        <ConnectionToast
                            isOpen={isConnectionToastOpen}
                            setIsOpen={setIsConnectionToastOpen}
                        />
                    </>
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

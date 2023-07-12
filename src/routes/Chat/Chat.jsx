import React, {
    useCallback,
    useEffect,
    useState,
} from 'react';

import {
    useLoaderData,
    useParams,
} from 'react-router-dom';

import ChatBackdrop from './components/Backdrop/ChatBackdrop.jsx';
import Header from './components/Header/Header.jsx';
import MessageContainer from './components/Messages/MessageContainer.jsx';
import IntroModal from './components/Modals/IntroModal.jsx';
import ShareModal from './components/Modals/ShareModal.jsx';
import ConnectionToast from './components/Toasts/ConnectionToast.jsx';

const Chat = () => {
    const {chat} = useParams();
    const {chatbinApi, wsApi} = useLoaderData();

    const [isConnectionToastOpen, setIsConnectionToastOpen] = useState(false);
    const [isShareModalOpen, setIsShareModalOpen] = useState(false);

    const [isLoaded, setIsLoaded] = useState(false);
    setTimeout(()=>setIsLoaded(true), 100);

    wsApi.addDataChecker('connection', ()=> true);
    wsApi.addDataChecker('message', ()=> true);

    const [userList, setUserList] = useState([]);
    const addUserToList = (name) => setUserList([...userList, name]);
    const removeUserFromList = (name) => setUserList(
        userList.filter((el)=>el!==name));

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
    const actions = {
        message: useCallback(() => (data) => {
            setMsgs([...msgs, {
                text: data.text,
                sender: data.sender || user.name,
            }]);
        }, [msgs, user.connected])(),
        connection: useCallback(() => (data) => {
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
    wsApi.on('message', actions.message);
    wsApi.on('connection', (data)=>{
        if (data.detail === 'connected') {
            addUserToList(data.name);
        } else if (data.detail === 'disconnected') {
            removeUserFromList(data.name);
        }
        actions.connection(data);
    });

    return (
        <>
            <Header
                setIsShareModalOpen={setIsShareModalOpen}
                userList={userList}
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
                setUserList={setUserList}
            />
            <ShareModal
                open={isShareModalOpen}
                setOpen={setIsShareModalOpen}
            />
        </>
    );
};

export default Chat;

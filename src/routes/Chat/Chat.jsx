import React, {
    lazy,
    Suspense,
    useCallback,
    useEffect,
    useState,
} from 'react';

import {
    useLoaderData,
    useNavigate,
} from 'react-router-dom';

import Header from './components/Header/Header.jsx';
import MessageContainer from './components/Messages/MessageContainer.jsx';
import IntroModal from './components/Modals/IntroModal.jsx';
const ShareModal = lazy(()=>import('./components/Modals/ShareModal.jsx'));
import ConnectionToast from './components/Toasts/ConnectionToast.jsx';

import {LinearProgress} from '@mui/material';

const Chat = () => {
    const navigate = useNavigate();
    const {wsApi} = useLoaderData();

    const [isConnectionToastOpen, setIsConnectionToastOpen] = useState(false);
    const [isShareModalOpen, setIsShareModalOpen] = useState(false);

    const [user, setUser] = useState({connected: false, name: ''});
    useEffect(()=>{
        wsApi.emit('connection', {
            detail: user.connected ? 'connected' : 'trying to connect',
            name: user.name,
        });
    }, [user.connected]);

    const [userList, setUserList] = useState([]);
    const addUserToList = (name) => setUserList([...userList, name]);
    const removeUserFromList = (name) => setUserList(
        userList.filter((el)=>el!==name));

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

    wsApi.addDataChecker('connection', ()=> true);
    wsApi.addDataChecker('message', ()=> true);
    wsApi.socket.onclose = () => navigate('/error/408');

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
            <IntroModal
                open={!user.connected}
                setUser={setUser}
                setUserList={setUserList}
            />
            <Suspense fallback={<LinearProgress />}>
                <ShareModal
                    open={isShareModalOpen}
                    setOpen={setIsShareModalOpen}
                />
            </Suspense>
        </>
    );
};

export default Chat;

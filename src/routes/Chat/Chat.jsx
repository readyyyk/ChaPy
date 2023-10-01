import React, {
    lazy,
    Suspense,
    useEffect,
    useState,
} from 'react';

import {useNavigate, useParams} from 'react-router-dom';

import Header from './components/Header/Header.jsx';
import MessageContainer from './components/Messages/MessageContainer.jsx';
import IntroModal from './components/Modals/IntroModal.jsx';
const ShareModal = lazy(()=>import('./components/Modals/ShareModal.jsx'));
import ConnectionToast from './components/Toasts/ConnectionToast.jsx';

import {LinearProgress} from '@mui/material';
import LocalData from './APIs/localData.js';


const Chat = () => {
    const navigate = useNavigate();
    const {chat} = useParams();
    document.title = `ChaPy - ${chat}`;

    const [msgs, setMsgs] = useState([]);
    /**
     * global function to add messages to state
     * @param {string} text - text of message
     * @param {string} sender - sender of message or "" if u sent this
     * @param {'server'|'message'} type - type of message
     * @return {void}
     * */
    self.addMessage = (text, sender, type) => setMsgs([...msgs, {
        text: text,
        sender: sender,
        type: type,
    }]);

    const [isConnectionToastOpen, setIsConnectionToastOpen] = useState(false);
    const [isShareModalOpen, setIsShareModalOpen] = useState(false);

    const [user, setUser] = useState({connected: false, name: ''});

    const [wsApi, setWsApi] = useState(null);
    const [userList, setUserList] = useState([]);
    self.addUserToList = (name) => setUserList([...userList, name]);
    self.removeUserFromList = (name) => setUserList(
        userList.filter((el)=>el!==name));

    const actions = {
        message: (data) => {
            self.addMessage(data.text, data.sender || user.name, 'message');
        },
        connection: (data) => {
            if (data.detail === 'connected') {
                self.addUserToList(data.name);
            } else if (data.detail === 'disconnected') {
                self.removeUserFromList(data.name);
            }
            self.addMessage(data.name + ' ' + data.detail, data.name, 'server');
        },
    };

    useEffect(()=> {
        if (!wsApi) {
            return;
        }

        window.addEventListener('beforeunload', ()=>{
            new LocalData(chat).save({
                event: 'connection',
                data: JSON.stringify({
                    detail: 'disconnected',
                    name: user.name,
                }),
            });
        });

        wsApi.addDataChecker('connection', ()=> true);
        wsApi.addDataChecker('message', ()=> true);
        wsApi.socket.onclose = () => navigate('/error/408');

        wsApi.on('message', actions.message);
        wsApi.on('connection', actions.connection);
    }, [wsApi]);

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
                setWsApi={setWsApi}
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

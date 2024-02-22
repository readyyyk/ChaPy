import React, {
    lazy,
    Suspense,
    useEffect,
    useState,
} from 'react';
import {
    useNavigate,
    useParams,
} from 'react-router-dom';

// 3rd-party components
import {LinearProgress} from '@mui/material';

// own components
import Header from './components/Header/Header.jsx';
import IntroModal from './components/Modals/IntroModal.jsx';
import ConnectionToast from './components/Toasts/ConnectionToast.jsx';
import MessageContainer from './components/Messages/MessageContainer.jsx';
const ShareModal = lazy(()=>import('./components/Modals/ShareModal.jsx'));

// not components
import LocalData from './APIs/localData.js';
import setupWsApi from './setupWsApi.js';

const Chat = () => {
    const {chat} = useParams();
    const navigate = useNavigate();

    document.title = `B-ChaPy - ${chat}`;

    const [wsApi, setWsApi] = useState(null);
    const [msgs, setMsgs] = useState([]);
    const [user, setUser] = useState({connected: false, name: '', connTime: -1});

    const [isShareModalOpen, setIsShareModalOpen] = useState(false);
    const [isConnectionToastOpen, setIsConnectionToastOpen] = useState(false);

    const [userList, setUserList] = useState([]);
    const addUserToList = ({name, isActive}) =>
        setUserList((prev) => [...prev, {name, isActive}]);
    const removeUserFromList = (name) => setUserList(
        (prev) => prev.filter((el)=>el.name!==name),
    );
    const setUserActivity = (name, isActive) => setUserList(
        (prev) => prev.map((el)=> {
            if (el.name === name) {
                el.isActive = isActive;
            }
            return el;
        }),
    );

    useEffect(() => {
        if (!wsApi) {
            return;
        }

        setupWsApi(
            wsApi,
            chat,
            user.connTime, user.name,
            addUserToList, removeUserFromList, setUserActivity,
            navigate,
            setMsgs,
        );

        return () => {
            new LocalData(chat).save({
                event: 'connection',
                data: JSON.stringify({
                    detail: 'disconnected',
                    name: user.name,
                }),
            });
            wsApi.socket.close(1000);
        };
    }, [wsApi]);

    return (
        <>
            <Header
                setIsShareModalOpen={setIsShareModalOpen}
                userList={userList}
                wsApi={wsApi}
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

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
    document.title = `B-ChaPy - ${chat}`;

    const [user, setUser] = useState({connected: false, name: '', connTime: -1});

    const actions = {
        message: (data) => {
            return {
                ...data,
                text: data.text,
                sender: data.sender || user.name,
                type: 'message',
            };
        },
        connection: (data) => {
            return {
                ...data,
                text: data.name + ' ' + data.detail,
                sender: data.name,
                type: 'server',
            };
        },
    };

    const [msgs, setMsgs] = useState([]);
    /**
     * global function to add messages to state
     * @param {Array<{
     *      text: string,
     *      sender: string,
     *      type: ('server'|'message'),
     *      isOld: boolean,
     * }|
     * {
     *      text: string,
     *      sender: string,
     *      type: ('server'|'message'),
     * }>} data
     * @return {void}
     * */
    const addMessages = (data) => setMsgs((prev) => [...prev, ...data]);
    /**
     * global function to add OLD messages to state
     * @param {{name: string, data: {id: {event: string, data: string}}}} [data]
     * @return {void}
     * */
    self.addOldMessages = (data) => {
        // eslint-disable-next-line max-len
        const uuidRegex = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/;
        const unixRegex = /^[0-9]{13}_$/;

        const histCurrent = new LocalData(chat).get();
        const histMerged = {
            ...data?.data,
            ...histCurrent,
        };
        let histMsgsList = [];

        for (const key in histMerged) {
            if (!uuidRegex.test(key) && !unixRegex.test(key)) {
                continue;
            }
            if (histMerged[key].time >= user.connTime) {
                continue;
            }
            const el = histMerged[key];
            histMsgsList.push(el);
        }
        histMsgsList = histMsgsList.sort((a, b) => a.time - b.time);
        histMsgsList = histMsgsList.map((el)=> {
            const parsed = JSON.parse(el.data);
            return actions[el.event](parsed);
        });
        setMsgs((prev)=> {
            const result = [...histMsgsList, ...prev.filter((el)=>!el.isOld)];
            result.forEach((el, i) => {
                if (unixRegex.test(el.id) && i < result.length-1 &&
                    el?.detail === result[i+1]?.detail) {
                    const compareKeys = Object.keys(el).filter((el)=>el!=='id');
                    for (const compareKey of compareKeys) {
                        if (el[compareKey] !== result[i+1][compareKey]) {
                            return;
                        }
                    }
                    result.splice(i, 1);
                }
            });
            return result;
        },
        );
    };

    const [isConnectionToastOpen, setIsConnectionToastOpen] = useState(false);
    const [isShareModalOpen, setIsShareModalOpen] = useState(false);

    const [wsApi, setWsApi] = useState(null);
    const [userList, setUserList] = useState([]);
    self.addUserToList = (name) => setUserList([...userList, name]);
    self.removeUserFromList = (name) => setUserList(
        userList.filter((el)=>el!==name));

    useEffect(()=> {
        if (!wsApi) {
            return;
        }

        self.addOldMessages();

        wsApi.addDataChecker('connection', ()=> true);
        wsApi.addDataChecker('message', ()=> true);
        wsApi.addDataChecker('history', ()=> true);
        wsApi.socket.onclose = (e) => {
            if (e.code===1000) {
                return;
            }
            navigate('/error/408');
        };

        wsApi.on('history', (data)=> {
            console.log(data);
            self.addOldMessages(data);
        });
        wsApi.on('message', (data)=>addMessages([actions.message(data)]));
        wsApi.on('connection', (data)=> {
            addMessages([actions.connection(data)]);
            if (data.detail === 'connected') {
                self.addUserToList(data.name);
            } else if (data.detail === 'disconnected') {
                self.removeUserFromList(data.name);
            }
        });
        window.onbeforeunload = ()=> {
            if (!/^\/[a-zA-Z]{5}$/.test(location.pathname)) {
                return;
            }
            new LocalData(chat).save({
                event: 'connection',
                data: JSON.stringify({
                    detail: 'disconnected',
                    name: user.name,
                }),
            });
        };
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

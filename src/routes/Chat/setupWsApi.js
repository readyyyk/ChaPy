import ReactGA from 'react-ga4';
import {toast} from 'react-toastify';

import {
    actions,
    addMessages,
    addOldMessages,
} from './messageManipulating.js';
import LocalData from './APIs/localData.js';
import notification, {
    askNotificationPermission,
} from './APIs/notifications.js';
import RandImgApi from 'randimg';


const randImgApi = new RandImgApi(import.meta.env.VITE_RANDIMG_API_LINK);

/**
 * Function to set up created wsApi
 * @param {SSocketApi} wsApi
 * @param {string} chatId
 * @param {number} userConnTime
 * @param {string} userName
 * @param {function} addUserToList
 * @param {function} removeUserFromList
 * @param {function} setUserActivity
 * @param {function} navigate
 * @param {function} setMsgs
 * */
const setupWsApi = (
    wsApi,
    chatId,
    userConnTime, userName,
    addUserToList, removeUserFromList, setUserActivity,
    navigate,
    setMsgs,
) => {
    addOldMessages(null, chatId, userConnTime, setMsgs);
    askNotificationPermission();

    ReactGA.event({
        category: 'Connection',
        action: 'Connected to chat',
    });

    const sendFocusActivity = () => {
        wsApi.emit('activity', {
            detail: 'focus',
            sender: userName,
            value: !document.hidden,
        });
    };

    wsApi.addDataChecker('connection', ()=>true);
    wsApi.addDataChecker('message', ()=> {
        ReactGA.event({
            category: 'Message',
            action: 'Sent message',
        });
        return true;
    });
    wsApi.addDataChecker('history', ()=>true);
    wsApi.addDataChecker('activity', ()=>true);

    wsApi.socket.onclose = (e) => {
        document.removeEventListener('visibilitychange', sendFocusActivity);
        notification('Disconnected', `You disconnected from chat ${chatId}`);
        if (e.code===1000) {
            return;
        }
        console.log(e);
        navigate(`/error/${e.code}?back=${chatId}`);
    };

    document.addEventListener('visibilitychange', sendFocusActivity);
    wsApi.on('activity', (data) => {
        if (data.detail === 'focus') {
            setUserActivity(data.sender, data.value);
        }
    });
    wsApi.on('history', (data) => {
        toast.success(
            `${data.name} shared history with you!`,
            {toastId: 'got_history_share'});

        notification('Got history',
            `You received history from ${data.name}`,
            randImgApi.getLink(import.meta.env.VITE_RANDIMG_API_MODEL, data.name),
        );
        addOldMessages(data, chatId, userConnTime, setMsgs);
    });
    wsApi.on('message', (data) => {
        if ('sender' in data) {
            try {
                notification(
                    data.sender,
                    data.text,
                    randImgApi.getLink(
                        import.meta.env.VITE_RANDIMG_API_MODEL,
                        data.sender,
                    ),
                    'interaction',
                );
            } catch (e) {
                console.error(e);
            }
        }
        ReactGA.event({
            category: 'Messages',
            action: 'Received message',
        });
        addMessages([actions.message(data, userName)], setMsgs);
    });
    wsApi.on('connection', (data) => {
        addMessages([actions.connection(data)], setMsgs);
        notification(
            '',
            `${data.name} ${data.detail}`,
            randImgApi.getLink(import.meta.env.VITE_RANDIMG_API_MODEL, data.name),
            'interaction',
        );
        if (data.detail === 'connected') {
            addUserToList({name: data.name, isActive: true});
        } else if (data.detail === 'disconnected') {
            removeUserFromList(data.name);
        }
    });
    window.onbeforeunload = ()=> {
        if (!/^\/[a-zA-Z]{5}$/.test(location.pathname)) {
            return;
        }
        notification('Disconnected', `You disconnected from chat ${chatId}`);
        new LocalData(chatId).save({
            event: 'connection',
            data: JSON.stringify({
                detail: 'disconnected',
                name: userName,
            }),
        });
    };
};

export const createWsApiGlobalCallback = (currentUserName, chatId) => {
    const localData = new LocalData(chatId);
    return (data)=> {
        if (['history', 'activity'].includes(data.event)) {
            return;
        }
        const currentData = JSON.parse(data.data);
        if (!('sender' in currentData)) {
            currentData.sender = currentUserName;
        }
        data.data = JSON.stringify(currentData);
        localData.save(data);
    };
};


export default setupWsApi;

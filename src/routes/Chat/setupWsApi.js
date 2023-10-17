import ReactGA from 'react-ga4';

import {
    actions,
    addMessages,
    addOldMessages,
} from './messageManipulating.js';
import LocalData from './APIs/localData.js';


/**
 * Function to set up created wsApi
 * @param {SSocketApi} wsApi
 * @param {string} chatId
 * @param {number} userConnTime
 * @param {string} userName
 * @param {function} addUserToList
 * @param {function} removeUserFromList
 * @param {function} navigate
 * @param {function} setMsgs
 * */
const setupWsApi = (
    wsApi,
    chatId,
    userConnTime, userName,
    addUserToList, removeUserFromList,
    navigate,
    setMsgs,
) => {
    addOldMessages(null, chatId, userConnTime, setMsgs);

    ReactGA.event({
        category: 'Connection',
        action: 'Connected to chat',
    });

    wsApi.addDataChecker('connection', ()=>true);
    wsApi.addDataChecker('message', ()=> {
        ReactGA.event({
            category: 'Message',
            action: 'Sent message',
        });
        return true;
    });
    wsApi.addDataChecker('history', ()=>true);
    wsApi.socket.onclose = (e) => {
        if (e.code===1000) {
            return;
        }
        console.log(e);
        navigate(`/error/${e.code}?back=${chatId}`);
    };

    wsApi.on('history', (data) => {
        console.log(data);
        addOldMessages(data, chatId, userConnTime, setMsgs);
    });
    wsApi.on('message', (data) => {
        ReactGA.event({
            category: 'Messages',
            action: 'Received message',
        });
        addMessages([actions.message(data, userName)], setMsgs);
    });
    wsApi.on('connection', (data) => {
        addMessages([actions.connection(data)], setMsgs);
        if (data.detail === 'connected') {
            addUserToList(data.name);
        } else if (data.detail === 'disconnected') {
            removeUserFromList(data.name);
        }
    });
    window.onbeforeunload = ()=> {
        if (!/^\/[a-zA-Z]{5}$/.test(location.pathname)) {
            return;
        }
        new LocalData(chatId).save({
            event: 'connection',
            data: JSON.stringify({
                detail: 'disconnected',
                name: userName,
            }),
        });
    };
};


export default setupWsApi;

import React from 'react';
import ChatBinApi from './routes/Chat/APIs/ChatbinApi.js';
import {createBrowserRouter} from 'react-router-dom';
import Home from './routes/Home.jsx';
import Error from './routes/Error.jsx';
import Chat from './routes/Chat/Chat.jsx';
import SocketApi from '@raedyk/socketapi';
import EmptyChat from './routes/EmptyChat.jsx';

const chatLoader = ({params})=>{
    if (!/^[a-zA-Z]{5}$/.test(params.chat)) {
        location.replace('/error/400');
    }
    const chatbinApi = new ChatBinApi(
        params.chat,
        new URL(import.meta.env.VITE_CHATBIN_API_LINK),
    );
    if (!chatbinApi) {
        location.replace('/error/500');
    }
    const wsApi = new SocketApi(chatbinApi.wsLink);
    if (!wsApi) {
        location.replace('/error/500');
    }
    return {chatbinApi, wsApi};
};

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />,
    },
    {
        path: '/chat',
        element: <EmptyChat />,
    },
    {
        path: '/error/:errorCode',
        element: <Error/>,
    },
    {
        caseSensitive: true,
        path: '/:chat',
        element: <Chat />,
        loader: chatLoader,
        errorElement: <Error />,
    },
    {
        path: '/*',
        element: <Error manualError={404}/>,
    },
]);

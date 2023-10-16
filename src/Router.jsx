import React, {
    lazy,
    Suspense,
} from 'react';

import {createBrowserRouter} from 'react-router-dom';

import App from './App.jsx';
import Home from './routes/Home.jsx';
import Error from './routes/Error.jsx';
const Chat = lazy(()=>import('./routes/Chat/Chat.jsx'));
const EmptyChat = lazy(()=>import('./routes/EmptyChat.jsx'));
const QrScanner = lazy(()=>import('./routes/QrScanner.jsx'));

import Loading from './Loading.jsx';

import ChapyAPI from './routes/Chat/APIs/chapyAPI.js';
import RandImgApi from 'randimg';
import Settings from './routes/Settings/Settings.jsx';

const letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
const randomChatId = () =>
    Array(5).fill('').reduce((acc)=>
        acc+letters[Math.floor(Math.random()*letters.length)], '');

const chatLoader = ({params})=>{
    if (!/^[a-zA-Z]{5}$/.test(params.chat)) {
        location.replace('/error/400');
    }

    const chapyApi = new ChapyAPI(
        new URL(import.meta.env.VITE_CHAPY_API_LINK),
        params.chat,
    );
    if (!chapyApi) {
        location.replace('/error/500');
    }

    const randImgApi = new RandImgApi(import.meta.env.VITE_RANDIMG_API_LINK);
    if (!randImgApi) {
        location.replace('/error/500');
    }

    return {chapyApi, randImgApi};
};

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '/',
                element: <Home />,
            },
            {
                path: 'chat',
                element: <Suspense fallback={<Loading />}><EmptyChat/></Suspense>,
            },
            {
                path: 'scanner',
                element: <Suspense fallback={<Loading />}><QrScanner/></Suspense>,
            },
            {
                path: 'settings',
                element: <Suspense fallback={<Loading />}><Settings/></Suspense>,
            },
            {
                path: 'new_chat',
                element: <Loading />,
                loader: ()=>new Response('',
                    {status: 302, headers: {Location: '/'+randomChatId()}}),
            },
            {
                path: 'error/:errorCode',
                element: <Error/>,
                errorElement: <Error routerError/>,
            },
            {
                path: ':chat',
                element: <Suspense fallback={<Loading />}><Chat /></Suspense>,
                loader: chatLoader,
                errorElement: <Error routerError/>,
            },
            {
                path: '*',
                element: <Error manualError={404}/>,
            },
        ],
    },
]);

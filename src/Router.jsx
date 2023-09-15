import React, {
    lazy,
    Suspense,
} from 'react';

import {createBrowserRouter} from 'react-router-dom';

import Home from './routes/Home.jsx';
const Error = lazy(()=>import('./routes/Error.jsx'));
const Chat = lazy(()=>import('./routes/Chat/Chat.jsx'));
const EmptyChat = lazy(()=>import('./routes/EmptyChat.jsx'));

import Loading from './Loading.jsx';

import ChapyAPI from './routes/Chat/APIs/chapyAPI.js';
import RandImgApi from 'randimg';

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
        element: <Home />,
    },
    {
        path: '/chat',
        element: <Suspense fallback={<Loading />}><EmptyChat/></Suspense>,
    },
    {
        path: '/error/:errorCode',
        element: <Suspense fallback={<Loading />}><Error/></Suspense>,
        errorElement: <Error routerError/>,
    },
    {
        path: '/:chat',
        element: <Suspense fallback={<Loading />}><Chat /></Suspense>,
        loader: chatLoader,
        errorElement: <Suspense fallback={<Loading />}><Error routerError/></Suspense>,
    },
    {
        path: '/*',
        element: <Suspense fallback={<Loading />}><Error manualError={404}/></Suspense>,
    },
]);

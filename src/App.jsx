import React, {
    useEffect,
} from 'react';

import 'react-toastify/dist/ReactToastify.css';

import './assets/styles/ScrollStyles.css';
import ThemeWithDarkModeContextProvider
    from './hooks/ThemeWithDarkModeContextProvider.jsx';

import './assets/styles/selection.css';
import {Outlet, useLocation} from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import {useTheme} from '@mui/material';

import ReactGA from 'react-ga4';


const _ToastProvider = () => {
    const theme = useTheme();
    return <ToastContainer
        hideProgressBar
        position='bottom-right'
        theme={'colored'}
        toastStyle={{
            'color': theme.palette.mode==='dark' ? '#000' : '#fff',
        }}
    />;
};

const App = () => {
    const location = useLocation();
    useEffect(() => {
        ReactGA.send({
            hitType: 'pageview',
            page: location.pathname + location.search,
            title: location.pathname==='/' ?
                'index' : location.pathname.replace('/', '') + location.search,
        });
    }, [location]);

    return (
        <ThemeWithDarkModeContextProvider>
            <Outlet />
            <_ToastProvider />
        </ThemeWithDarkModeContextProvider>
    );
};

export default App;

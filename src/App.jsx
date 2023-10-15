import React from 'react';

import 'react-toastify/dist/ReactToastify.css';

import './ScrollStyles.css';
import ThemeWithDarkModeContextProvider
    from './hooks/ThemeWithDarkModeContextProvider.jsx';

import './selection.css';
import {Outlet} from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import {useTheme} from '@mui/material';

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
    return (
        <ThemeWithDarkModeContextProvider>
            <Outlet />
            <_ToastProvider />
        </ThemeWithDarkModeContextProvider>
    );
};

export default App;

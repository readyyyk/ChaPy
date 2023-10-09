import React from 'react';

import './ScrollStyles.css';
import ThemeWithDarkModeContextProvider
    from './hooks/ThemeWithDarkModeContextProvider.jsx';

import './selection.css';
import {Outlet} from 'react-router-dom';


const App = () => {
    return (
        <ThemeWithDarkModeContextProvider>
            <Outlet />
        </ThemeWithDarkModeContextProvider>
    );
};

export default App;

import React from 'react';

import './ScrollStyles.css';

import {RouterProvider} from 'react-router-dom';

import {router} from './Router.jsx';
import ThemeWithDarkModeContextProvider
    from './hooks/ThemeWithDarkModeContextProvider.jsx';

import './selection.css';


const App = () => {
    return (
        <ThemeWithDarkModeContextProvider>
            <RouterProvider router={router} />
        </ThemeWithDarkModeContextProvider>
    );
};

export default App;

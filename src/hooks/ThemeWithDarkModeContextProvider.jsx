import React, {
    useState,
    useEffect,
    useMemo,
} from 'react';

import {
    createTheme,
    CssBaseline,
    ThemeProvider,
    // useMediaQuery,
} from '@mui/material';

import {DarkModeContext} from './DarkModeContext.js';

// eslint-disable-next-line react/prop-types
const ThemeWithDarkModeContextProvider = ({children}) => {
    const [isDarkMode, setIsDarkMode] = useState(true);
    const toggleMode = () => {
        localStorage.setItem('_theme', isDarkMode?'light':'dark');
        setIsDarkMode(!isDarkMode);
    };

    // const isPreferDark = useMediaQuery('(prefers-color-scheme: dark)');
    useEffect(()=>{
        const currentIsDarkMode = localStorage.getItem('_theme');
        if (!currentIsDarkMode) {
            localStorage.setItem(
                '_theme',
                'dark', // true ? 'dark' : 'light'
            );
            return;
        }
        setIsDarkMode(localStorage.getItem('_theme')==='dark');
    }, []);

    const theme = useMemo(
        ()=>
            createTheme({
                palette: {
                    mode: isDarkMode ? 'dark' : 'light',
                },
            }), [isDarkMode],
    );

    return (
        <DarkModeContext.Provider
            value={{isDarkMode, setIsDarkMode, toggleMode}}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </DarkModeContext.Provider>
    );
};

export default ThemeWithDarkModeContextProvider;

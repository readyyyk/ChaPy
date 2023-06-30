import React, {
    useEffect,
    useMemo,
    useState,
} from 'react';
import {
    BrowserRouter,
    Route,
    Routes,
} from 'react-router-dom';
import {
    createTheme,
    CssBaseline,
    ThemeProvider,
    useMediaQuery,
} from '@mui/material';

import Home from './routes/Home.jsx';
import Chat from './routes/Chat/Chat.jsx';
import Error from './routes/Error.jsx';

import './InputStyles.css';
import './ScrollStyles.css';

const App = () => {
    const isPreferDark = useMediaQuery('(prefers-color-scheme: dark)');
    const [isDarkMode, setIsDarkMode] = useState(true);
    const ToggleMode = () => {
        localStorage.setItem('theme', !isDarkMode?'dark':'light');
        setIsDarkMode(!isDarkMode);
    };
    const theme = useMemo(
        ()=>
            createTheme({
                palette: {
                    mode: isDarkMode ? 'dark' : 'light',
                },
            }), [isDarkMode],
    );
    useEffect(() => {
        const current = localStorage.getItem('theme');
        if (!current) {
            setIsDarkMode(true);
            localStorage.setItem(
                'theme',
                isPreferDark ?
                    'dark' : 'light');
            return;
        }
        setIsDarkMode(localStorage.getItem('theme')==='dark');
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <BrowserRouter>
                <Routes>
                    <Route
                        index
                        element={<Home />}
                    />
                    <Route
                        path='/error/:errorCode'
                        element={<Error />}
                    />
                    <Route
                        caseSensitive
                        path=":chat"
                        element={
                            <Chat ToggleMode={ToggleMode}/>
                        }
                        errorElement={<Error />}
                    />
                    <Route
                        path="*"
                        element={<Error manualError={404}/>}
                    />
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    );
};

export default App;

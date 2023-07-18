import React, {
    Suspense,
    useContext,
} from 'react';
import {
    Link,
    AppBar,
    Toolbar,
    useTheme,
    Container,
    IconButton,
    CircularProgress,
} from '@mui/material';
import IosShareIcon from '@mui/icons-material/IosShare';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

import PropTypes from 'prop-types';

import {DarkModeContext} from '../../../../hooks/DarkModeContext.js';
import UserList from './UserList/UserList.jsx';

import icon from '../../../../assets/favicon.png';

const Header = ({setIsShareModalOpen, userList}) => {
    const theme = useTheme();
    const {toggleMode} = useContext(DarkModeContext);

    return (
        <AppBar
            position="fixed"
            elevation={4}
        >
            <Container sx={{width: 'md', p: 0}}>
                <Toolbar
                    variant="regular"
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        p: 2,
                    }}
                >
                    <Link
                        variant="h5"
                        href="/"
                        underline={'hover'}
                        color={'inherit'}
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <Suspense fallback={<CircularProgress size={40}/>}>
                            <img src={icon} alt="icon" height="40px"/>
                        </Suspense>
                        <span>Chat<i>Bin</i></span>
                    </Link>
                    <div>
                        <IconButton
                            sx={{ml: 1}}
                            onClick={toggleMode}
                            color="inherit"
                        >
                            {theme.palette.mode === 'dark' ?
                                <Brightness7Icon /> : <Brightness4Icon />}
                        </IconButton>
                        <IconButton
                            sx={{ml: 1}}
                            onClick={()=>setIsShareModalOpen(true)}
                            color="inherit"
                        >
                            <IosShareIcon />
                        </IconButton>
                    </div>
                </Toolbar>
            </Container>
            <UserList userList={userList}/>
        </AppBar>
    );
};

Header.propTypes = {
    setIsShareModalOpen: PropTypes.func,
    userList: PropTypes.arrayOf(PropTypes.string),
};

export default Header;

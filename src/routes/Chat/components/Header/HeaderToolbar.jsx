import React, {
    Suspense,
    useContext,
} from 'react';
import {
    CircularProgress,
    IconButton,
    Link,
    Toolbar,
    Typography,
    useTheme,
} from '@mui/material';

import icon from '../../../../assets/favicon.ico';
import IosShareIcon from '@mui/icons-material/IosShare';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import ScheduleSendIcon from '@mui/icons-material/ScheduleSend';

import {useParams} from 'react-router-dom';

import PropTypes from 'prop-types';

import {DarkModeContext} from '../../../../hooks/DarkModeContext.js';
import LocalData from '../../APIs/localData.js';


const HeaderToolbar = ({setIsShareModalOpen}) => {
    const {chat} = useParams();
    const theme = useTheme();
    const {toggleMode} = useContext(DarkModeContext);

    let handleShare = () => false;

    if (chat) {
        const localData = new LocalData(chat);

        handleShare = () => {
            console.log(localData.get());
        };
    }

    return (
        <Toolbar
            variant='regular'
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                p: 2,
            }}
        >
            {/* Project label + chat info */}
            <Typography
                variant='h5'
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                <Link
                    variant='h5'
                    href='/'
                    underline={'hover'}
                    color={'inherit'}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                    }}
                >
                    <Suspense fallback={<CircularProgress size={40}/>}>
                        <img src={icon} alt='icon' height='40px'/>
                    </Suspense>
                    <span style={{marginLeft: '.5rem'}}>Cha<i>Py</i></span>
                </Link>
                {
                    chat ?
                        <span style={{
                            marginLeft: '.5rem',
                            opacity: .7,
                        }}> - {chat} </span> : <></>
                }
            </Typography>

            {/* Buttons */}
            <div>
                {/* Theme button */}
                <IconButton
                    sx={{ml: 1}}
                    onClick={toggleMode}
                    color='inherit'
                >
                    {theme.palette.mode === 'dark' ?
                        <Brightness7Icon /> : <Brightness4Icon />}
                </IconButton>

                {/* Share modal button */}
                {
                    chat ?
                        <IconButton
                            sx={{ml: 1}}
                            onClick={() => setIsShareModalOpen(true)}
                            color='inherit'
                        >
                            <IosShareIcon/>
                        </IconButton> : <></>
                }

                {/* Share old messages button */}
                {
                    chat ?
                        <IconButton
                            sx={{ml: 1}}
                            onClick={() => handleShare()}
                            color='inherit'
                        >
                            <ScheduleSendIcon/>
                        </IconButton> : <></>
                }
            </div>
        </Toolbar>
    );
};

HeaderToolbar.propTypes = {
    setIsShareModalOpen: PropTypes.func,
};

export default HeaderToolbar;

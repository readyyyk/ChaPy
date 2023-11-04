import React, {useContext} from 'react';
import Header from '../Chat/components/Header/Header.jsx';
import {
    Button,
    Paper,
    Stack,
    Typography,
    useTheme,
} from '@mui/material';
import ManageHistoryIcon from '@mui/icons-material/ManageHistory';

import HistoryList from './HistoryList';
import Brightness7Icon from '@mui/icons-material/Brightness7.js';
import Brightness6Icon from '@mui/icons-material/Brightness6';
import Brightness4Icon from '@mui/icons-material/Brightness4.js';
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';

import {DarkModeContext} from '../../hooks/DarkModeContext.js';
import Preferences from './Preferences.jsx';


const Settings = () => {
    const theme = useTheme();
    const {toggleMode} = useContext(DarkModeContext);

    return (
        <Stack
            useFlexGap
            gap={'3rem'}
            alignItems={'center'}
            sx={{
                width: '100%',
                minHeight: '100dvh',
                paddingBlock: 'calc(4.5rem + 2rem)',
            }}
        >
            <Header
                setIsShareModalOpen={(_)=>{}}
                userList={[{}]}
                wsApi={{}}
            />

            <Stack
                useFlexGap
                gap={'1rem'}
                direction={'column'}
                alignItems={'center'}
            >
                <Typography variant={'h3'} sx={{textDecoration: 'none'}}>
                    <Brightness6Icon sx={{fontSize: 36}}/> Theme:
                </Typography>

                <Button onClick={toggleMode} variant={'outlined'}>
                    {theme.palette.mode === 'dark' ?
                        <Brightness7Icon/> : <Brightness4Icon/>}
                    <Typography
                        variant={'h4'}
                        sx={{marginLeft: '.5rem'}}
                        textTransform={'capitalize'}
                    >
                        {theme.palette.mode === 'dark' ? 'light' : 'dark'}
                    </Typography>
                </Button>
            </Stack>

            <Stack useFlexGap gap={'1rem'} direction={'column'} alignItems={'center'}>
                <Typography variant={'h3'}>
                    <ManageHistoryIcon sx={{fontSize: 36}}/> History:
                </Typography>
                <HistoryList />
            </Stack>

            <Paper sx={{padding: [2, 3]}}>
                <Stack
                    useFlexGap
                    gap={'1rem'}
                    direction={'column'}
                    alignItems={'center'}
                >
                    <Typography variant={'h3'} sx={{textDecoration: 'none'}}>
                        <SettingsApplicationsIcon
                            sx={{fontSize: 36, marginRight: '.5rem'}}
                        />
                        Preferences
                    </Typography>

                    <Preferences/>
                </Stack>
            </Paper>
        </Stack>
    );
};

export default Settings;

import React from 'react';
import Header from '../Chat/components/Header/Header.jsx';
import {Box, Stack, Typography} from '@mui/material';
import ManageHistoryIcon from '@mui/icons-material/ManageHistory';

import HistoryList from './HistoryList.jsx';

const Settings = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                gap: '3rem',
                flexDirection: 'column',
                width: '100%',
                minHeight: '100dvh',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: 'background.default',
                color: 'text.primary',
            }}
        >
            <Header
                setIsShareModalOpen={(_)=>{}}
                userList={['']}
                wsApi={{}}
            />

            <Stack useFlexGap gap={'1rem'} direction={'column'} alignItems={'center'}>
                <Typography variant={'h3'}>
                    <ManageHistoryIcon sx={{fontSize: 36}}/> History:
                </Typography>
                <HistoryList />
            </Stack>
        </Box>
    );
};

export default Settings;

import React from 'react';
import {
    Backdrop,
    LinearProgress,
    Typography,
} from '@mui/material';

const Loading = () => {
    return (
        <Backdrop
            sx={{
                color: '#fff',
                zIndex: (theme) => theme.zIndex.drawer + 1,
                flexDirection: 'column',
            }}
            open={true}
        >
            <Typography variant="h2"> Chat<i>Bin</i> </Typography>
            <LinearProgress
                color={'info'}
                sx={{
                    width: .9,
                    borderRadius: 1,
                }}
            />
        </Backdrop>
    );
};

export default Loading;

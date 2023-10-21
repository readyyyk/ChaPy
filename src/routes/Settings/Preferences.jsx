import React, {useState} from 'react';
import LocalData from '../Chat/APIs/localData.js';
import {
    IconButton,
    Stack,
    TextField,
    Typography,
} from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';

import {toast} from 'react-toastify';


const Preferences = () => {
    const [laNumber, setLaNumber] = useState(LocalData.getMaxNumber());

    return (
        <>
            <form
                onSubmit={(e)=>{
                    e.preventDefault();
                    LocalData.updateMaxNumber(laNumber);
                    toast.success(`Updated with value ${laNumber}`);
                }}
            >
                <Stack direction={'row'} justifyContent={'space-between'}>
                    <TextField
                        sx={{width: .83}}
                        type={'number'}
                        inputProps={{
                            inputMode: 'numeric',
                            pattern: '[0-9]*',
                            min: 0,
                            max: 100,
                        }}
                        size={'small'}
                        id={'la-number'}
                        label={'Number'}
                        value={laNumber}
                        onChange={(e)=>setLaNumber(Number(e.target.value))}
                    />
                    <IconButton color={'success'} type={'submit'}>
                        <DoneIcon />
                    </IconButton>
                </Stack>

                <label htmlFor="la-number">
                    <Typography variant={'subtitle2'} color={'grey'}>
                        Max. number of messages to store per chat
                    </Typography>
                </label>
            </form>
        </>
    );
};

export default Preferences;

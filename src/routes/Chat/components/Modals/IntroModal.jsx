import React, {useState} from 'react';
import {
    FormControl,
    Modal,
    Paper,
    TextField,
    Typography,
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import PropTypes from 'prop-types';

const IntroModal = ({open, setUser, chat, chatbinApi, setUserList}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (inputValue.length>2) {
            setIsLoading(true);
            const isValidName = await chatbinApi.checkName(inputValue);
            if (isValidName) {
                setUser({
                    connected: true,
                    name: inputValue,
                });
                const currentNames = await chatbinApi.getNames();
                console.log(currentNames);
                setUserList([...currentNames, inputValue]);
            }
            // TODO: add ux sign of already used username
            setIsLoading(false);
        }
    };
    return (
        <Modal
            open={open}
            sx={{
                width: 1,
                height: 1,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
            disableAutoFocus
        >
            <Paper
                sx={{
                    width: 'fit-content',
                    height: 'min-content',
                    p: 3,
                }}
            >
                <Typography variant="h5" mb={1} align={'center'}>
                    Entering <b>{chat}</b>
                </Typography>
                <form
                    onSubmit={handleSubmit}
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <FormControl>
                        <TextField
                            label={'Name'}
                            value={inputValue}
                            sx={{mb: 3}}
                            onChange={(e) => setInputValue(e.target.value)}
                            autoFocus
                        />
                    </FormControl>
                    <LoadingButton
                        variant={'contained'}
                        color={'success'}
                        type={'submit'}
                        loading={isLoading}
                        disabled={inputValue.length===0}
                    >
                        Enter
                    </LoadingButton>
                </form>
            </Paper>
        </Modal>
    );
};

IntroModal.propTypes = {
    open: PropTypes.bool,
    chat: PropTypes.string,
    setUser: PropTypes.func,
    chatbinApi: PropTypes.object,
    setUserList: PropTypes.func,
};

export default IntroModal;

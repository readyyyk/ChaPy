import React, {useState} from 'react';

import {
    FormControl,
    Modal,
    Paper,
    TextField, Tooltip,
    Typography,
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

import {
    useLoaderData,
    useParams,
} from 'react-router-dom';

import PropTypes from 'prop-types';

const IntroModal = ({open, setUser, setUserList}) => {
    const {chat} = useParams();
    const {chatbinApi} = useLoaderData();

    // eslint-disable-next-line max-len
    const inputErrorText = 'Name should be unique in chat and can contain less than 30 symbols of English alphabet';

    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    const [inputValue, setInputValue] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (inputValue.length>2) {
            setIsLoading(true);
            const isValidName = await chatbinApi.checkName(inputValue);
            if (isValidName) {
                const currentNames = await chatbinApi.getNames();
                setUserList(currentNames || []);
                setUser({
                    connected: true,
                    name: inputValue,
                });
            }
            setIsError(!isValidName);
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
                        <Tooltip
                            arrow
                            open={isError}
                            placement={'top'}
                            title={inputErrorText}
                        >
                            <TextField
                                autoFocus
                                sx={{mb: 3}}
                                label={'Name'}
                                error={isError}
                                value={inputValue}
                                onChange={(e) => {
                                    setInputValue(e.target.value);
                                    setIsError(false);
                                }}
                            />
                        </Tooltip>
                    </FormControl>
                    <LoadingButton
                        variant={'contained'}
                        color={'success'}
                        type={'submit'}
                        loading={isLoading}
                        disabled={inputValue.length<3}
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

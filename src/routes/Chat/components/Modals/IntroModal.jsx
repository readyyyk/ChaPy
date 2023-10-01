import React, { useState } from 'react';

import '../../../../InputStyles.css';

import {
    Button,
    FormControl,
    Modal,
    Paper,
    Stack,
    TextField, Tooltip,
    Typography,
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

import FirstPageIcon from '@mui/icons-material/FirstPage';

import {
    useLoaderData,
    useParams,
    useNavigate
} from 'react-router-dom';

import PropTypes from 'prop-types';
import SSocketApi from '../../APIs/sSocketAPI.js';

const IntroModal = ({open, setUser, setWsApi, setUserList}) => {
    const {chat} = useParams();
    const {chapyApi} = useLoaderData();
    const navigate = useNavigate();

    // eslint-disable-next-line max-len
    const inputErrorText= 'Name should be unique in chat and can contain less than 30 letters, numbers, or underscores';

    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [isOpen, setIsOpen] = useState(open);

    const [inputValue, setInputValue] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (inputValue.length<=2) {
            return;
        }

        setIsLoading(true);
        const res = await chapyApi.connect(inputValue);

        if (res.connected) {
            const parseJWT = (token) => JSON.parse(atob(token.split('.')[1]));
            const key = parseJWT(res.wsLink.substr(res.wsLink.search('token=')+6))['key'];
            const currentNames = await chapyApi.names();
            setUserList(currentNames);
            setUser({
                connected: true,
                name: inputValue,
            });
            setWsApi(new SSocketApi(res.wsLink, key));
        }
        setIsError(!res.connected);
        setIsLoading(false);
    };

    const handleClick = () => {
        setIsOpen(!isOpen)
        navigate('/')
    }

    return (
        <Modal
            open={isOpen}
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
                <Typography variant='h5' mb={1} align={'center'}>
                    Entering chat #<b>{chat}</b>
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
                                label={'Your name'}
                                error={isError}
                                value={inputValue}
                                onChange={(e) => {
                                    setInputValue(e.target.value);
                                    setIsError(false);
                                }}
                            />
                        </Tooltip>
                    </FormControl>
                    <Stack spacing={{xs: 1, sm: 2}} direction="row" useFlexGap>
                        <Button variant="contained" color='inherit' onClick={handleClick}>
                            <FirstPageIcon />
                        </Button>
                        <LoadingButton
                            variant={'contained'}
                            color={'success'}
                            type={'submit'}
                            loading={isLoading}
                            disabled={inputValue.length < 3}
                            fullWidth
                        >
                            Enter
                        </LoadingButton>
                    </Stack>
                </form>
            </Paper>
        </Modal>
    );
};

IntroModal.propTypes = {
    open: PropTypes.bool,
    setUser: PropTypes.func,
    setWsApi: PropTypes.func,
    setUserList: PropTypes.func,
};

export default IntroModal;

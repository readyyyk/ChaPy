import React, {useState} from 'react';

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
    useNavigate,
} from 'react-router-dom';

import PropTypes from 'prop-types';
import SSocketApi from '../../APIs/sSocketAPI.js';
import LocalData from '../../APIs/localData.js';

/**
 * @param {boolean} open - is modal open
 * @param {function} setUser - set new user when needed
 * @param {function} setWsApi - set ws api instance when needed
 * @param {function} setUserList  - set user list when fetched
 * @return {Element}
 * */
const IntroModal = ({open, setUser, setWsApi, setUserList}) => {
    const {chat} = useParams();
    const {chapyApi} = useLoaderData();
    const navigate = useNavigate();

    const localData = new LocalData(chat);

    // eslint-disable-next-line max-len
    const inputErrorText= 'Name should be unique in chat and can contain less than 30 letters, numbers, or underscores';

    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

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
            const key = parseJWT(res.wsLink.
                substring(res.wsLink.search('token=')+6))['key'];
            const currentNames = await chapyApi.names();
            setUserList(currentNames);
            setUser({
                connected: true,
                name: inputValue,
                connTime: new Date().getTime(),
            });
            setWsApi(new SSocketApi(res.wsLink, key, (data)=> {
                if (data.event==='history') {
                    return;
                }
                const currentData = JSON.parse(data.data);
                if (!('sender' in currentData)) {
                    currentData.sender = inputValue;
                }
                data.data = JSON.stringify(currentData);
                localData.save(data);
            }));
        }
        setIsError(!res.connected);
        setIsLoading(false);
    };

    const handleClick = () => navigate('/');

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
                    <Stack spacing={1} direction="row" useFlexGap>
                        <Button
                            variant={'contained'}
                            color={'inherit'}
                            onClick={handleClick}
                            sx={{
                                p: .75,
                                minWidth: 'unset',
                                minHeight: 'unset',
                            }}
                        >
                            <FirstPageIcon/>
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

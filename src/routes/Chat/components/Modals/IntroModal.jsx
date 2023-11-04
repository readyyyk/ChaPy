import React, {
    useEffect,
    useRef,
    useState,
} from 'react';

import '../../../../assets/styles/InputStyles.css';

import {
    Button,
    FormControl,
    Modal,
    Paper,
    Stack,
    TextField,
    Typography,
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

import FirstPageIcon from '@mui/icons-material/FirstPage';

import {
    useLoaderData,
    useParams,
    useNavigate,
} from 'react-router-dom';

import {toast} from 'react-toastify';
import PropTypes from 'prop-types';

import SSocketApi from '../../APIs/sSocketAPI.js';

import {createWsApiGlobalCallback} from '../../setupWsApi.js';


const parseJWT = (token) => JSON.parse(atob(token.split('.')[1]));

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

    const toastDataVariants = [
        'This name is already used chat!',
        'Name can contain less than 30 letters, numbers, or underscores!',
    ];

    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const toastComponent = useRef(null);
    const [toastData, setToastData] = useState('');
    const callWarningToast = () => {
        toastComponent.current = toast.warning(toastData, {toastId: 'warn-toast'});
        toast.update(toastComponent.current);
    };
    useEffect(() => {
        if (toastData) {
            toast.update('warn-toast', {render: toastData});
        }
    }, [toastData]);

    const [inputValue, setInputValue] = useState('');
    const handleChange = (e) => {
        if (e.target.value !== e.target.value.trim()) {
            callWarningToast();
        }
        setInputValue(e.target.value.trim());
        setIsError(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (inputValue.length<=2) {
            return;
        }

        setIsLoading(true);
        const res = await chapyApi.connect(inputValue);

        setIsError(!res.connected);
        setIsLoading(false);

        if (!res.connected) {
            setToastData(res.message === 'Invalid name' ?
                toastDataVariants[1] : toastDataVariants[0]);
            callWarningToast();
        }

        if (res.connected) {
            const tokenValue = res.wsLink.substring(res.wsLink.search('token=')+6);
            const key = parseJWT(tokenValue)['key'];
            const currentNames = await chapyApi.names();
            const wsApiCallback = createWsApiGlobalCallback(inputValue, chat);
            setUserList(currentNames.map((name)=>({name, isActive: true})));
            setUser({
                connected: true,
                name: inputValue,
                connTime: new Date().getTime(),
            });
            setWsApi(new SSocketApi(res.wsLink, key, wsApiCallback));
            toast.dismiss(toastComponent.current);
        }
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
                        <TextField
                            autoFocus
                            sx={{mb: 3}}
                            label={'Your nickname'}
                            error={isError}
                            value={inputValue}
                            onChange={(e)=>handleChange(e)}
                            inputProps={{
                                name: 'nickname',
                                autocomplete: 'nickname',
                            }}
                        />
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

import React, {useState} from 'react';
import {
    Box,
    Button,
    FormControl,
    TextField,
    Typography,
} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import "./home.css";

const Home = () => {
    const navigate = useNavigate();

    const [inputValue, setInputValue] = useState("");
    const handleSubmit = (e) => {
        e.preventDefault();
        navigate(`/${inputValue}`);
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                height: '100dvh',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: 'background.default',
                color: 'text.primary',
                borderRadius: 1,
                p: 3,
            }}
        >
            <Typography variant="h1"> Home </Typography>
            <Button
                onClick={()=>navigate("/new_chat")}
                variant="outlined"
                size="large"
            >
                New chat
            </Button>

            <form
                onSubmit={handleSubmit}
                style={{
                    display: 'flex',
                    borderRadius: 7,
                    marginTop: "4rem",
                    alignItems: 'center',
                    border: "1px solid rgba(144, 202, 249, 0.5)",
                    padding: "4px 16px",
                }}
            >
                <FormControl>
                    <TextField
                        label={'Chat ID'}
                        value={inputValue}
                        variant={"outlined"}
                        className={"home-input"}
                        sx={{
                            width: "5em",
                        }}
                        inputProps={{
                            maxLength: 5,
                            pattern: "[a-zA-Z]{5}",
                        }}
                        onChange={(e) => {
                            setInputValue(e.target.value);
                        }}
                    />
                </FormControl>
                <Button
                    variant={'contained'}
                    color={'success'}
                    type={'submit'}
                    disabled={inputValue.length<5}
                >
                    <ArrowForwardIcon/>
                </Button>
            </form>
        </Box>
    );
};
export default Home;

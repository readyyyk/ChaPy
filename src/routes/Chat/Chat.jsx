import React, {useState} from 'react';
import {
    Box,
    TextField,
    Typography,
    Container,
    LinearProgress,
    IconButton,
    FormControl,
    FormGroup,
    Backdrop, useTheme, Paper, Stack
} from "@mui/material";
import {useParams} from "react-router-dom";
import Header from "./Header.jsx";
import SendIcon from '@mui/icons-material/Send';
import ServerMessage from "./serverMessage.jsx";
import UserMessage from "./userMessage.jsx";

const Chat = ({ToggleMode, ToggleQr}) => {
    const theme = useTheme()

    const [isLoaded, setIsLoaded] = useState(false)
    setTimeout(()=>setIsLoaded(true), 2300)

    const { chat } = useParams();
    return (
        <>
            <Header ToggleMode={ToggleMode} />
            <Container sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                    height: "100dvh",
                    overflow: 'hidden',
                    justifyContent: 'end',
                    alignItems: 'center',
                }}
            >
                <Backdrop sx={{zIndex: ()=>theme.zIndex.drawer+1, color: "#fff", flexDirection: 'column'}} open={!isLoaded}>
                    <Typography variant="h1" align='center' gutterBottom> Entering <b><i>{chat}</i></b> </Typography>
                    <LinearProgress color={'info'} sx={{width: .9, borderRadius: 1}}/>
                </Backdrop>

                <Stack
                    direction="column"
                    justifyContent="flex-start"
                    alignItems="stretch"
                    spacing={1}
                    sx={{width: 1}}
                >
                    <ServerMessage text={'test'} />
                    <ServerMessage text={'test'} />
                    <ServerMessage text={'test'} />
                    <UserMessage text={"tsetinsadamsd asmd kasm dkam skdk a"} owner={"test"} />
                    <UserMessage text={"tsetinsadamsd asmd kasm dkam sdas dad sasda  sda skdk a"} owner={"test"} />
                    <UserMessage text={"tsetinsass d asd asda sda s sadadamsd asmd kasm dkam skdk a"} owner={"test"} />
                    <UserMessage text={"Lorem ipsum dolor sit amet, consectetur adipisicing elit. At aut, deleniti dolorum ducimus eaque enim eos ex explicabo fugiat itaque iure libero molestiae natus nesciunt numquam sapiente vel velit voluptatem."} owner={null} />
                    <UserMessage text={"tsetinsadamsd asmd kasm dkam skdk a"} owner={"test"} />
                    <UserMessage text={"tsetinsadamsd asmd kasm dkam asdsadsa sasdad sasda skdk a"} owner={"test"} />
                    <UserMessage text={"Lorem ipsum dolor sit amet, consectetur adipisicing elit. At aut, deleniti dolorum "} owner={null} />
                </Stack>
                <Container sx={{
                    // position: 'fixed',
                    // bottom: '0',
                    p: 2,
                }}>
                    <Box sx={{display: 'flex', alignItems: 'center'}}>
                        <TextField label="Message" sx={{width: 1}} tabIndex={1}/>
                        <IconButton sx={{ ml: 1 }} onClick={ToggleQr} color="primary">
                            <SendIcon />
                        </IconButton>
                    </Box>
                </Container>
            </Container>
        </>
    );
};

export default Chat;
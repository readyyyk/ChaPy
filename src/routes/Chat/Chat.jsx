import React, {useEffect, useRef, useState} from 'react';
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
    const theme = useTheme();

    const [isLoaded, setIsLoaded] = useState(false);
    setTimeout(()=>setIsLoaded(true), 2300);

    const { chat } = useParams();

    const [msgs, setMsgs] = useState([
        {text: 'test connected', owner:'test', type: 'server'},
        {text: 'testasd as da sdsda ', owner: 'test'},
        {text: 'test', owner: 'test'},
        {text: 'testasd sa dsa d sadsadsas adsddsadsdaa sdsda ', owner: 'smb'},
        {text: 'testasd jansjd sanjks dnkjd sanjkkjanskdjn akns d ajsndk jansk jdnkaj sndkj a', owner: 'smb'},
        {text: 'testasd as da uja sd', owner: 'smb'},
        {text: 'test disconnected', owner:'test', type: 'server'},
        {text: 'testasd jansjd sanjks dnkjd sanjkkjanskdjn akns d ajsndk jansk jdnkaj sndkj a', owner: 'undefined'},
        {text: 'saldmasdalskmd masmlm;las d;lm;lm as;lm;lmasmda', owner: 'undefined'},
        {text: 'testasd sa dsa d sadsadsas adsddsadsdaa sdsda ', owner: 'test'},
        {text: 'sadsadsas adsddsadsdaa sdsda asd as ddsas da sdasdasd asd as da', owner: 'test'},
        {text: 'testasd as da uja sd', owner: 'yess'},
    ])
    const addMsg = (newMessage) => setMsgs([...msgs, newMessage])

    const msgStack = useRef();
    useEffect(() => {
        msgStack.current?.lastElementChild?.scrollIntoView({behavior:'smooth'})
    }, [msgs]);

    let [inputText, setInputText] = useState('')
    const newMessage = () => {
        if(inputText) {
            addMsg({text: inputText, owner: 'smb'})
            setInputText('')
        }
    }

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
                    sx={{width: 1, overflowY: 'scroll', mt: '3rem', pb: '1rem'}}
                    id='messageContainer'
                    ref={msgStack}
                >
                    {
                        msgs.map((el, i) => {
                            // console.log(i<msgs.length-1 && el.owner === msgs[i+1].owner)
                            return <> {el.type === 'server'
                                ? <ServerMessage text={el.text} owner={el.owner}/>
                                : i<msgs.length-1 && el.owner === msgs[i+1].owner
                                    ? <UserMessage text={el.text} owner={el.owner}/>
                                    : <UserMessage text={el.text} owner={el.owner} mb/> }
                            </>
                        })
                    }
                </Stack>

                {/*input*/}
                <Container sx={{
                    p: 2,
                }}>
                    <Box sx={{display: 'flex', alignItems: 'center'}}>
                        <TextField label="Message"
                                   sx={{width: 1}}
                                   tabIndex={1}
                                   value={inputText}
                                   onChange={e => setInputText(e.target.value)}
                        />
                        <IconButton sx={{ ml: 1 }} onClick={newMessage} color="primary">
                            <SendIcon />
                        </IconButton>
                    </Box>
                </Container>
            </Container>
        </>
    );
};

export default Chat;
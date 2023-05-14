import React from 'react';
import {
    AppBar,
    IconButton,
    Link,
    Toolbar,
    useScrollTrigger,
    useTheme
} from "@mui/material";
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import IosShareIcon from '@mui/icons-material/IosShare';
const Header = ({ToggleMode, ToggleQr}) => {
    const theme = useTheme();
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0,
    });
    return (
        <AppBar position="fixed" elevation={trigger?4:0}>
            <Toolbar variant="regular" sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                p: 3
            }}>
                <Link variant="h5" href="/" underline={"hover"} color={"inherit"} sx={{display:'flex', alignItems: 'center'}}>
                    <img src="./favicon.svg"  alt="icon" height="40px"/>
                    <span>Chat<i>Bin</i></span>
                </Link>
                <div>
                    <IconButton sx={{ ml: 1 }} onClick={ToggleMode} color="inherit">
                        {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
                    </IconButton>
                    <IconButton sx={{ ml: 1 }} onClick={ToggleQr} color="inherit">
                        <IosShareIcon />
                    </IconButton>
                </div>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
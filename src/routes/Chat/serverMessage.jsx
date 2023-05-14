import React from 'react';
import {Avatar, Chip, Container} from "@mui/material";

const ServerMessage = ({text}) => {
    return (
        <Container sx={{width:1, display:'flex', justifyContent: 'center'}}>
            <Chip avatar={<Avatar alt="Test" src="/static/images/avatar/1.jpg" />}
              label={text} />
        </Container>
    );
};

export default ServerMessage;
import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    Button,
} from '@mui/material';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';

import LocalData from '../Chat/APIs/localData.js';


const linked = {};
const HistoryList = () => {
    const navigate = useNavigate();
    const [rows, setRows] = useState([]);
    useEffect(() => {
        linked.rows = rows;
    }, [rows]);
    useEffect(()=> {
        const _rows = [];
        const chatIdRegex = /^[a-zA-Z]{5}$/;
        for (const chatId in localStorage) {
            if (chatIdRegex.test(chatId) && typeof localStorage[chatId] === 'string') {
                const localData = new LocalData(chatId);
                const data = localData.get();
                _rows.push({
                    id: chatId,
                    number: Object.keys(data).length,
                    action: (
                        <IconButton onClick={() => {
                            delete localStorage[chatId];
                            setRows(linked.rows.filter((el)=>el.id!==chatId));
                        }}>
                            <DeleteSweepIcon size={'large'} />
                        </IconButton>
                    ),
                });
            }
        }
        setRows(_rows);
        linked.rows = rows;
    }, []);

    return rows.length > 0 ?
        <TableContainer component={Paper}>
            <Table sx={{maxWidth: '90dvw'}} aria-label='simple table'>
                <TableHead>
                    <TableRow>
                        <TableCell>Chat ID</TableCell>
                        <TableCell align='center'>Messages(n)</TableCell>
                        <TableCell align='right'>Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow
                            key={row.id}
                            sx={{'&:last-child td, &:last-child th': {border: 0}}}
                        >
                            <TableCell align='center'
                                component='th'
                                scope='row'
                            >
                                <Button onClick={()=>navigate('/'+row.id)}>
                                    <Typography sx={{
                                        fontFamily: 'Monospace',
                                        textTransform: 'none',
                                        fontWeight: 'bold',
                                    }}>
                                        {row.id}
                                    </Typography>
                                </Button>
                            </TableCell>
                            <TableCell align='center'>
                                <Typography variant={'h6'}>
                                    {row.number}
                                </Typography>
                            </TableCell>
                            <TableCell align='center'>{row.action}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer> :
        <Typography variant={'h4'} color={'grey'}> No history found... </Typography>;
};

export default HistoryList;

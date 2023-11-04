import React, {
    useEffect,
    useState,
} from 'react';
import {
    Button,
    IconButton,
    TableBody,
    TableCell,
    TableRow, Tooltip,
    Typography,
} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep.js';

import LocalData from '../../Chat/APIs/localData.js';


const linked = {};

const TableData = () => {
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


                const number = {
                    users: Object.keys(data).reduce((acc, cur) => {
                        return acc + (data[cur].event==='message');
                    }, 0),
                    total: Object.keys(data).length,
                };

                _rows.push({
                    id: chatId,
                    number,
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

    return (
        <TableBody>
            {rows.length ? rows.map((row) => (
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
                        <Tooltip
                            arrow
                            placement='top'
                            enterTouchDelay={0}
                            title="Users' messages / total (including server)">
                            <Typography variant={'h6'} title="Users' messages / total (including server)">
                                {row.number.users} / {row.number.total}
                            </Typography>
                        </Tooltip>
                    </TableCell>
                    <TableCell align='center'>{row.action}</TableCell>
                </TableRow>
            )) : (
                <TableRow sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                    <TableCell align='center' colSpan={3}>
                        <Typography
                            variant={'h5'}
                            color={'grey'}
                        > No history found... </Typography>
                    </TableCell>
                </TableRow>
            )}
        </TableBody>
    );
};

export default TableData;

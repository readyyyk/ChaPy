import React from 'react';
import {
    Paper,
    Table,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Tooltip,
} from '@mui/material';
import TableData from './TableData.jsx';


const HistoryList = () => {
    return (
        <TableContainer component={Paper}>
            <Table sx={{maxWidth: '90dvw'}} aria-label='simple table'>
                <TableHead>
                    <TableRow>
                        <TableCell>Chat ID</TableCell>
                        <TableCell align='center'>
                            <Tooltip
                                arrow
                                placement='top'
                                enterTouchDelay={0}
                                title="Users' messages / total (including server)">
                                <span>Messages(n)</span>
                            </Tooltip>
                        </TableCell>
                        <TableCell align='right'>Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableData />
            </Table>
        </TableContainer>
    );
};

export default HistoryList;

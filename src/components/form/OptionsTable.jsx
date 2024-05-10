import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Checkbox, TextField } from '@mui/material';
 

export default function OptionsTable(props) {
    const {
        options,
        setOptions
    } = props;

    console.log(options)

    return (
        <TableContainer component={Paper} sx={{ minWidth: 500, maxHeight: 300, overflow: 'auto' }}>
        <Table stickyHeader >
            <TableHead>
            <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Option</TableCell>
                <TableCell align="right">Answer</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
                {options.map((row) => (
                    <TableRow
                    key={row.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                    <TableCell component="th" scope="row">
                       {row.id}
                    </TableCell>
                    <TableCell >{row.optionText}</TableCell>
                    <TableCell align="right"> <Checkbox disabled checked={row.isAnswer} /> </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
        </TableContainer>
    );
}

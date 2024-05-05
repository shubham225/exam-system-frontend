import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Button, IconButton } from '@mui/material';
import InputIcon from '@mui/icons-material/Input';

function createData(id, description) {
  return { id, description};
}

const header = ['Exam Id', 'Description', 'Actions'];

const data = [
  createData(123, 'EXAM TEST 1'),
  createData(124, 'EXAM TEST 2'),
  createData(125, 'EXAM TEST 3'),
  createData(126, 'EXAM TEST 4'),
];

export default function ExamList(props) {

  return (
    <TableContainer >
        <Table size='medium'>
            <TableHead>
                <TableRow>
                    <TableCell/>
                    {
                        header.map((header) => (
                            <TableCell>{header}</TableCell>
                        ))
                    }
                </TableRow>
            </TableHead>
            <TableBody>
                {data.map((row) => (
                    <TableRow
                    key={row.id}
                    >
                        <TableCell> 
                          <IconButton size='small'>
                            <InputIcon />
                          </IconButton>
                        </TableCell>
               
                        <TableCell component="th" scope="row">
                            {row.id}
                        </TableCell>
                        <TableCell>{row.description}</TableCell>
                        <TableCell>
                            <Button variant='contained' color='error'>Remove</Button>  
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </TableContainer>
  );
}

import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Button, IconButton } from '@mui/material';
import InputIcon from '@mui/icons-material/Input';
import Question from 'components/ui/Question';

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

const Qoption = [
    {
      text  : 'Yes',
      value : true
    },
    {
      text  : 'No',
      value : false
    }
]

export default function ExamTable(props) {
  const [open, setOpen] = React.useState(false);
  const [selectedRowId, setSelectedRowId] = React.useState(0);

  const handleClickOpen = (val) => {
    setSelectedRowId(val);
    setOpen(true);
  };

  const handleClose = (question) => {
    setOpen(false);

      // Call api to remove the exam
      if(question.answer === true) {
        console.log("Removing " + question.rowId);
      }else {
        console.log("Not Remove " + question.rowId);
      }
  };

  const openExamPage = (input) => {
    console.log("Opening page for : " + input);
  }

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
                          <IconButton size='small' onClick={() => openExamPage(row.id)}>
                            <InputIcon />
                          </IconButton>
                        </TableCell>
               
                        <TableCell component="th" scope="row">
                            {row.id}
                        </TableCell>
                        <TableCell>{row.description}</TableCell>
                        <TableCell>
                            <Button variant='contained' color='error' onClick={() => handleClickOpen(row.id)}
                            >
                              Remove
                            </Button>  
                            <Question
                              open={open}
                              rowId={selectedRowId}
                              onClose={handleClose}
                              options= {Qoption}
                              questionText= "Do You Want to Delete Exam?"
                            />
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </TableContainer>
  );
}

import * as React from 'react';

import NewExam from 'components/dialog/NewExam';
import Question from 'components/ui/Question';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Box, Button, IconButton } from '@mui/material';
import InputIcon from '@mui/icons-material/Input';
import { useNavigate } from 'react-router-dom';

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
  const [openEditExam, setOpenEditExam] = React.useState(false);
  const [selectedRowId, setSelectedRowId] = React.useState(0);
  const navigateTo = useNavigate();

  const handleClickOpen = (e, val) => {
    e.preventDefault();
    console.log(e);
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

  const handleOpenEditExam = (e, val) => {
    e.preventDefault();
    setSelectedRowId(val);
    setOpenEditExam(true);
  };

  const handleCloseEditExam = () => {
    setOpenEditExam(false);
  };

  const openExamPage = (input) => {
    console.log("Opening page for : " + input);
    navigateTo("/exam/"+input);
  }

  return (
    <Box>
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
                      <TableRow key={row.id} >
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
                            <Button variant='contained' color='primary' sx={{m: 1}} onClick={(e) => handleOpenEditExam(e, row.id)} >
                              Edit
                            </Button>
                            <Button variant='contained' color='error' sx={{m: 1}} onClick={(e) => handleClickOpen(e, row.id)} >
                              Remove
                            </Button> 
                          </TableCell>
                      </TableRow>
                  ))}
              </TableBody>
          </Table>
      </TableContainer> 
      <Question
        open={open}
        rowId={selectedRowId}
        onClose={handleClose}
        options= {Qoption}
        questionText= "Do You Want to Delete Exam?"
      />
      <NewExam 
          open= {openEditExam}
          rowId= {selectedRowId}
          onCloseDialog= {handleCloseEditExam}
      />
    </Box>
  );
}

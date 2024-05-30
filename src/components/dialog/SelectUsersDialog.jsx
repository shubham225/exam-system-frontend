import React from 'react';

import DialogFormWindow from './DialogFormWindow';

import { usersColumns } from 'utils/CommonObjects';
import useLoading from 'hooks/useLoading';
import useAlert from 'hooks/useAlert';
import DataTable from 'components/form/DataTable';

import UserService from 'services/UserService';


export default function SelectUsersDialog(props) {
    const {
        open,
        exam,
        onCloseDialog
    } = props;

    const [selectedRows, setSelectedRows] = React.useState([]);
    const [rows, setRows] = React.useState([]);

    const {startLoading, stopLoading} = useLoading();
    const {setAlert} = useAlert();

    const columns = [...usersColumns];

    const fetchAllStudents = React.useCallback(async () => {
        startLoading();
        
        try {
            const studentList = await UserService.getAllUsers();
            setRows(studentList);
        }catch(error) {
            setAlert(error, 'error');
        }
  
        stopLoading();
    });

    const assignExamToStudents = React.useCallback(async (examId, students) => {
        startLoading();
        
        try {
            const retVal = await UserService.assignExamToUsers(examId, students);
            
            if(retVal) setAlert({message : 'Exam Assigned Successfully'}, 'success');

            onCloseDialog();
        }catch(error) {
            setAlert(error, 'error');
        }
        
        stopLoading();
    });
    
    React.useEffect(() => {
        fetchAllStudents();
    }, [])

    const onButtonClick = () => {
        console.log("Selected Rows", selectedRows);
        console.log("Exam Details : ", exam);
        assignExamToStudents(exam.id, selectedRows);
    };

    const handleClose = () => {
        onCloseDialog();
    };

    return (
        <DialogFormWindow
            open={open} 
            title={"Select Students"}
            buttonLabel={"Assign"}
            onButtonClick={onButtonClick}
            handleClose={handleClose}
            maxWidth='lg'
            >
                <DataTable
                    checkboxSelection
                    onSelectionModelChange={
                        (newRowSelectionModel) => {
                            setSelectedRows(newRowSelectionModel);
                        }
                    }
                    rowSelectionModel={selectedRows}
                    columns={columns}
                    rows={rows}
                />
        </DialogFormWindow>
    )
}

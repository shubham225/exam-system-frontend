import { Delete, Edit, Preview } from '@mui/icons-material';
import { Box, IconButton, Tooltip } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom';

function EditActions({params, handleView, handleEdit, handleDelete}) {

    const navigateTo = useNavigate();

    // const handleView = (e) => {
    //     e.preventDefault();
    //     navigateTo("/exam/" + params.id)
    // }

    // const handleEdit = (e) => {
    //     e.preventDefault();
    //     console.log('Edit Clicked...');
    // }

    // const handleDelete = (e) => {
    //     e.preventDefault();
    //     console.log('Delete Clicked for id : ' + params.id);
    //     console.log(params);
    // }

    return (
        <Box>
            <Tooltip title="View Record">
                <IconButton onClick={(e) => handleView(e, params)} >
                    <Preview />
                </IconButton>
            </Tooltip>

            <Tooltip title="Edit Record">
                <IconButton onClick={(e) => handleEdit(e, params)} >
                    <Edit />
                </IconButton>
            </Tooltip>

            <Tooltip title="Delete Record">
                <IconButton onClick={(e) => handleDelete(e, params)} >
                    <Delete />
                </IconButton>
            </Tooltip>
        </Box>
    )
}

export default EditActions
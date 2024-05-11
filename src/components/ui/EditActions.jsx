import { Delete, Edit, Preview } from '@mui/icons-material';
import { Box, IconButton, Tooltip } from '@mui/material'
import React from 'react'

function EditActions({params, handleView, handleEdit, handleDelete}) {

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
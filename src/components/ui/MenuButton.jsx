import React from 'react';

import { Box, Button, Icon, Typography } from '@mui/material';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';

function MenuButton(props) {
    const {
        title,
        description,
        menuIcon,
        ...other
    } = props;

    let MenuIconImg = menuIcon;
    
    if(MenuIconImg) {
        MenuIconImg = {...MenuIconImg, props : {sx : {height : '100px', width: '100px', mb : 1}}};
    }
    
    return (
        <Button sx={{display: 'flex', flexDirection: 'column', textTransform: 'none', width: '250px'}} {...other}>
                {MenuIconImg}
                <Typography color='black' variant='h5' sx={{ fontWeight: 'bold' }}>{title}</Typography>
                <Typography color='grey' variant='h7'>{description}</Typography>
        </Button>
    )
}

export default MenuButton
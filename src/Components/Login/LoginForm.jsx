import React from "react";
import { Form } from "react-router-dom";
import { Box, Button } from '@mui/material';

import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';

function LoginForm() {
    return (
        <Box sx={{ '& > :not(style)': { m: 10 } }}>
          <FormControl variant="standard">
            <Box sx={{ display: 'flex', alignItems: 'flex-end', m: 1 }}>
                <TextField id="input-with-sx" label="Username" variant="standard" />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'flex-end', m: 1}}>
                <TextField id="input-with-sx" label="Password" type="password" variant="standard" />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'flex-end', m: 1}}>
                <Button variant="contained">Sign In</Button>
            </Box>
          </FormControl>
          
        </Box>
      );
}


export default LoginForm;
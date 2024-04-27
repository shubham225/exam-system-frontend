import React from "react";

import {Box, 
        Grid,
        InputLabel,
        FormControl, 
        FormLabel,
        FormControlLabel,
        RadioGroup,
        Radio,
        Select,
        MenuItem,
        Button,
        TextField} from '@mui/material';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

/* TODO: Only form UI is created Logic is still remaining, Component is not responsive when window size change every thing messup */

const RegisterationForm = (props) => {

    return (
        <>
            <Box component='form' noValidate sx={{m: 3}}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Full Name"
                            type="input"
                            variant="outlined"
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormControl>
                            <FormLabel id="row-radio-buttons-group-label">Gender</FormLabel>
                            <RadioGroup
                                row
                                aria-labelledby="row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                            >
                                <FormControlLabel value="male" control={<Radio />} label="Male" />
                                <FormControlLabel value="female" control={<Radio />} label="Female" />
                                <FormControlLabel value="other" control={<Radio />} label="Other" />
                            </RadioGroup>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Email"
                            type="input"
                            variant="outlined"
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Password"
                            type="password"
                            variant="outlined"
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Institute"
                            type="input"
                            variant="outlined"
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                            <InputLabel id="simple-select-label">Degree</InputLabel>
                            <Select
                                labelId="simple-select-label"
                                id="simple-select"
                                label="Age"
                                // onChange={handleChange}
                            >
                                <MenuItem value={10}>B.E.</MenuItem>
                                <MenuItem value={20}>B.Tech.</MenuItem>
                                <MenuItem value={30}>MCA</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Address"
                            type="search"
                            variant="outlined"
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <Button  
                            fullWidth
                            variant="contained"
                            sx={{
                                height: '100%'
                            }}
                            endIcon={<AssignmentIndIcon />}
                        >
                            Register
                        </Button>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <Button  
                            fullWidth
                            variant="contained"
                            sx={{
                                height: '100%'
                            }}
                            endIcon={<RestartAltIcon />}
                        >
                            Reset
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}

export default RegisterationForm;
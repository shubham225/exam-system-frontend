import React, { useCallback } from "react";

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
        Button } from '@mui/material';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import Input  from "components/ui/Input";
import AuthService from "services/AuthService.js";
import useForm from "hooks/useForm";
import useAlert from "hooks/useAlert";

const initialFormValues = {
    fullName: '',
    gender: "male",
    email: "",
    password: "",
    institute: "",
    degree: 10
}

const genderItems = [
    { id: 'male', label: 'Male' },
    { id: 'female', label: 'Female' },
    { id: 'other', label: 'Other' }
]

const RegisterationForm = (props) => {

    const {
        values,
        setValues,
        resetForm,
        handleChange
    } = useForm(initialFormValues);

    const {setAlert} = useAlert();

    const registerNewUser = useCallback(async (userData) => {
        try {
            const data = await AuthService.registerNewUser(userData); 
            setAlert({message : 'User Registered Sucesssfully'}, 'success');
            resetForm();
        }catch(error) {
            setAlert(error, 'error');
        }
    }, []);

    const doRegisterUser = (e) => {
        e.preventDefault();
        registerNewUser(values);
    }

    return (
        <>
            <Box component='form' sx={{m: 3}} onSubmit={doRegisterUser}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <Input
                            name="fullName"
                            required
                            value={values.fullName}
                            onChange={handleChange}
                            label="Full Name"
                            type="input"/>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormControl>
                            <FormLabel id="row-radio-buttons-group-label">Gender</FormLabel>
                            <RadioGroup
                                name="gender"
                                value={values.gender}
                                onChange={handleChange}
                                row
                                aria-labelledby="row-radio-buttons-group-label"
                            >{
                                genderItems.map(
                                    item => (
                                        <FormControlLabel key={item.id} value={item.id} control={<Radio />} label={item.label} />
                                    )
                            )}
                            </RadioGroup>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Input
                            name="email"
                            required
                            value={values.email}
                            onChange={handleChange}
                            label="Email"
                            type="input"
                            variant="outlined"
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Input
                            name="password"
                            required
                            value={values.password}
                            onChange={handleChange}
                            label="Password"
                            type="password"
                            variant="outlined"
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Input
                            name="institute"
                            required
                            value={values.institute}
                            onChange={handleChange}
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
                                name="degree"
                                value={values.degree}
                                onChange={handleChange}
                                labelId="simple-select-label"
                                id="simple-select"
                                label="Age"
                            >
                                <MenuItem value={10}>B.E.</MenuItem>
                                <MenuItem value={20}>B.Tech.</MenuItem>
                                <MenuItem value={30}>MCA</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Input
                            name="address"
                            value={values.address}
                            onChange={handleChange}
                            label="Address"
                            type="search"
                            variant="outlined"
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <Button  
                            fullWidth
                            type='submit'
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
                            type='reset'
                            variant="contained"
                            onClick={(e) => {e.preventDefault(); resetForm()}}
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
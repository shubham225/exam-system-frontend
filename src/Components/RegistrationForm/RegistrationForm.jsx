import React from "react";

import AcademicDetails from './AcademicDetails';
import PersonalDetails from './PersonalDetails';
import ProfileSummery from './ProfileSummery';
import SocialProfiles from './SocialProfiles';

import {Box, 
        Grid,
        FormGroup, 
        Select,
        MenuItem,
        Button,
        TextField,
        Typography} from '@mui/material';

import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <Box
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
        {value === index && (
            <Box sx={{ 
                p: 3,
                width: '160%' /* Temporary fix this will cause issue if window is resized */
            }}>
                {children}
            </Box>
        )}
        </Box>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

const RegisterationForm = (props) => {
    const {
        username,
        password,
        setUsername,
        setPassword,
    } = props;

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <>
        <Box
            sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: '90%', p: 2 }}
            >
            <Tabs
                orientation="vertical"
                value={value}
                onChange={handleChange}
                aria-label="Vertical tabs example"
                sx={{ borderRight: 1, borderColor: 'divider'}}
            >
                <Tab label="Personal Details" {...a11yProps(0)} />
                <Tab label="Academic Details" {...a11yProps(1)} />
                <Tab label="Social Profiles" {...a11yProps(2)} />
                <Tab label="Summery" {...a11yProps(3)} />
            </Tabs>
            <TabPanel value={value} index={0}>
                <PersonalDetails />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <AcademicDetails />
            </TabPanel>
            <TabPanel value={value} index={2}>
                <SocialProfiles />
            </TabPanel>
            <TabPanel value={value} index={3}>
                <ProfileSummery />
            </TabPanel>
            </Box>
            {/* <Box 
                sx={{
                    height: '100%',
                    width: '40%',
                    display: 'flex',
                    bgcolor: 'lightblue'
                }}
            >
                <Typography variant='h4' padding={1}>
                    Personal Details
                </Typography>
            </Box>
            <Box component='form' noValidate sx={{m: 3}}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            label="First Name"
                            type="search"
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            label="Middle Name"
                            type="search"
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            label="Last Name"
                            type="search"
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={8}>
                        <TextField
                            label="Username"
                            type="search"
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={4}>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Age"
                        >
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Password"
                            type="password"
                            variant="outlined"
                        />
                    </Grid>
                </Grid>
            </Box> */}
        </>
    )
}

export default RegisterationForm;
import React from 'react'
import AuthContext from "../../Context/AuthContext/AuthContext";
import request, { setAuthToken } from "../../Utils/AxiosHelper";
import { useNavigate, Link as RouterLink } from 'react-router-dom';

import {Box, 
        Paper,
        Stack,  
        Button,
        TextField,
        Typography} from '@mui/material';
import RegisterationForm from '../RegistrationForm/RegistrationForm';

function Register() {
    const [username, setUsername] = React.useState('');
    const [password, setPassowrd] = React.useState('');

    const {setAuth} = React.useContext(AuthContext);

    const navigateTo = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault();
        console.log("In Register")
    }

    return (
        <Box 
            sx={{
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
            <Paper elevation={3}
             sx= {{
                    height: '70%',
                    width: '60%',
                    borderRadius: '10px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-start'
                }}
            >
                <Box
                    padding={3}
                    sx={{
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between'
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'row'
                        }}
                    >
                        <Typography variant='h4'>       
                            Registration
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            flexGrow : 1,
                            display: 'flex',
                            flexDirection: 'row',
                        }}
                    >
                        <RegisterationForm />
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'row-reverse'
                        }}
                    >
                        <Typography variant='h9' padding={1}>
                            Already have an Account? <RouterLink to={'/login'}>Sign in</RouterLink>.
                        </Typography>
                    </Box>
                </Box>
            </Paper>
        </Box>
      );
}


export default Register;

{/* <div className="login-container">
            <div className="form-container">
                <form onSubmit={handleRegister} >
                    <h1>Register</h1>
                    <label for="email">Email or phone number</label>
                    <input type="text" id="email" name="email" 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} required />

                    <label for="password">Password</label>
                    <input type="password" id="password" name="password" 
                        value={password} 
                        onChange={(e) => setPassowrd(e.target.value)} required />
				    <input type="submit" value="Sign In" />
                </form> 
                <p className="signup-link">Don't have an Account? <Link to={"/home"}>Register now</Link>.</p>
                <p className="help-link">Forgot your email or password? <a href="/home">Click here</a>.</p>
            </div>
        </div> */}
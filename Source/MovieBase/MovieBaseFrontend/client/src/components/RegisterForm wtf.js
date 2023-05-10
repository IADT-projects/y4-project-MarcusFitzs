import { useState } from 'react';
import axios from '../config';

import { useNavigate } from "react-router-dom";

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';


const LoginForm = (props) => {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: ""
    });
    const [errorMessage, setErrorMessage] = useState("");

    const styles = { color: "red", backgroundColor:"white" };

    const navigate = useNavigate();

    const handleForm = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        setForm(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    //Send form data to server
    const submitForm = () => {
        // console.log("Name: ", form.name);
        console.log("Email: ", form.email);
        console.log("Password: ", form.password);
        

        // axios.post('/login', {
        //         email: form.email,
        //         password: form.password
        //     })
        //      .then((response) => {
        //         const users = response.data.user._id
        //         // console.log(response.data);
        //         setErrorMessage("");
        //         props.onAuthenticated(true, response.data.token);
        //         localStorage.setItem('userID', users);
        //         // console.log('user', user)
        //         const userID = localStorage.getItem('userID');
        //         console.log('userID: ', userID)
        //         console.log("Token: ", response.data.token);

        //      })
        //      .catch((err) => {
        //         console.error(err);
        //         console.log(err.response.data);
        //         setErrorMessage(err.response.data.message);
        //      });
    };

    const regForm = () => {
        navigate('/register')
    };


    //Login form
    return (
        <>
            <div class="loginForm">
            <h1>Login</h1>
            <Box 
            component="form" 
            noValidate 
            sx={{ 
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center', 
            }}>
                <TextField type="text" name="email" value={form.email} fullWidth onChange={handleForm} label="Email Address"></TextField>
                <br />
                <TextField type="password" name="password" fullWidth value={form.password} onChange={handleForm} label="Password"></TextField>
                <br />
                <Button onClick={submitForm} fullWidth variant="contained">Submit</Button>
                <p style={styles}>{errorMessage}</p>
                No account? <Button onClick={regForm} >Register</Button>
            </Box>
            </div>
        </>
    );
};

export default LoginForm;
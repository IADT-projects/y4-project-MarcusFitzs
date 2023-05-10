import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem'; 

const Navbar = (props) => {
    const navigate = useNavigate();

    const logout = () => {
        props.onAuthenticated(false);
        navigate('/');
    };

    //Dynamically set anchors for multiple buttons/drop downs
    // const [anchorState, setAnchorState] = useState({
    //     btn1: null,
    //     btn2: null,
    // });
    
    // const handleClick = (e) => {
    //     setAnchorState({ [e.target.name]: e.currentTarget });
    // };
    
    // const handleClose = (e) => {
    //     setAnchorState({ [e.target.name]: null });
    // };


    return (
        <Grid item xs={12}>
            <Button component={Link} to='/'>Home</Button>
            <Button component={Link} to='/movies'>Movies</Button>
            <Button component={Link} to='/profile'>Profile</Button>

            {/* Show logout button if logged in */}
            {(props.authenticated) ? (
                <Button onClick={logout}>Logout</Button>
            ) : ""}
        </Grid>
    );
};

export default Navbar;
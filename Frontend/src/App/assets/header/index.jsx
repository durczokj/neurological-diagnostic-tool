import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import pg_logo from './pg_logo.jfif';
import wum_logo from './wum_logo.png';
// Styling
const useStyles = makeStyles((theme) => ({
    logoContainer: {
        display: 'flex',
        alignItems: 'center',
        marginRight: theme.spacing(2),
    },
    logo: {
        width: 40,
        height: 40,
        marginRight: theme.spacing(1),
    },
}));

const Header = () => {
    const classes = useStyles();

    return (
        <AppBar position="static">
            <Toolbar>
                <div className={classes.logoContainer}>
                    <img className={classes.logo} src={pg_logo} alt="Logo 1" />
                    <img className={classes.logo} src={wum_logo} alt="Logo 2" />
                </div>
                <Typography variant="h6">Symptom Diagnosis System</Typography>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
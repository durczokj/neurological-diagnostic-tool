import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Link } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    footer: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(2),
        marginTop: 'auto',
    },
}));

const Footer = () => {
    const classes = useStyles();

    return (
        <footer className={classes.footer}>
            <Typography variant="body2" color="textSecondary" align="center">
                {'Warsaw University of Medicine'}
                <Link color="inherit" href="https://www.wum.edu.pl/">
                    WUM
                </Link>
            </Typography>
        </footer>
    );
};

export default Footer;
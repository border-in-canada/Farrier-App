import React from 'react';
import styles from './Toolbar.module.css';
import Typography from '@material-ui/core/Typography';
import Appbar from '@material-ui/core/Appbar';
import Toolbar from '@material-ui/core/Toolbar';
import Nav from '../Nav/Nav';

const toolbar = () => (
    <Appbar color="primary" position="static">
        <Toolbar className={styles.Toolbar}>
            <Typography variant="h4" color="inherit">
                LOGO
            </Typography>
            <Nav />
        </Toolbar>
    </Appbar>
)

export default toolbar;
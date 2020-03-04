import React from 'react';
import styles from './Toolbar.module.css';
import Appbar from '@material-ui/core/Appbar';
import Toolbar from '@material-ui/core/Toolbar';
import Nav from '../Nav/Nav';
import logo from '../../../media/logo.svg';

const toolbar = () => (
    <Appbar color="primary" position="static">
        <Toolbar className={styles.Toolbar}>
            <div className={styles.Logo}>
                <img src={logo} alt="logo" />
                <h2>Happy Hooves</h2>
            </div>
            <Nav />
        </Toolbar>
    </Appbar>
)

export default toolbar;
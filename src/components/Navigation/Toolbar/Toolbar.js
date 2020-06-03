import React from 'react';
import styles from './Toolbar.module.css';
import Appbar from '@material-ui/core/Appbar';
import Toolbar from '@material-ui/core/Toolbar';
import Nav from '../Nav/Nav';
import logo from '../../../media/logo.svg';
import { connect } from 'react-redux';

const toolbar = (props) => (
    <Appbar color="primary" position="static">
        <Toolbar className={styles.Toolbar}>
            {props.isAuth ? 
            <div className={styles.AuthLogo}>
                <div className={styles.Auth}><img src={logo} alt="logo" /></div>
                <h2>Happy Hooves</h2>
            </div>: 
            <div className={styles.LogoContainer}>
                <div className={styles.Logo}><img src={logo} alt="logo" /></div>
                <h1>Happy Hooves</h1>
            </div> }
            <Nav />
        </Toolbar>
    </Appbar>
)

const mapStateToProps = state => {
    return {
        isAuth: state.auth.isAuthenticated
    }
}                   

export default connect(mapStateToProps, null)(toolbar);
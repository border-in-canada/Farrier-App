import React, { Component } from 'react';
import styles from './LoginContainer.module.css';
import Login from '../../containers/Login/Login';
import Signup from '../../containers/Signup/Signup';
import { Button } from '@material-ui/core';

class LoginContainer extends Component {
    state = {
        showLogin: true
    }

    showLogin = () => {
        if (!this.state.showLogin) this.setState(() => ({ showLogin: true }));
    }

    hideLogin = () => {
        if (this.state.showLogin) this.setState(() => ({ showLogin: false }));
    }

    render () {
        return (
            <div className={`${styles.LoginContainer} ${this.state.showLogin ? styles.Shrink : styles.Grow}`}>
                <div className={styles.Toggle}>
                    <Button onClick={this.showLogin}
                    variant={this.state.showLogin ? "contained" : "outlined"}
                    color="secondary"
                    size="medium"
                    >Login</Button>  
                    <Button onClick={this.hideLogin}
                    variant={!this.state.showLogin ? "contained" : "outlined"}
                    color="secondary"
                    size="medium"
                    >Signup</Button>
                </div>
                <Login show={this.state.showLogin}/>   
                <Signup show={this.state.showLogin}/> 
            </div> 
        );
    }
};

export default LoginContainer;


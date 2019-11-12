import React, { Component } from 'react';
import styles from './LoginContainer.module.css';
import Login from '../../containers/Login/Login';
import Signup from '../../containers/Signup/Signup';
import { Button } from '@material-ui/core';

class LoginContainer extends Component {
    state = {
        showLogin: true,
        touched: false
    }

    buttonToggleHandler = () => {
        this.setState((prevState) => {
            return {showLogin: !prevState.showLogin, touched: !prevState.touched}
        });
    }

    render () {
        return (
            <div className={`${styles.LoginContainer} ${this.state.showLogin ? styles.Shrink : styles.Grow}`}>
                <div className={styles.Toggle}>
                    <Button onClick={this.buttonToggleHandler}
                    variant={this.state.showLogin ? "contained" : "outlined"}
                    color="secondary"
                    size="medium"
                    >Login</Button>  
                    <Button onClick={this.buttonToggleHandler}
                    variant={!this.state.showLogin ? "contained" : "outlined"}
                    color="secondary"
                    size="medium"
                    >Signup</Button>
                </div>
                <Login touched={this.state.touched} show={this.state.showLogin}/>   
                <Signup touched={this.state.touched} show={this.state.showLogin}/> 
            </div> 
        );
    }
};

export default LoginContainer;


import React, { Component } from 'react';
import Aux from '../Aux';
import styles from './LoginContainer.module.css';
import Button from '../../components/UI/Button/Button';
import Login from '../../containers/Login/Login';
import Signup from '../../containers/Signup/Signup';

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

        let BtnName;
        this.state.showLogin ? BtnName = "SIGNUP" : BtnName = "LOGIN";

        return (
            <Aux>
                <div className={`${styles.LoginContainer} ${this.state.showLogin ? styles.Shrink : styles.Grow}`}>
                    <Login touched={this.state.touched} show={this.state.showLogin}/>   
                    <Signup touched={this.state.touched} show={this.state.showLogin}/> 
                </div> 
                <div className={styles.Toggle}>
                    <Button clicked={this.buttonToggleHandler} btnType="Toggle">{BtnName}</Button>
                </div> 
            </Aux>
        );
    }
};

export default LoginContainer;


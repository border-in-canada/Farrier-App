import React, { Component } from 'react';
import { Button } from '@material-ui/core';
import Input from '../../components/UI/Input/Input';
import styles from './Login.module.css';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import { withRouter, Link } from "react-router-dom";
import StatusText from '../../components/UI/StatusText/StatusText';


class Login extends Component {
   //Form Setup
    state = {
        formContent: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    label: 'Email',
                    placeholder: 'Email',
                    disabled: false,
                    msgValue: '',
                    msgType: ''
                },
                value: ''
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    label: 'Password',
                    placeholder: 'Password',
                    disabled: false,
                    msgValue: '',
                    msgType: ''
                },
                value: ''
            }
        }
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedFormContent = {...this.state.formContent};
        const updatedFormElement = {...updatedFormContent[inputIdentifier]};
        updatedFormElement.value = event.target.value;
        updatedFormContent[inputIdentifier] = updatedFormElement;
        this.setState({formContent: updatedFormContent});
    }

    
    submitHandler = (event) => {
       event.preventDefault();
        const formData = {};
        for (let formElementIdentifier in this.state.formContent) {
            formData[formElementIdentifier] = this.state.formContent[formElementIdentifier].value;
        };
        this.props.onAuth(formData, this.props.history);
    }

    render () {

        const formElementsArray = [];
        for (let key in this.state.formContent) {
            formElementsArray.push({
                id: key,
                config: this.state.formContent[key]
            });
        }

        let form = (
            <form onSubmit={this.submitHandler}>
                {formElementsArray.map(formElement => (  
                    <Input
                    key={formElement.id}
                    id={formElement.id}
                    elementType={formElement.config.elementType} 
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    changed={(event) => this.inputChangedHandler(event, formElement.id)}
                    />
                ))}
                <div className={styles.SubmitContainer}><Button type="submit" variant="contained" color="primary" size="medium">Submit</Button></div>
                
            </form>
            
        );

        return (
            this.props.isError ? 
            <div className={`${this.props.show ? styles.Show : styles.Hide}`}>
                {form}
                <div style={{paddingTop: '1em'}}>
                    <StatusText msgType='Error' msgValue={this.props.isError} />
                </div>
                <div className={styles.LinkContainer}>
                    <Link className={styles.Link} to="/resetpassword">Forgot Password?</Link>
                </div>
            </div> :
            <div className={`${this.props.show ? styles.Show : styles.Hide}`}>
                {form}
                <div className={styles.LinkContainer}><Link className={styles.Link} to="/resetpassword">Forgot Password?</Link></div>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (formData, history) => dispatch(actions.auth(formData, history))
    }
};

const mapStateToProps = state => {
    return {
        isError: state.auth.error
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
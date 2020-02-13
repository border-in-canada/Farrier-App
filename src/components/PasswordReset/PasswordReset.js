import React, { Component } from 'react';
import { Button } from '@material-ui/core';
import Input from '../UI/Input/Input';
import styles from './PasswordReset.module.css';
import { connect, MapDispatchToProps } from 'react-redux';
import * as actions from '../../store/actions/index';
import { withRouter, Link } from "react-router-dom"


class PasswordReset extends Component {
   
    state = {
        formContent: {            
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 8,
                    maxLength: 24,
                    pwPattern: true
                },
                valid: false,
                touched: false
            },
            confirmPassword: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Verify Password'
                },
                value: '',
                validation: {
                    required: true,
                    doesMatch: true
                },
                valid: false,
                touched: false
            }
        }
    }

    checkValidity(value, rules) {
        let isValid = true;

        if( rules.required ) {
            isValid = value.trim() !== '' && isValid;
        }
        
        if( rules.minLength ) {
            isValid = value.length >= rules.minLength && isValid;
        }

        if( rules.maxLength ) {
            isValid = value.length <= rules.maxLength && isValid;
        }

        if ( rules.pwPattern ) {
            let pwRegEx = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/);
            isValid = pwRegEx.test(value) === true && isValid;
        }

        if( rules.doesMatch ) {
            if ( value === this.state.formContent.password.value && isValid ) {
                isValid = true;
            }
            else {
                isValid = false;
            }
        }
        return isValid;
        
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedFormContent = {...this.state.formContent};
        const updatedFormElement = {...updatedFormContent[inputIdentifier]};
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedFormContent[inputIdentifier] = updatedFormElement;
        let formIsValid = true;
        for (let inputIdentifier in updatedFormContent) {
            formIsValid = updatedFormContent[inputIdentifier].valid && formIsValid;
        }
        this.setState({formContent: updatedFormContent, formIsValid: formIsValid});
    }

    
    submitHandler = (event) => {
        event.preventDefault();
        const query = new URLSearchParams(this.props.location.search);
        const token = query.get('resetToken');
        const formData = {};
        for (let formElementIdentifier in this.state.formContent) {
            formData[formElementIdentifier] = this.state.formContent[formElementIdentifier].value;
        };
        formData.resetToken = token;
        console.log(formData);
        this.props.resetSubmit(formData, this.props.history);
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
                    elementType={formElement.config.elementType} 
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    invalid={!formElement.config.valid}
                    shouldValidate={formElement.config.validation}
                    touched={formElement.config.touched}
                    label={formElement.config.elementConfig.label}
                    changed={(event) => this.inputChangedHandler(event, formElement.id)}
                    />
                   
                ))}
                {!this.state.formIsValid ? 
                <Button 
                type="submit"
                color="primary" 
                variant="contained" 
                size="medium" 
                disabled={!this.state.formIsValid}>SUBMIT</Button> :
                <Button 
                type="submit"
                color="primary" 
                variant="contained" 
                size="medium" 
                disabled={!this.state.formIsValid}>SUBMIT</Button>}
            </form>
            
        );

        return (
            <div className={styles.FormContainer}>
                {form}
            </div>
        );
    }
}


const mapDispatchToProps = dispatch => {
    return {
        resetSubmit: (formData, history) => dispatch(actions.passwordReset(formData, history))
    }
};

export default connect(null, mapDispatchToProps)(withRouter(PasswordReset));
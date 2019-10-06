import React, { Component } from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import styles from './Signup.module.css';
import axios from 'axios';

class Signup extends Component {
    state = {
        formContent: {
            //Make a helper function to make this more clean//
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email'
                },
                value: '',
                validation: {
                    required: true,
                    mailPattern: true
                },
                valid: false,
                touched: false
            },
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
        },
        submitDisabled: true
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedFormContent = {...this.state.formContent};
        const updatedFormElement = {...updatedFormContent[inputIdentifier]};
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        console.log(updatedFormElement);
        updatedFormContent[inputIdentifier] = updatedFormElement;
        this.setState({formContent: updatedFormContent});
    }

    checkValidity(value, rules) {
        let isValid = true;

        if( rules.required ) {
            isValid = value.trim() !== '' && isValid;
        }
        if ( rules.mailPattern ) {
            let regEx = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
            isValid = regEx.test(value) === true && isValid;
        }

        if( rules.minLength ) {
            isValid = value.length >= rules.minLength && isValid;
        }

        if( rules.maxLength ) {
            isValid = value.length <= rules.maxLength && isValid;
        }

        if ( rules.pwPattern ) {
            let pwRegEx = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/);
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

    submitHandler = (event) => {
       event.preventDefault();
        const formData = {};
        for (let formElementIdentifier in this.state.formContent) {
            formData[formElementIdentifier] = this.state.formContent[formElementIdentifier].value;
        }
        
        axios.post('http://localhost:3000/account/signup', formData, { withCredentials: true })
            .then(response => {
                this.props.history.push('/');
            })
            .catch(error => {
                console.log('Error on Submission');
            })
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
                {this.state.submitDisabled !== true ? 
                <Button btnType="Success">SUBMIT</Button> : 
                <Button btnType="Disabled">SUBMIT</Button>
                }
            </form>
        );

        return (
            <div className={styles.FormContainer}>
                <h1>User Signup</h1>
                {form}
            </div>
        );
    }
}

export default Signup;
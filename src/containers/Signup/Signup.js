import React, { Component } from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
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
                valid: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Email'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false
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
                    maxLength: 24
                },
                valid: false
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
                valid: false
            }
        },
        submitDisabled: true
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedFormContent = {...this.state.formContent};
        const updatedFormElement = {...updatedFormContent[inputIdentifier]};
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        console.log(updatedFormElement);
        updatedFormContent[inputIdentifier] = updatedFormElement;
        this.setState({formContent: updatedFormContent});
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
        axios.post('http://localhost:3000/account/signup', formData)
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
            <div>
                <h1>User Signup</h1>
                {form}
            </div>
        );
    }
}

export default Signup;
import React, { Component } from 'react';
import Input from '../../components/UI/Input/Input';
import input from '../../components/UI/Input/Input';

class Signup extends Component {
    state = {
        formContent: {
            //Make a helper function to make this more clean//
            firstName: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'First Name'
                },
                value: ''
            },
            lastName: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Last Name'
                },
                value: ''
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Email'
                },
                value: ''
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Password'
                },
                value: ''
            },
            pwVerify: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Verify Password'
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

    orderHandler = (event) => {
       event.preventDefault();
        const formData = {};
        for (let formElementIdentifier in this.state.formContent) {
            formData[formElementIdentifier] = this.state.formContent[formElementIdentifier].value;
        }
        const userSignup = {
            userForm: formData
        }
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
                {/* <input type="submit">SUBMIT</input> */}
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
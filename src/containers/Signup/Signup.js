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
                    placeholder: 'First Name'
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

    submitHandler = (event) => {
       event.preventDefault();
        const formData = {};
        for (let formElementIdentifier in this.state.formContent) {
            formData[formElementIdentifier] = this.state.formContent[formElementIdentifier].value;
        }
        delete formData.pwVerify;
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
                    changed={(event) => this.inputChangedHandler(event, formElement.id)}
                    />
                ))}
                <Button btnType="Success">SUBMIT</Button>
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
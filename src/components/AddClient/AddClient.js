import React, { Component } from 'react';
import Input from '../UI/Input/Input';
import { Button } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import styles from './AddClient.module.css';


class AddClient extends Component {
    state = {
        formContent: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'input',
                    placeholder: 'Name'
                },
                required: true,
                value: ''
            },
            email: {
                elementType: 'email',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email'
                },
                value: ''
            },
            phone: {
                elementType: 'tel',
                elementConfig: {
                    type: 'tel',
                    placeholder: 'Phone'
                },
                value: ''
            },
            address1: {
                elementType: 'input',
                elementConfig: {
                    type: 'input',
                    placeholder: 'Address1'
                },
                value: ''
            },
            address2: {
                elementType: 'input',
                elementConfig: {
                    type: 'input',
                    placeholder: 'Address2'
                },
                value: ''
            },
            address3: {
                elementType: 'input',
                elementConfig: {
                    type: 'input',
                    placeholder: 'Address3'
                },
                value: ''
            },
            city: {
                elementType: 'input',
                elementConfig: {
                    type: 'input',
                    placeholder: 'City'
                },
                value: ''
            },
            stateProvince: {
                elementType: 'select',
                elementConfig: {
                    type: 'select',
                    placeholder: 'State'
                },
                value: ''
            },
            postalCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'input',
                    placeholder: 'Zip'
                },
                value: ''
            },
            notes: {
                elementType: 'text-area',
                elementConfig: {
                    type: 'textarea',
                    placeholder: 'Notes'
                },
                value: ''
            },
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
        const data = {};
        for (let formElementIdentifier in this.state.formContent) {
            data[formElementIdentifier] = this.state.formContent[formElementIdentifier].value;
        };
        this.props.onAuth(data, this.props.history);
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
                    <div className={styles.InputDiv}>
                        <Input
                        key={formElement.id}
                        elementType={formElement.config.elementType} 
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        label={formElement.config.elementConfig.label}
                        changed={(event) => this.inputChangedHandler(event, formElement.id)}
                    /> 
                    </div>
                ))}
                <div>
                    <Button type="submit" variant="contained" color="primary" size="medium">Add</Button><br />
                </div>
            </form>
            
        );

        return (
            <div>
                <h1>Add Client</h1>
                <div className={styles.FormContainer}>
                    {form}
                </div>
            </div>
            
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (data, history) => dispatch(actions.addClient(data, history))
    }
};


export default withRouter(connect(null, mapDispatchToProps)(AddClient));
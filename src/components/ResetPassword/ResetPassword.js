import React, { Component } from 'react';
import { Button } from '@material-ui/core';
import Input from '../UI/Input/Input';
import styles from './ResetPassword.module.css';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import { withRouter } from "react-router-dom"


class ResetPassword extends Component {
   
    state = {
        formContent: {            
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email'
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
                    label={formElement.config.elementConfig.label}
                    changed={(event) => this.inputChangedHandler(event, formElement.id)}
                    /> 
                ))}
                <Button type="submit" variant="contained" color="primary" size="medium">Reset</Button>
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
        resetSubmit: (formData, history) => dispatch(actions.requestPasswordReset(formData, history))
    }
};

export default connect(null, mapDispatchToProps)(withRouter(ResetPassword));
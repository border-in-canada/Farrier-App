import React, { Component } from 'react';
import Input from '../UI/Input/Input';
import { Button } from '@material-ui/core';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import styles from './EditClient.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';


class EditClient extends Component {
    
    state = {
        formContent: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Name',
                    label: 'Name',
                    width: '100%',
                    disabled: false,
                    msgValue: '',
                    msgType: ''
                },
                required: true,
                value: this.props.clientData.name
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email',
                    label: 'Email',
                    width: '100%',
                    disabled: false,
                    msgValue: '',
                    msgType: ''
                },
                value: this.props.clientData.email
            },
            phone: {
                elementType: 'input',
                elementConfig: {
                    type: 'tel',
                    placeholder: 'Phone',
                    label: 'Phone',
                    width: '100%',
                    disabled: false,
                    msgValue: '',
                    msgType: ''
                },
                value: this.props.clientData.phone
            },
            address1: {
                elementType: 'input',
                elementConfig: {
                    type: 'input',
                    placeholder: 'Address',
                    label: 'Address',
                    width: '100%',
                    disabled: false,
                    msgValue: '',
                    msgType: ''
                },
                value: this.props.clientData.address1
            },
            address2: {
                elementType: 'input',
                elementConfig: {
                    type: 'input',
                    placeholder: 'Address 2',
                    label: 'Address 2',
                    width: '100%',
                    disabled: false,
                    msgValue: '',
                    msgType: ''
                },
                value: this.props.clientData.address2
            },
            address3: {
                elementType: 'input',
                elementConfig: {
                    type: 'input',
                    placeholder: 'Address 3',
                    label: 'Address 3',
                    width: '100%',
                    disabled: false,
                    msgValue: '',
                    msgType: ''
                },
                value: this.props.clientData.address3
            },
            city: {
                elementType: 'input',
                elementConfig: {
                    type: 'input',
                    placeholder: 'City',
                    label: 'City',
                    width: '100%',
                    disabled: false,
                    msgValue: '',
                    msgType: ''
                },
                value: this.props.clientData.city
            },
            stateProvince: {
                elementType: 'select',
                elementConfig: {
                    type: 'select',
                    placeholder: 'State',
                    label: 'State',
                    options: [{value: "Alabama", label: "Alabama"}, {value: "Alaska", label: "Alaska"}, {value: "Arizona", label: "Arizona"}, {value: "Arkansas", label: "Arkansas"}, {value: "California", label: "California"}, {value: "Colorado", label:"Colorado"},{value: "Connecticut", label: "Connecticut"}, {value: "Delaware", label: "Delaware"}],
                    // </option><option value="District of Columbia">District of Columbia</option><option value="Florida">Florida</option><option value="Georgia">Georgia</option><option value="Guam">Guam</option><option value="Hawaii">Hawaii</option><option value="Idaho">Idaho</option><option value="Illinois">Illinois</option><option value="Indiana">Indiana</option><option value="Iowa">Iowa</option><option value="Kansas">Kansas</option><option value="Kentucky">Kentucky</option><option value="Louisiana">Louisiana</option><option value="Maine">Maine</option><option value="Maryland">Maryland</option><option value="Massachusetts">Massachusetts</option><option value="Michigan">Michigan</option><option value="Minnesota">Minnesota</option><option value="Mississippi">Mississippi</option><option value="Missouri">Missouri</option><option value="Montana">Montana</option><option value="Nebraska">Nebraska</option><option value="Nevada">Nevada</option><option value="New Hampshire">New Hampshire</option><option value="New Jersey">New Jersey</option><option value="New Mexico">New Mexico</option><option value="New York">New York</option><option value="North Carolina">North Carolina</option><option value="North Dakota">North Dakota</option><option value="Northern Marianas Islands">Northern Marianas Islands</option><option value="Ohio">Ohio</option><option value="Oklahoma">Oklahoma</option><option value="Oregon">Oregon</option><option value="Pennsylvania">Pennsylvania</option><option value="Puerto Rico">Puerto Rico</option><option value="Rhode Island">Rhode Island</option><option value="South Carolina">South Carolina</option><option value="South Dakota">South Dakota</option><option value="Tennessee">Tennessee</option><option value="Texas">Texas</option><option value="Utah">Utah</option><option value="Vermont">Vermont</option><option value="Virginia">Virginia</option><option value="Virgin Islands">Virgin Islands</option><option value="Washington">Washington</option><option value="West Virginia">West Virginia</option><option value="Wisconsin">Wisconsin</option><option value="Wyoming">Wyoming</option></select>]
                    width: '100%',
                    disabled: false,
                    msgValue: '',
                    msgType: ''
                },
                value: this.props.clientData.stateProvince
            },
            postalCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'input',
                    placeholder: 'Zip Code',
                    label: 'Zip Code',
                    width: '100%',
                    disabled: false,
                    msgValue: '',
                    msgType: ''
                },
                value: this.props.clientData.postalCode
            },
            notes: {
                elementType: 'text-area',
                elementConfig: {
                    type: 'textarea',
                    placeholder: 'Notes',
                    label: 'Notes',
                    width: '100%',
                    disabled: false,
                    msgValue: '',
                    msgType: ''
                },
                value: this.props.clientData.notes
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

    dropdownChangedHandler = (selectedOption, inputId) => {
        const newValue = selectedOption.value;
        const updatedFormContent = {...this.state.formContent};
        const updatedFormElement = {...updatedFormContent[inputId]};
        updatedFormElement.value = newValue;
        updatedFormContent[inputId] = updatedFormElement;
        this.setState({formContent: updatedFormContent});
    }

    deleteClientHandler = (clientId) => {
        this.props.deleteClient(clientId, this.props.history);
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
            <form className={styles.FormContainer} onSubmit={this.submitHandler}>
                {formElementsArray.map(formElement => (
                    <Input
                    key={formElement.id}
                    elementType={formElement.config.elementType} 
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    changed={(event) => this.inputChangedHandler(event, formElement.id)}
                    dropdownChanged={(selectedOption) => this.dropdownChangedHandler(selectedOption, formElement.id)}
                    />
                ))}
                <div className={styles.ButtonContainer}>
                    <div style={{width: '4em', paddingLeft: '1em'}}><Link to='/dashboard/clients'><Button variant="contained" color="secondary" size="medium" fullWidth>Cancel</Button></Link></div>
                    <div style={{width: '5em', paddingLeft: '1em'}}><Button type="submit" variant="contained" color="primary" size="medium" fullWidth>Update</Button></div>
                </div>
            </form>
            
        );

        return (
            <div style={{width: '100%'}}>
                <div className={styles.EditBanner}>
                    <p></p>
                    <h2>Edit Client</h2>
                    <i onClick={() => this.deleteClientHandler(this.props.clientData.id)}><FontAwesomeIcon icon={faTrash} size="lg" /></i>
                </div>
                {form}
            </div>
            
        );
    }
}

const mapStateToProps = state => {
    return {
        clientData: state.auth.clientEditData
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (data, history) => dispatch(actions.addClient(data, history)),
        deleteClient: (clientId, history) => dispatch(actions.deleteClient(clientId, history))
    }
};


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditClient));
import React, { Component } from 'react';
import Select, { components } from 'react-select';
import styles from './Dropdown.module.css';
import './Select.css';
import StatusText from '../StatusText/StatusText';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';

class Dropdown extends Component {
    
    state = {
        focused: false
    }

    focusHandler = () => {
        this.setState({focused: !this.state.focused});
    }
    
    render() {

    const {id, placeholder, label, width, disabled, searchable, value, msgValue, msgType, changed} = {...this.props};
    const options = [...this.props.options];

    const ContainerClassName = [
        styles.Container, 
        `${(this.state.focused || value) && `${styles.Focus}`}`, 
        `${(msgType === 'Error' ? `${styles.Error}` : '')}`,
        `${(value && !this.state.focused  ? `${styles.Filled}` : '')}`,
        `${(disabled ? `${styles.Disabled}` : '')}`];

    const customStyles = {
        control: (provided, state) => ({
            height: '56px',
            width: '100%',
            borderBottom: state.isDisabled ? 'solid 2px #B3B3B3' : state.isFocused ? 'solid 2px #2965CC' : msgType === 'Error' ? 'solid 2px #E60000' :'solid 2px #999999',
            boxShadow: state.isFocused ? '0 0 3px #E4EBF8' : '',
            boxSizing: 'border-box',
            borderRadius: '4px',
            backgroundColor: 'transparent'
        }),
        menu: (provided, state) => ({
            ...provided,
            padding: '0',
            marginTop: '2px',
            border: '1px solid #999999',
            boxShadow: '0 4px 8px 0 #4D4D4D',
            borderRadius: '4px',
            backgroundColor: 'white'
        }),
        placeholder: (provided, state) => ({
            position: 'absolute',
            bottom: '8px',
            left: '16px',
            display: state.isFocused ? '' : 'none',
            color: '#767676'
        }),
        valueContainer: (provided, state) => ({
            width: '100%',
            position: 'absolute',
            bottom: '0',
            padding: '0 0 8px 14px'
        }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isSelected ? 'F5F8FD' : '',
            ':hover': {backgroundColor: '#F5F8FD', color: '#2D59A6'}
        }),
        indicatorsContainer: (provided, state) => ({
            position: 'absolute',
            right: '4px',
            top: '16px'
        }),
        dropdownIndicator: (provided, state) => ({
            transform: state.selectProps.menuIsOpen ? 'rotate(180deg)' : null,
            color: msgType === 'Error' ? '#E60000' : state.isDisabled ? '#D7D7D7' : state.isFocused ? '#2965CC' : '#A1A1A1'
        })
    }

    const DropdownIndicator = props => {
        return (
          components.DropdownIndicator && (
            <components.DropdownIndicator {...props}>
              <FontAwesomeIcon icon={props.selectProps.menuIsOpen ? faChevronUp : faChevronDown}/>
            </components.DropdownIndicator>
        ));
    };

        return (
            <div style={{width: width, marginBottom: '1.8em'}}>
                <div className={ContainerClassName.join(' ')}>
                    <Select  
                        id={id}
                        placeholder={placeholder}
                        isDisabled={disabled}
                        styles={customStyles}
                        classNamePrefix='SelectStyle'
                        maxMenuHeight='180px'
                        components={DropdownIndicator}
                        onFocus={this.focusHandler}
                        onBlur={this.focusHandler}
                        onChange={changed}
                        options={options}
                        // value={value}
                        searchable={searchable}
                    /> 
                    <label htmlFor={id}>{label}</label>
                </div>
                { msgValue ? <StatusText msgValue={msgValue} msgType={msgType} /> : null }
            </div>
        );
    }
}

export default Dropdown;
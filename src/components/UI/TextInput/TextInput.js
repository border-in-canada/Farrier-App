import React, { Component } from 'react';
import styles from './TextInput.module.css';
import StatusText from '../StatusText/StatusText';

class TextInput extends Component {

    state = {
        focused: false
    }

    focusHandler = () => {
        this.setState({focused: !this.state.focused});
    }

    render() {

        const {id, type, width, placeholder, label, disabled, value, msgValue, msgType, changed} = {...this.props};

        const ContainerClassName = [
            styles.Container, 
            `${(disabled ? this.state.focused : this.state.focused || value) && `${styles.Focus}`}`, 
            `${(msgType === 'Error' ? `${styles.Error}` : '')}`,
            `${(value && !this.state.focused  ? `${styles.Filled}` : '')}`,
            `${(disabled ? `${styles.Disabled}` : '')}`];

        return (
            <div style={{width: width}}>
                <div className={ContainerClassName.join(' ')}>
                    <input 
                        type={type}
                        id={id}
                        value={value}
                        placeholder={placeholder}
                        disabled={disabled}
                        onChange={changed}
                        onFocus={this.focusHandler}
                        onBlur={this.focusHandler}
                    />
                    <label htmlFor={id}>{label}</label>
                </div>
                <StatusText msgValue={msgValue} msgType={msgType} />
            </div>
        );
    }
}

export default TextInput;
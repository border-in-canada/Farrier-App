import React from 'react';
import styles from './Input.module.css';
import { Input, InputLabel, FormControl } from '@material-ui/core';

const input = (props) => {
    let inputElement = null;
    const inputClasses = [styles.InputElement];

    if (props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push(styles.Invalid);
    }

    switch (props.elementType) {
        case ('input'):
            inputElement = <Input 
            className={inputClasses.join(' ')}
            id={props.key}
            {...props.elementConfig} 
            value={props.value}
            onChange={props.changed}
            />;
            break;
        default: 
            inputElement = <Input 
            className={inputClasses.join(' ')}
            id={props.key}
            {...props.elementConfig} 
            value={props.value}
            onChange={props.changed}
            />;
    }

    return (
        <FormControl margin="normal" fullWidth>
            {inputElement}
        </FormControl>
    
    );
};

export default input;

            
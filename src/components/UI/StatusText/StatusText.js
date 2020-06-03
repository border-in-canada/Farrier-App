import React from 'react';
import styles from './StatusText.module.css';

export default function StatusText(props) {

    const inputClasses = [styles.StatusDiv];

    if (props.msgType === 'Default'){
        inputClasses.push(styles.Default);
    }
    if (props.msgType === 'Error'){
        inputClasses.push(styles.Error);
    }
    if (props.msgType === 'Link'){
        inputClasses.push(styles.Link);
    }
    if (props.msgType === 'Success'){
        inputClasses.push(styles.Success);
    }

    return (
        <div className={inputClasses.join(' ')}>
            <span>{props.msgValue}</span>
        </div>
    );
}
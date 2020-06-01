import React from 'react';
import styles from './StatusText.module.css';

const statusTextComp = (props) => {

    const inputClasses = [styles.StatusDiv];

    if (props.type === 'Default'){
        inputClasses.push(styles.Default);
    }
    if (props.type === 'Error'){
        inputClasses.push(styles.Error);
    }
    if (props.type === 'Link'){
        inputClasses.push(styles.Link);
    }
    if (props.type === 'Success'){
        inputClasses.push(styles.Success);
    }

    return (
        <div className={inputClasses.join(' ')}>
            <span>{props.msg}</span>
        </div>
    );
}

export default statusTextComp;
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './ClientMenu.module.css';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';


const clientMenu = (props) => {
    return (
        <div className={styles.ClientMenu}>
            <ul>
                <label>Add Client</label><li><Link to="/dashboard/addclient"><FontAwesomeIcon icon={faPlus} size="lg" /></Link></li>
            </ul>
        </div>
    );
}

export default clientMenu;
import React from 'react';
import styles from './SideDrawer.module.css';
import { Link } from 'react-router-dom';

const sideDrawer = (props) => {
    return(
        <div className={styles.sideDrawer}>
            <div className={styles.Icons}></div>
                <ul>
                    <li><Link to="/dashboard/clients">Clients</Link></li>
                    <li><Link to="/dashboard/addclient">Add Client</Link></li>
                </ul>
        </div>
    );

     
}

export default sideDrawer;
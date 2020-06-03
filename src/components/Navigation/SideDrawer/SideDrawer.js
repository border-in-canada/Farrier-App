import React from 'react';
import styles from './SideDrawer.module.css';
import { NavLink } from 'react-router-dom';

const sideDrawer = (props) => {
    return(
        <div className={styles.sideDrawer}>
            <div className={styles.Icons}></div>
                <ul>
                    <NavLink 
                        to="/dashboard/clients" 
                        activeClassName={styles.active}>
                        <li>Clients</li>
                    </NavLink>
                    <NavLink 
                        to="/dashboard/addclient" 
                        activeClassName={styles.active}>
                        <li>Add Client</li>
                    </NavLink>
                </ul>
        </div>
    );

     
}

export default sideDrawer;
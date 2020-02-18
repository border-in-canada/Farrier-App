import React from 'react';
import styles from './SideDrawer.module.css';
import { Link } from 'react-router-dom';

const sideDrawer = (props) => {
    return(
        <div className={styles.sideDrawer}>
            <Link className={styles.Link} to="/dashboard/clients">Clients</Link>
        </div>
    );

     
}

export default sideDrawer;
import React from 'react';
import { List, ListItem, ListItemText } from '@material-ui/core';
import styles from './Nav.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const nav = (props) => {
    const authenticated = props.authenticated;
    return(
        <div className={styles.Nav}>
            <List component="nav">
                <ListItem component="div">
                    { authenticated === true ? 
                    <ListItemText >
                    <li><Link to="/logout"><FontAwesomeIcon icon={faSignOutAlt} size="lg" /></Link></li>
                    </ListItemText> :
                    <ListItemText >
                    <li><a href="/signin"><FontAwesomeIcon icon={faSignInAlt} size="lg" /></a></li>
                    </ListItemText>}
                    
                </ListItem>
            </List>
            
        </div>
    );
}

export default nav;
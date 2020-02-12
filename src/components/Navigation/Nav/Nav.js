import React from 'react';
import { List, ListItem, ListItemText } from '@material-ui/core';
import styles from './Nav.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const nav = (props) => {
    return(
        <div className={styles.Nav}>
            <List component="nav">
                <ListItem component="div">
                    { props.isAuth ? 
                    <ListItemText >
                    <li><Link to="/logout"><FontAwesomeIcon icon={faSignOutAlt} size="lg" /></Link></li>
                    </ListItemText> :
                    <ListItemText >
                    <li><Link to="/signin"><FontAwesomeIcon icon={faSignInAlt} size="lg" /></Link></li>
                    </ListItemText> }
                    
                </ListItem>
            </List>
            
        </div>
    );

     
}

const mapStateToProps = state => {
    return {
        isAuth: state.auth.token !== null
    }
}                   

export default connect(mapStateToProps, null)(nav);
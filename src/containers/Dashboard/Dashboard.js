import React from 'react';
import styles from './Dashboard.module.css';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import { Route, Switch } from 'react-router-dom';
import Clients from '../Clients/Clients';
import Dash from '../../components/Dash/Dash';
import AddClient from '../../components/AddClient/AddClient';

const dashboard = (props) => (
    <div className={styles.Container}>
        <div className={styles.SideDrawer}>
            <SideDrawer />
        </div>
        <div className={styles.Content}>
            <Switch>
                <Route path="/dashboard" exact component={Dash} />
                <Route path="/dashboard/clients" component={Clients} />
                <Route path="/dashboard/addclient" component={AddClient} />
            </Switch>
        </div>
    </div>
);

export default dashboard;

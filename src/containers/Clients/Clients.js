import React, { Component } from 'react';
import Griddle, { plugins } from 'griddle-react';
import styles from './Clients.module.css';

class Clients extends Component {

    render() {

        const data = [{
            id: '1',
            name: 'April',
            address: '1234 5th St',
            city: 'Raleigh',   
            state: 'NC',
            phone: '123-456-7890'
        },
        {
            id: '2',
            name: 'Robert',
            address: '125 8th St',
            city: 'Durham',   
            state: 'NC',
            phone: '123-456-7887'
        }];

        const layout = ({ Table, Pagination, Filter, SettingsWrapper }) => (
            <div>
                <div  className={styles.Layout}>
                    <Filter />
                    <SettingsWrapper />
                </div>
                <div><Table /></div>
                <div className={styles.Pagination}>
                    <Pagination />
                </div>
            </div>
            
        );

        const styleConfig = {
            styles: {
                Table: {borderCollapse: 'collapse'},
                TableHeadingCell: {borderBottom: '1px solid #ccc'},
                Cell: {padding: '1.5em', borderBottom: '1px solid #ccc'},
                Filter: {borderStyle: 'none none solid none', borderBottom: '1px solid #ccc', boxShadow: '0px 1px #ccc', height: '2em', width: '20em', fontSize: '14px'},
                SettingsToggle: {fontSize: '14px', borderRadius: '5px'}
            }
        }

        return(
            <div className={styles.GridContainer}>
                <Griddle 
                    data={data}
                    plugins={[plugins.LocalPlugin]}
                    styleConfig={styleConfig}
                    components={{Layout: layout}}
                />
            </div>
        );
    }
}

export default Clients;
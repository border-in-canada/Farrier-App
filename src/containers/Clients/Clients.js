import React, { Component } from 'react';
import ClientMenu from '../../components/ClientMenu/ClientMenu';
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
            phone: '123-456-7890',
            horses: [{name: 'Herman', color: 'white'}, {name: 'Moonbro', color: 'black'}]
        },
        {
            id: '2',
            name: 'Robert',
            address: '125 8th St',
            city: 'Durham',   
            state: 'NC',
            phone: '123-456-7887',
            horses: [{name: 'Nigel', color: 'brown'}, {name: 'Mike', color: 'orange'}]
        }];

        return(
            <div>
                <ClientMenu />
                <div className={styles.GridContainer}>
                    <Griddle 
                        data={data}
                        plugins={[plugins.LocalPlugin]}
                     />
                </div>
            </div>
        );
    }
}

export default Clients;
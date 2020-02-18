import React, { Component } from 'react';
import ClientMenu from '../../components/ClientMenu/ClientMenu';

class Clients extends Component {
    render() {
        return(
            <div>
                <ClientMenu />
                <h1>Welcome to the Clients Page!</h1>
            </div>
        );
    }
}

export default Clients;
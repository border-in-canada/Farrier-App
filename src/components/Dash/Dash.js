import React, { Component } from 'react';
import { connect } from 'react-redux';

class Dash extends Component {
   
    render() {
        return(
            <div style={{width: '100%', textAlign: 'center'}}>
                <h1>Welcome, {this.props.user}</h1>
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        user: state.auth.user
    }
};

export default connect(mapStateToProps, null)(Dash);
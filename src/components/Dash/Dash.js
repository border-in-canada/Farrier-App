import React, { Component } from 'react';
import { connect } from 'react-redux';

class Dash extends Component {
   
    render() {
        return(
            <div>
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
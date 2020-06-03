import React, { Component } from 'react';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class Logout extends Component {
    componentDidMount() {
        this.props.onLogout();
    }

    render() {
        return (<div></div>);
        
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch(actions.signOut())
    }
};

export default withRouter(connect(null, mapDispatchToProps)(Logout));
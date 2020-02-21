import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

class Dash extends Component {

    componentDidMount() {
        this.props.authCheck();
    }

    render() {

        return(
            <div>
                <h1>Welcome {this.props.user}!</h1>
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        user: state.auth.user
    }
};

const mapDispatchToProps = dispatch => {
    return {
      authCheck: () => dispatch(actions.authCheckState())
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(Dash);
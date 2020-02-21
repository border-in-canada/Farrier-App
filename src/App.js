import React, { Component } from 'react';
import styles from './App.module.css';
import Layout from './components/Layout/Layout';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import Splash from './components/Splash/Splash';
import LoginContainer from './hoc/LoginContainer/LoginContainer';
import Dashboard from './containers/Dashboard/Dashboard';
import Logout from './components/Logout/Logout';
import ResetPassword from './components/ResetPassword/ResetPassword';
import PasswordReset from './components/PasswordReset/PasswordReset';
import * as actions from './store/actions/index';

class App extends Component {

  componentDidMount() {
    this.props.authCheck();
    this.props.get();
}


  render () {

    let routes = (
      <Switch>
        <Route path="/" exact component={Splash} />
        <Route path="/signin" component={LoginContainer} />
        <Route path="/resetpassword" component={ResetPassword} />
        <Route path="/reset" component={PasswordReset} />
        <Redirect to="/" />
      </Switch>
      
    );

    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/logout" component={Logout} />
          <Redirect to="/dashboard" />
        </Switch>
      );
    }
    return (
      <div className={styles.App}>
        <Layout>
          {routes}
        </Layout>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated !== false
  };
};

const mapDispatchToProps = dispatch => {
  return {
    authCheck: () => dispatch(actions.authCheckState()),
    get: () => dispatch(actions.getUser())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));

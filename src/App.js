import React, { Component } from 'react';
import styles from './App.module.css';
import Layout from './components/Layout/Layout';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import Splash from './components/Splash/Splash';
import LoginContainer from './hoc/LoginContainer/LoginContainer';
import Dashboard from './containers/Dashboard/Dashboard';
import Logout from './components/Logout/Logout';
import * as actions from './store/actions/index';

class App extends Component {

  componentDidMount() {
    this.props.isAuthCheck();
  }
  
  render () {

    let routes = (
      <Switch>
        <Route path="/" exact component={Splash} />
        <Route path="/signin" component={LoginContainer} />
        <Redirect to="/" />
      </Switch>
      
    );

    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/" exact component={Splash} />
          <Route path="/signin" component={LoginContainer} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/logout" component={Logout} />
      </Switch>
      );
    }
    return (
      <div className={styles.App}>
        <Layout authenticated={this.props.isAuthenticated} >
          {routes}
        </Layout>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    isAuthCheck: () => dispatch(actions.authCheckState)
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));

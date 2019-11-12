import React, { Component } from 'react';
import styles from './App.module.css';
import Layout from './components/Layout/Layout';
import { Route } from 'react-router-dom';
import Splash from './components/Splash/Splash';
import LoginContainer from './hoc/LoginContainer/LoginContainer';

class App extends Component {
  render () {
    return (
      <div className={styles.App}>
        <Layout>
          <Route path="/" exact component={Splash} />
          <Route path="/signin" component={LoginContainer} />
        </Layout>
      </div>
    )
  }
}

export default App;

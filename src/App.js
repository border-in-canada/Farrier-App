import React, { Component } from 'react';
import Layout from './components/Layout/Layout';
import { Route } from 'react-router-dom';
import Splash from './components/Splash/Splash';
import Signup from './containers/Signup/Signup';

class App extends Component {
  render () {
    return (
      <div>
        <Layout>
          <Route path="/" exact component={Splash} />
          <Route path="/signup" component={Signup} />
        </Layout>
      </div>
    )
  }
}

export default App;

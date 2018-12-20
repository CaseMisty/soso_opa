import React, { Component } from 'react';
import './App.css';
import {
  Route,
  Switch
} from 'react-router-dom';
import LoginController from '../src/page/loginController';
import BackgroundController from '../src/page/backgroundController';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route path='/' exact component={LoginController} />
          <Route path='/:rootPath' component={BackgroundController} />
        </Switch>
      </div>
    );
  }
}

export default App;

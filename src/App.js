import React, { Component } from 'react';
import './App.css';
import { Button } from 'antd';
import {
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import LoginController from '../src/page/loginController.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        {/* <header className="App-header">
        <Button type="primary">Button</Button>
        </header> */}
        <Route path='/' component={LoginController} />;
      </div>
    );
  }
}

export default App;

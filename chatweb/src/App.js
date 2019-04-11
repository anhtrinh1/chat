import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './components/login/login';
import Chat from './components/chat/chat';
import Home from './components/Home';
class App extends Component {
  render() {
    const user = localStorage.getItem('user');
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route path='/login' component={Login} />
            <Route path='/chat' component={Chat} />
            <Route path='/' component={Home} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;

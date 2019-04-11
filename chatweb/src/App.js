import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './components/login/login';
import Chat from './components/chat/chat';

class App extends Component {
   


  render() {

    // if()

    return (        
        <BrowserRouter>
        <Switch>
        <Route  path='/login' component={Login}/> 
        </Switch>
        <Switch>
        <Route  path='/chat' component={Chat}/> 
        </Switch>
        </BrowserRouter>      
    );
  }
}

export default App;

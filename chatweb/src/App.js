import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './components/login/login';


class App extends Component {
   


  render() {

    // if()

    return (
   
        <BrowserRouter>
        <Switch>
        <Route  exact  path='/login' component={Login}/> 
        </Switch>
        </BrowserRouter>
      
    );
  }
}

export default App;

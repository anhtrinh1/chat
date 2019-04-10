import React, { Component } from 'react';
import './login.css';
import axios from 'axios';
import {reactLocalStorage} from 'reactjs-localstorage';

class login extends Component {

  state = {
    userName: '',
    password: '',
    userId: ''
  }

handleChangeUserName = event => {
  this.setState({ 
    userName: event.target.value,
  });
}

handleChangePassword = event => {
  this.setState({ 
    password: event.target.value
  });
}

handleSubmit = event => {
  event.preventDefault();

  const user = {
    userName: this.state.userName,
    password: this.state.password,
    userId: this.state.userId,
    userIdReceive: this.state.userIdReceive
  };

const params = new URLSearchParams();
params.append('password',user.password);
params.append('userName', user.userName); 
 

  axios.post('http://localhost:4000/users/login',  params,{
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
  }).then(res => {
    let data = res.data; 
    if(data.status){
      reactLocalStorage.set('userId', data.userId);      
      window.location="/chat";
    }
  })
}
  render() {
    return (
      <div className="login">
        <header className="login-header">
          <p>
            login dddd
          </p>           
        </header>
        <div>
          <form onSubmit={this.handleSubmit}>
            <label>
              Person ID:
              <input type="text" name="userName" onChange={this.handleChangeUserName} />
            </label>
            <label>
              Person ID:
              <input type="text" name="password" onChange={this.handleChangePassword} />
            </label>
            <button type="submit">login</button>
          </form>
        </div>
        {/* <BrowserRouter>
       <Switch>
       <Route  exact  path='/chat' component={Chat}/> 
       </Switch>
       </BrowserRouter> */}
      </div>
       
    );
  }
}

export default login;

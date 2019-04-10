import React, { Component } from "react";
import './chat.css';
import socketIOClient from "socket.io-client";
import {reactLocalStorage} from 'reactjs-localstorage';

class Chat extends Component {
    constructor() {
      super();
      this.state = {
        endpoint: "http://localhost:4000",
        color: 'white',
        userId : reactLocalStorage.get('userId', true),
        userIdReceive: "TrinhNA2",
        message : '',
      };
    }
  
    // sending sockets
    send = () => {
      const socket = socketIOClient(this.state.endpoint);
      socket.emit('sendMessage', this.state);
    }
  
    ///
    
    // adding the function
    setMessage = (message) => {
      this.setState({ message });
    } 
    handleChangeMessage = event => {
        this.setMessage(event.target.value);
    }
         
    componentDidMount = () => {
        const socket = socketIOClient(this.state.endpoint);
        // setInterval(this.send(), 1000)
        socket.on('sendMessage', (data) => {
            var cl ="";
            if(data.idSent === this.state.userId){
              cl = '<span className="message right">'+ data.message + '</span>';
            } else {
              cl = '<span className="message left">'+ data.message + '</span>';
            }          
           document.getElementById("content").append(cl);
        });
    }
    render() {
      // testing for socket connections
  
      const socket = socketIOClient(this.state.endpoint);
  
      return (
        <div style={{ textAlign: "center" }}>
          <div>
          <div id="content">
              
          </div>
          <div>
            <label>
              Person ID:
              <input type="text" name="message" onChange={this.handleChangeMessage} />
            </label>
            <button onClick={() => this.send() }>send</button>  
          </div>
        </div>
        </div>
      )
    }
  }
  export default Chat;
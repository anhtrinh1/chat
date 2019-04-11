import React, { Component } from "react";
import './chat.css';
import image1 from './image/image1.png';
import download from './image/download.png';
import axios from 'axios';

import socketIOClient from "socket.io-client";
import $ from 'jquery';
import ChatView from './chatview';

class Chat extends Component {
  constructor() {
    super();
    this.state = {
      endpoint: "http://localhost:4000",
      userName: localStorage.getItem('userName', true),
      userReceive: '',
      message: '',
      userList: null,
      load: false
    };
  }

  // sending sockets
  send = () => {
    var cl = '<div class="message right">' + this.state.message + '</div>';
    $("#content").append(cl);
    $("#textMs").val('');
    const socket = socketIOClient(this.state.endpoint);
    socket.emit('sendMessage', this.state);
  }

  // adding the function
  seUserReceive = userReceive => {
    this.setState({ userReceive });
  }

  onClickUser = user => {
    this.seUserReceive(user);
  }

  setMessage = message => {
    this.setState({ message });
  }

  handleChangeMessage = event => {
    this.setMessage(event.target.value);
  }

  componentDidMount = () => {
    const socket = socketIOClient(this.state.endpoint);
    socket.on('sendMessage', (data) => {
      console.log("data truyen len" + JSON.stringify(data))
      var cl = "";
      if (data.userReceive === this.state.userName) {
        cl = '<div class="message left">' + data.message + '</div>';
        console.log(this.state.userName);
      }
      $("#content").append(cl);
    });
  }

  componentWillMount = () => {
    this.setListUser();
  }

  setListUser = () => {
    axios.get('http://localhost:4000/users/getList').then(response => {
      this.setState({ load: true, userList: response.data })
    })
  }

  render() {
    if (!this.state.load) {
      return 'Loading...'
    }
    const { userList } = this.state;
    return (
      <div className="container-fluid">
        <div id="left" >
          <div id="left-top">
            <div id="images">
              <a href="#" target="_blank">
                <img src={image1} />
              </a>
            </div>
            <div id="ih6">
              <h6>History Chat</h6>
            </div>
            <div id="newmesenger">
              <a href="#" target="_blank">
                <img src={download} />
              </a>
            </div>
          </div>
          <div className="left-bottom" id="listUser">
            {
              userList.map((user, index) => {
                return (
                  <ChatView key={index} user={user} handleUser={this.onClickUser} />
                )
              })
            }</div>
        </div>
        <div id="center">
          <div className="show_Messenger" id="content">
          </div>
          <div className="text_submit">
            <div className="text_Messenger">
              <input type="text" id="textMs" name="input" onChange={this.handleChangeMessage} />
            </div>
            <div className="submit">
              <input type="button" value="Submit" onClick={() => this.send()} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Chat;


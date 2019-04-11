import React, { Component } from "react"; 
import './chat.css';
import image1 from './image/image1.png';
import image2 from './image/image2.jpg';
import download from './image/download.png';
import axios from 'axios';

import socketIOClient from "socket.io-client";
import {reactLocalStorage} from 'reactjs-localstorage';
import $ from 'jquery';
var a = image2;
class Chat extends Component {
    constructor() {
      super();
      this.state = {
        endpoint: "http://localhost:4000",
        userName : reactLocalStorage.get('userName',true),
        userReceive: '',
        message : '',
        userList: null,
        load : false
      };
    }
  
    // sending sockets
    send = () => {
      var cl = '<span class="message right">'+ this.state.message + '</span>';
      $("#content").append(cl);
      const socket = socketIOClient(this.state.endpoint);
      socket.emit('sendMessage', this.state);
    }
  
        
    // adding the function
    seUserReceive = (userReceive) => {
      this.setState({ userReceive });
    }
    onClickUser = (user) => {
      alert(user);
      this.seUserReceive(user);
    }
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
            console.log("data truyen len" + JSON.stringify(data))
            var cl ="";
           
            if(data.userReceive === this.state.userName){
              cl = '<span class="message right">'+ data.message + '</span>';
              console.log(this.state.userName);
            }         
            $("#content").append(cl);
        });
        this.setListUser();
    }

    setListUser = ()=>{     
      axios.get('http://localhost:4000/users/getList').then(response => {
        //this.setUserList(response.data);
        console.log(response.data);
        var user="";
        if(response.data){
          $.each(response.data, function(i, item) {

          
             
            if(item.userName !== reactLocalStorage.get('userName',true)){
 
              user +=  '<div className="left-bottom" id="listUser"><div class="user" onclick="onClickUser(\''+ item.userName +'\')">'+
              '<div class="avartar">'+
                   '<img src='+ image2.value+'/>'+
              '</div>'+
              '<div class ="user_send">'+
                '<h5 class="font-weight-bold">'+ item.userName +'</h5>'+
              '</div>'+
            '</div></div>';
            }
            
            
          });
          this.setState({load: true,userList:user})
        }
      }) 
    }

    render() {  
      
      if(!this.state.load) {
        return 'Loading...'
       } 
      return (
        
        <div className="container-fluid">
        <div id="left" >
          <div id ="left-top">
            <div id = "images">
              <a href="#" target="_blank">
                <img src={image1}/>
              </a>
            </div>
            <div id="ih6">
              <h6>History Chat</h6>    
            </div>
            <div id="newmesenger">
              <a href="#" target="_blank">
                <img src={download}/>
              </a>
            </div>              
          </div>
        {/* {this.state.userList} */}
        {{__html: this.state.userList}}
        </div>
        <div id="center">
          <div className="show_Messenger" id="content">
           
          </div>
            <div className="text_submit">
              <div className="text_Messenger">
                <input type="text" name="input" onChange={this.handleChangeMessage}/>
              </div>
              <div className="submit">
                <input type="button" value="Submit" onClick={() => this.send() }/>
              </div>
            </div>    
        </div>
        
      </div>
        
      )
    }
  }

  class ChatContent extends React.Component {
    
    render() {
     
       return (
        <img src={image2}/>
       );
    }
 }

  export default Chat;

  
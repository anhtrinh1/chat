import React, { Component } from "react";
import image2 from './image/image2.jpg';

class ChatView extends Component {
	handleUser = e => {
		e.preventDefault();
		const { user } = this.props;
		this.props.handleUser(user.userName);
	}

	render() {
		const { user } = this.props;
		return (
			<div className="user" onClick={this.handleUser}>
				<div className="avartar">
					<img src={image2} />
				</div>
				<div className="user_send">
					<h5 className="font-weight-bold">{user.userName}</h5>
				</div>
			</div> 
		)
	}
}

export default ChatView;
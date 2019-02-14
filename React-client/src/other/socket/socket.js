import React, { Component } from "react";
import { Button } from "react-bootstrap";
import socketService from "./socket.service";

class SocketSample extends Component {
  state = {
    serverMessage: "",
    message: ""
  };

  handleChange = event => {
    this.setState({ message: event.target.value });
  };

  sendMessage = () => {
    socketService.initSocket();
    socketService.send(this.state.message);
    socketService.onMessage().subscribe(data => {
      this.setState({ serverMessage: data });
      socketService.disconnectSocket();
    });
  };

  render() {
    return (
      <div>
        <label for="message">Message: </label>
        <input id="message" type="text" onChange={this.handleChange} />
        &nbsp;
        <Button onClick={this.sendMessage} className="btn btn-primary">
          Send Message
        </Button>
        <br />
        Message received from server: {this.state.serverMessage}
      </div>
    );
  }
}

export default SocketSample;

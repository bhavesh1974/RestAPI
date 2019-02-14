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
    socketService.onMessage("eventFromServer").subscribe(data => {
      this.setState({ serverMessage: data });
      socketService.disconnectSocket();
    });
    socketService.send("eventFromClient", this.state.message);
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

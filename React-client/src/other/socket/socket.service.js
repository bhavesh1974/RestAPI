import * as io from "socket.io-client";
import { Observable } from "rxjs";

const SERVER_URL = "ws://localhost:8080";

const SocketIOService = {
  socket: undefined,
  initSocket() {
    this.socket = io.connect(SERVER_URL);
  },
  send(event, message) {
    this.socket.emit(event, message);
  },
  onMessage(event) {
    return new Observable(observer => {
      this.socket.on(event, data => observer.next(data));
    });
  },
  disconnectSocket() {
    this.socket.close();
  }
};

export default SocketIOService;

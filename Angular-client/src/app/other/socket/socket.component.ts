import { Component, OnInit } from "@angular/core";
import { SocketIOService } from "./socketio.service";

@Component({
  selector: "app-socket",
  templateUrl: "./socket.component.html",
  styleUrls: ["./socket.component.css"]
})
export class SocketComponent implements OnInit {
  message: string;
  serverMessage: string;
  constructor(private socketService: SocketIOService) {}

  ngOnInit() {}

  sendMessge() {
    this.socketService.initSocket();
    this.socketService.send(this.message);
    this.socketService.onMessage().subscribe(data => {
      this.serverMessage = data;
      this.socketService.disconnectSocket();
    });
  }
}

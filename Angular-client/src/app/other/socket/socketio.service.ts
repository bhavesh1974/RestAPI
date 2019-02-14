import { Injectable } from "@angular/core";
import * as io from "socket.io-client";
import { Observable } from "rxjs";

const SERVER_URL = "ws://localhost:8080";

@Injectable()
export class SocketIOService {
  private socket;

  public initSocket(): void {
    this.socket = io.connect(SERVER_URL);
  }

  public send(event: string, message: string): void {
    this.socket.emit(event, message);
  }

  public onMessage(event: string): Observable<string> {
    return new Observable<string>(observer => {
      this.socket.on(event, (data: string) => observer.next(data));
    });
  }

  public onEvent(event: Event): Observable<any> {
    return new Observable<Event>(observer => {
      this.socket.on(event, () => observer.next());
    });
  }

  public disconnectSocket(): void {
    this.socket.close();
  }
}

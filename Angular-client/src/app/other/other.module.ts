import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SocketIOService } from "./socket/socketio.service";
import { OtherRoutingModule } from "./other-routing.module";
import { SocketComponent } from "./socket/socket.component";
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [SocketComponent],
  imports: [CommonModule, FormsModule, OtherRoutingModule],
  providers: [SocketIOService]
})
export class OtherModule {}

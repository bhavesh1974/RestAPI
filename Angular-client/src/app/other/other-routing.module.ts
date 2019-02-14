import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from "../shared/services/auth-guard.service";
import { SocketComponent } from "./socket/socket.component";

const otherRoutes: Routes = [
  {
    path: "socket",
    component: SocketComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(otherRoutes)],
  exports: [RouterModule]
})
export class OtherRoutingModule {}

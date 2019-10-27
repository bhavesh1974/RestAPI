import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./shared/home/home.component";
import { NotfoundComponent } from "./notfound/notfound.component";
import { SocketComponent } from "./other/socket/socket.component";
import { SalesListComponent } from "./sales/list/sales-list.component";
import { CustomerListComponent } from "./customer/list/customer-list.component";
import { DashboardComponent } from "./dashboard/dashboard/dashboard.component";

const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path: "sales",
    component: SalesListComponent
  },
  {
    path: "customers",
    component: CustomerListComponent
  },
  {
    path: "dashboard",
    component: DashboardComponent
  },
  {
    path: "404",
    component: NotfoundComponent
  },
  {
    path: "**",
    redirectTo: "/404"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

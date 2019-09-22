import { Routes, RouterModule } from "@angular/router";
import { SalesListComponent } from "./list/sales-list.component";
import { AuthGuard } from "../shared/services/auth-guard.service";
import { NgModule } from "@angular/core";
import { SalesFormComponent } from "./form/form.component";

const salesRoutes: Routes = [
  {
    path: "sales",
    component: SalesListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "sales/form",
    component: SalesFormComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(salesRoutes)],
  exports: [RouterModule]
})
export class SalesRoutingModule {}

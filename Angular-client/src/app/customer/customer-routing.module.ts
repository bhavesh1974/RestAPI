import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../shared/services/auth-guard.service";
import { CustomerListComponent } from "./list/customer-list.component";
import { CustomerFormComponent } from "./form/customer-form.component";

const customerRoutes: Routes = [
  {
    path: "customers",
    component: CustomerListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "customers/form",
    component: CustomerFormComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(customerRoutes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule {}

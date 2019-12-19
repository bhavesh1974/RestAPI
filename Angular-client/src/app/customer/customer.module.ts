import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CustomerListComponent } from "./list/customer-list.component";
import { CustomerFormComponent } from "./form/customer-form.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CoreModule } from "../shared/shared.module";
import { CustomerService } from "./customer.service";
import { CustomerRoutingModule } from "./customer-routing.module";

@NgModule({
  declarations: [CustomerListComponent, CustomerFormComponent],
  imports: [
    CommonModule,
    FormsModule,
    CustomerRoutingModule,
    CoreModule,
    ReactiveFormsModule
  ],
  providers: [CustomerService]
})
export class CustomerModule {}

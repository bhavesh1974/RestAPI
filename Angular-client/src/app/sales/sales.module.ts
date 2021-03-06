import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SalesListComponent } from "./list/sales-list.component";
import { FormsModule } from "@angular/forms";
import { CoreModule } from "../shared/shared.module";
import { SalesService } from "./sales.service";
import { SalesRoutingModule } from "./sales-routing.module";
import { SalesFormComponent } from "./form/form.component";

@NgModule({
  declarations: [SalesListComponent, SalesFormComponent],
  imports: [CommonModule, FormsModule, SalesRoutingModule, CoreModule],
  providers: [SalesService]
})
export class SalesModule {}

import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormControlErrorComponent } from "./component/formcontrolerror/formcontrolerror.component";
import { NumberOnly } from "./component/numberonly/numberonly.directive";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [FormControlErrorComponent, NumberOnly],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [FormControlErrorComponent, NumberOnly]
})
export class CoreModule {}

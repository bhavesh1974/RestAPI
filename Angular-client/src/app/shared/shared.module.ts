import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormControlErrorComponent } from "./component/formcontrolerror/formcontrolerror.component";
import { NumberOnly } from "./component/numberonly/numberonly.directive";

@NgModule({
  declarations: [FormControlErrorComponent, NumberOnly],
  imports: [CommonModule],
  exports: [FormControlErrorComponent, NumberOnly]
})
export class CoreModule {}

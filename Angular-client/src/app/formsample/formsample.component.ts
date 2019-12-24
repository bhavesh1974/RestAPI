import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, FormBuilder } from "@angular/forms";
import { FormTextbox } from "../shared/component/formcontroltextbox";
import { FormControlBase } from "../shared/component/formcontrolbase";
import { FormService } from "../shared/services/form.service";

@Component({
  selector: "app-formsample",
  templateUrl: "./formsample.component.html",
  styleUrls: ["./formsample.component.css"]
})
export class FormsampleComponent implements OnInit {
  formGroup: FormGroup;
  code: FormControlBase;
  name: FormControlBase;
  gender: FormControlBase;
  controls: FormControlBase[] = [];

  constructor(private formService: FormService) {}

  ngOnInit() {
    this.initFormControls();
  }

  initFormControls() {
    this.code = this.formService.initControl("code", "CUSt001");
    this.name = this.formService.initControl("name", "Bhavesh");
    this.gender = this.formService.initControl("gender", "Male");
    this.formGroup = this.formService.initFormGroup(this);

    this.controls.push(this.formService.initControl("code", "CUST001"));
    this.controls.push(this.formService.initControl("name", "Bhavesh"));
    this.controls.push(this.formService.initControl("gender", "Male"));
    this.formGroup = this.formService.initFormGroupFromArray(this.controls);
  }

  onSubmit() {
    console.log(this.formGroup.value);
  }
}

import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { FormTextbox } from "../shared/component/formcontroltextbox";
import { FormControlBase } from "../shared/component/formcontrolbase";

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

  constructor() {}

  ngOnInit() {
    this.initFormControls();
    this.initFormGroup();
  }

  initFormControls() {
    this.code = new FormTextbox({
      controlName: "code",
      value: "CUST001"
    });

    this.name = new FormTextbox({
      controlName: "name",
      value: "Bhavesh"
    });

    this.gender = new FormTextbox({
      controlName: "gender",
      value: "Male"
    });
  }

  initFormGroup() {
    let group: any = {};
    for (var prop in this) {
      if (prop == "") continue;
      if (this.hasOwnProperty(prop)) {
        group[prop] = new FormControl(this[prop]["value"]);
      }
    }

    this.formGroup = new FormGroup(group);
  }

  onSubmit() {
    console.log(this.formGroup.value);
  }
}

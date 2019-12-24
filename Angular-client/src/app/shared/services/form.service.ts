import { Injectable } from "@angular/core";
import { FormControlBase } from "../component/formcontrolbase";
import { FormControl, FormGroup } from "@angular/forms";
import { FormTextbox } from "../component/formcontroltextbox";

@Injectable()
export class FormService {
  initControl(controlName?);
  initControl(controlName?, value?);
  initControl(controlName?, value?, controlType?) {
    return new FormTextbox({
      controlName: controlName,
      value: value,
      controlType: controlType
    });
  }

  initFormGroup(obj) {
    let group: any = {};
    for (var prop in obj) {
      if (prop == "") continue;
      if (obj.hasOwnProperty(prop)) {
        if (obj[prop] instanceof FormControlBase) {
          group[prop] = new FormControl(obj[prop]["value"]);
        }
      }
    }
    return new FormGroup(group);
  }

  initFormGroupFromArray(controls) {
    let group: any = {};
    for (var control in controls) {
      group[controls[control].controlName] = new FormControl(
        controls[control].value
      );
    }
    return new FormGroup(group);
  }
}

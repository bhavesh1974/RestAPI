import { forwardRef } from "@angular/core";
import { ControlValueAccessor } from "@angular/forms";

const mockFunction = () => {};

//Extends this class to get ngModel functionality in other class...specially individual controls like Input Text, Radio Button, Check Box etc.
export class BaseInputControl implements ControlValueAccessor {
  innerValue: any;

  get value() {
    return this.innerValue;
  }
  set value(val: any) {
    if (val !== this.innerValue) this.innerValue = val;

    this.onChangeCallback(val);
  }

  onTouchedCallback: () => void = mockFunction;
  onChangeCallback: (_: any) => void = mockFunction;

  writeValue(value: any) {
    if (value !== this.innerValue) {
      this.innerValue = value;
    }
  }

  registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }
}

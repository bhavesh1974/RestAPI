import { FormGroup, FormControl } from "@angular/forms";

export class FormControlBase {
  controlName: string;
  controlType: string;
  value: string;
  label: string;
  required: boolean;

  constructor(
    options: {
      controlName?: string;
      controlType?: string;
      value?: string;
      label?: string;
      required?: boolean;
    } = {}
  ) {
    this.controlName = options.controlName || "";
    this.controlType = options.controlType || "";
    this.label = options.label || "";
    this.required = !!options.required;
    this.value = options.value || "";
  }
}

import { FormControlBase } from "./formcontrolbase";

export class FormDropdown extends FormControlBase {
  controlType = "dropdown";
  options: { key: string; value: string }[] = [];

  constructor(options: {} = {}) {
    super(options);
    this.options = options["options"] || [];
  }
}

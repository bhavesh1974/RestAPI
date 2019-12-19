import { FormControlBase } from "./formcontrolbase";

export class FormTextbox extends FormControlBase {
  controlType = "textbox";
  type: string;

  constructor(options: {} = {}) {
    super(options);
    this.type = options["type"] || "";
  }
}

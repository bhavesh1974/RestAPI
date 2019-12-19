import { Component, OnInit, Input } from "@angular/core";
import { BaseInputControl } from "../baseinputcontrol";
import { FormControlBase } from "../formcontrolbase";
import { FormGroup } from "@angular/forms";

@Component({
  selector: "app-textbox",
  templateUrl: "./textbox.component.html",
  styleUrls: ["./textbox.component.css"]
})
export class TextboxComponent extends BaseInputControl implements OnInit {
  @Input()
  control: FormControlBase;
  @Input()
  group: FormGroup;

  constructor() {
    super();
  }

  ngOnInit() {}
}

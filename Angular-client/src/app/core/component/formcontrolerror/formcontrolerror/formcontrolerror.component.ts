import { Component, OnInit, Input } from "@angular/core";
import { AbstractControl } from "@angular/forms";

@Component({
  selector: "form-control-error",
  templateUrl: "./formcontrolerror.component.html",
  styleUrls: ["./formcontrolerror.component.css"]
})
export class FormControlErrorComponent implements OnInit {
  @Input() control: AbstractControl;
  @Input() label: string;
  @Input() lengthMsg: string;

  constructor() {}

  ngOnInit() {
    //console.log(this.control);
  }
}

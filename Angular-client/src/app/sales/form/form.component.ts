import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";
import { NgForm } from "@angular/forms";

@Component({
  selector: "sales-form",
  templateUrl: "./form.component.html",
  styleUrls: ["./form.component.css"]
})
export class SalesFormComponent implements OnInit {
  submitError: string = "";
  @Input()
  salesData: any;
  @Output() closeFormEvent: EventEmitter<String> = new EventEmitter<String>();
  @Output() submitFormEvent: EventEmitter<any> = new EventEmitter<any>();

  constructor() {}

  ngOnInit() {}

  closeForm() {
    this.closeFormEvent.emit();
  }

  onSubmit(form: NgForm) {
    this.submitFormEvent.emit(this.salesData);
  }
}

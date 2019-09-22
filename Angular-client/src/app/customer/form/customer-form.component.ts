import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { NgForm } from "@angular/forms";

@Component({
  selector: "customer-form",
  templateUrl: "./customer-form.component.html",
  styleUrls: ["./customer-form.component.css"]
})
export class CustomerFormComponent implements OnInit {
  submitError: string = "";
  @Input()
  customerData: any;
  @Output()
  closeFormEvent: EventEmitter<String> = new EventEmitter<String>();
  @Output()
  submitFormEvent: EventEmitter<String> = new EventEmitter<String>();

  constructor() {}

  ngOnInit() {}

  closeForm() {
    this.closeFormEvent.emit();
  }

  onSubmit(form: NgForm) {
    this.submitFormEvent.emit(this.customerData);
  }
}

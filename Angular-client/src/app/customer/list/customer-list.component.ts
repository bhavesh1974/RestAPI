import { Component, OnInit, TemplateRef } from "@angular/core";
import { CustomerService } from "../customer.service";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";

@Component({
  selector: "app-customer-list",
  templateUrl: "./customer-list.component.html",
  styleUrls: ["./customer-list.component.css"]
})
export class CustomerListComponent implements OnInit {
  customers: any;
  filterCustomers: any;
  customerData: any;
  modalRef: any;

  constructor(
    private customerService: CustomerService,
    private modalService: BsModalService
  ) {}

  ngOnInit() {
    this.loadCustomers();
  }

  loadCustomers() {
    this.customerService.getAll().subscribe(
      data => {
        this.customers = data;
        this.filterCustomers = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  filterList(event) {
    this.filterCustomers = this.customers.filter(
      item =>
        item.customerName
          .toLowerCase()
          .indexOf(event.target.value.toLowerCase()) == 0
    );
  }

  closeForm() {
    this.modalRef.hide();
  }

  editForm(template: TemplateRef<any>, record) {
    this.customerData = record;
    this.modalRef = this.modalService.show(template);
  }

  addForm(template: TemplateRef<any>) {
    this.customerData = {
      id: "",
      customerCode: "",
      customerName: "",
      address: "",
      city: "",
      state: "",
      phone: ""
    };
    this.modalRef = this.modalService.show(template);
  }

  delete(record) {
    if (confirm("Are you sure you want to delete?") == false) {
      return;
    } else {
      this.customerService.delete(record.id).subscribe(
        (data: any) => {
          for (let i = 0; i < this.customers.length; i++) {
            if (this.customers[i].id === record.id) {
              this.customers.splice(i, 1);
              break;
            }
          }
          alert(data.message);
        },
        error => {}
      );
    }
  }

  submitForm(formData: any) {
    this.customerService.save(formData).subscribe(
      (data: any) => {
        this.loadCustomers();
        alert(data.message);
      },
      error => {
        console.log(error);
      }
    );
    this.modalRef.hide();
  }
}

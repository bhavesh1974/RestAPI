import { Component, OnInit, TemplateRef } from "@angular/core";
import { SalesService } from "../sales.service";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { NgForm } from "@angular/forms";
import { SalesFormComponent } from "../form/form.component";

@Component({
  selector: "app-sales-list",
  templateUrl: "./sales-list.component.html",
  styleUrls: ["./sales-list.component.css"]
})
export class SalesListComponent implements OnInit {
  sales: any;
  filterSales: any;
  modalRef: BsModalRef;
  salesData: any;

  constructor(
    private salesService: SalesService,
    private modalService: BsModalService
  ) {}

  ngOnInit() {
    this.salesService.getAll().subscribe(
      data => {
        this.sales = data;
        this.filterSales = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  calculateNetAmount(amount, tax) {
    return amount + (amount * tax) / 100;
  }

  filterList(event) {
    this.filterSales = this.sales.filter(
      item =>
        item.customer.toLowerCase().indexOf(event.target.value.toLowerCase()) ==
        0
    );
  }

  delete(salesRecord) {
    if (confirm("Are you sure you want to delete?") == false) {
      return;
    }
    this.salesService.delete(salesRecord.id).subscribe(
      (data: any) => {
        for (let i = 0; i < this.sales.length; i++) {
          if (this.sales[i].id === salesRecord.id) {
            this.sales.splice(i, 1);
            break;
          }
        }
        alert(data.message);
      },
      error => {
        console.log(error);
      }
    );
  }

  editForm(template: TemplateRef<any>, salesRecord) {
    this.salesData = salesRecord;
    this.modalRef = this.modalService.show(template);
  }

  addForm(template: TemplateRef<any>) {
    this.salesData = {
      id: "",
      salesDate: "",
      customer: "",
      item: "",
      qty: 0,
      rate: 0,
      taxPercent: 0
    };
    this.modalRef = this.modalService.show(template);
  }

  closeForm() {
    this.modalRef.hide();
  }

  submitForm(formData: any) {
    this.salesService.save(formData).subscribe(
      (data: any) => {
        alert(data.message);
      },
      error => {
        console.log(error);
      }
    );
    this.modalRef.hide();
  }
}

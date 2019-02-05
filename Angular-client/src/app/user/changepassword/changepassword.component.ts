import { Component, OnInit } from "@angular/core";
import { UserService } from "../user.service";
import { Router } from "@angular/router";
import { NgForm } from "@angular/forms";
import { FlashService } from "src/app/core/services/flash.service";

@Component({
  selector: "app-changepassword",
  templateUrl: "./changepassword.component.html",
  styleUrls: ["./changepassword.component.css"]
})
export class ChangepasswordComponent implements OnInit {
  default = {
    oldpassword: "",
    password: "",
    confirmpassword: ""
  };
  submitError: string = "";
  submitSuccess: string = "";

  constructor(
    private userService: UserService,
    private router: Router,
    private flashService: FlashService
  ) {}

  ngOnInit() {}

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.userService.changePassword(form.value).subscribe(
        (data: any) => {
          this.submitError = "";
          this.flashService.successMessage(data["message"]);
          //this.submitSuccess = data["message"];
        },
        error => {
          if (error.error.hasOwnProperty("message")) {
            this.submitError = error.error.message;
            this.submitSuccess = "";
          } else {
            this.submitError = "Unknown Error. Please contact administrator.";
            this.submitSuccess = "";
          }
        }
      );
    }
  }
}

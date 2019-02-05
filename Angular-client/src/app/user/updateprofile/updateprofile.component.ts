import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/auth/services/auth.service";
import { Router } from "@angular/router";
import { NgForm } from "@angular/forms";
import { UserService } from "../user.service";

@Component({
  selector: "app-updateprofile",
  templateUrl: "./updateprofile.component.html",
  styleUrls: ["./updateprofile.component.css"]
})
export class UpdateprofileComponent implements OnInit {
  default = {
    firstName: "",
    lastName: "",
    phone: ""
  };
  submitError: string = "";
  submitSuccess: string = "";

  constructor(
    private userService: UserService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.userService.getProfile().subscribe(
      (data: any) => {
        this.default.firstName = data.data.firstName;
        this.default.lastName = data.data.lastName;
        this.default.phone = data.data.phone;
      },
      error => {
        console.log(error);
      }
    );
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.userService.updateProfile(form.value).subscribe(
        (data: any) => {
          this.submitError = "";
          this.submitSuccess = data["message"];
          this.authService.userName = form.value.firstName;
        },
        error => {
          if (error.error.hasOwnProperty("message")) {
            this.submitError = error.error.message;
            this.submitSuccess = "";
          } else {
            console.log(error);
            this.submitError = "Unknown Error. Please contact administrator.";
            this.submitSuccess = "";
          }
        }
      );
    }
  }
}

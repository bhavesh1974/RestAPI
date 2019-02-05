import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { UserService } from "../user.service";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"]
})
export class SignupComponent implements OnInit {
  default = {
    email: "",
    password: "",
    confirmpassword: "",
    firstName: "",
    lastName: "",
    phone: ""
  };
  signupStatus: string = "";
  signupError: string = "";
  signupSuccess: string = "";

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {}

  onSignup(form: NgForm) {
    if (form.valid) {
      this.userService.signupUser(form.value).subscribe(
        (data: any) => {
          this.signupStatus = "SUCCESS";
          this.signupSuccess = data["message"];
          // this.router.navigate(["../signin"]);
        },
        error => {
          this.signupStatus = "";
          if (error.error.hasOwnProperty("message")) {
            this.signupError = error.error.message;
          } else {
            this.signupError = "Unknown Error. Please contact administrator.";
          }
        }
      );
    }
  }
}

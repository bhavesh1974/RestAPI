import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";

import { AuthService } from "../auth.service";
import { Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { ApiService } from "src/app/shared/services/api.service";
import { LogService } from "src/app/shared/services/log.service";

@Component({
  selector: "app-signin",
  templateUrl: "./signin.component.html",
  styleUrls: ["./signin.component.css"]
})
export class SigninComponent implements OnInit {
  signinError: string = "";
  imageToShow: any;
  constructor(
    private authService: AuthService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private logService: LogService
  ) {}

  ngOnInit() {}

  onSignin(form: NgForm) {
    if (form.valid) {
      this.logService.logDebugMessage("Calling API to verify email/password");
      this.spinner.show();
      this.authService.signinUser(form.value).subscribe(
        (data: any) => {
          this.spinner.hide();
          this.authService.setToken(data.token);
          this.authService.setUserName(data.userName);
          this.authService.loadPicture();
          this.router.navigate(["/"]);
        },
        error => {
          this.spinner.hide();
          if (error.error.hasOwnProperty("message")) {
            this.signinError = error.error.message;
          } else {
            this.signinError = "Unknown Error. Please contact administrator.";
          }
        }
      );
    }
  }
}

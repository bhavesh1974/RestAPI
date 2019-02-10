import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { routerNgProbeToken } from "@angular/router/src/router_module";
import { AuthService } from "src/app/auth/auth.service";
import { ApiService } from "src/app/shared/services/api.service";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: "app-uploadpicture",
  templateUrl: "./uploadpicture.component.html",
  styleUrls: ["./uploadpicture.component.css"]
})
export class UploadpictureComponent implements OnInit {
  selectedFiles: File[];
  constructor(
    private apiService: ApiService,
    private router: Router,
    private authService: AuthService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {}

  onSubmit(form) {
    const formData = new FormData();
    for (const file of this.selectedFiles) {
      formData.append("files", file);
    }
    this.spinner.show();
    this.apiService.uploadFile("/user/uploadPicture", formData).subscribe(
      success => {
        this.authService.loadPicture();
        this.router.navigate(["/"]);
        this.spinner.hide();
      },
      error => {
        this.spinner.hide();
        console.log(error);
      }
    );
  }
}

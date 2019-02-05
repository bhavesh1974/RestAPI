import { Router } from "@angular/router";
import { Injectable, OnInit } from "@angular/core";
import { ApiService } from "../../core/services/api.service";

@Injectable()
export class AuthService {
  token: string;
  userName: string;
  imageToShow: any;

  constructor(private router: Router, private apiService: ApiService) {
    const tokenValue = sessionStorage.getItem("token");
    this.token = tokenValue;
    if (this.token != null) {
      this.userName = sessionStorage.getItem("userName");
      this.imageToShow = sessionStorage.getItem("imageToShow");
    }
  }

  signinUser(data: string) {
    return this.apiService.post("/auth/signin", data);
  }

  logout() {
    this.token = null;
    this.userName = null;
    this.imageToShow = null;
    sessionStorage.clear();
  }

  getToken() {
    const tokenValue = sessionStorage.getItem("token");
    return tokenValue;
  }

  setToken(token) {
    this.token = token;
    sessionStorage.setItem("token", token);
  }

  getUserName() {
    return this.userName;
  }

  setUserName(userName) {
    this.userName = userName;
    sessionStorage.setItem("userName", userName);
  }

  isAuthenticated() {
    return this.token != null;
  }

  loadPicture() {
    this.apiService.getImage("/user/getPicture").subscribe(
      data => {
        this.createImageFromBlob(data);
      },
      error => {
        console.log(error);
      }
    );
  }

  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener(
      "load",
      () => {
        this.imageToShow = reader.result;
        sessionStorage.setItem("imageToShow", this.imageToShow);
      },
      false
    );

    if (image) {
      reader.readAsDataURL(image);
    }
  }
}

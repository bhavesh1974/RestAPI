import { Injectable } from "@angular/core";
import { ApiService } from "../shared/services/api.service";

@Injectable({
  providedIn: "root"
})
export class UserService {
  constructor(private apiService: ApiService) {}

  updateProfile(data: string) {
    return this.apiService.put("/user/updateProfile", data);
  }

  getProfile() {
    return this.apiService.get("/user/profile", null);
  }

  changePassword(data: string) {
    return this.apiService.post("/user/changePassword", data);
  }

  signupUser(data: string) {
    return this.apiService.post("/user/signup", data);
  }
}

import { Injectable } from "@angular/core";
import { ApiService } from "../shared/services/api.service";

@Injectable({
  providedIn: "root"
})
export class CustomerService {
  constructor(private apiService: ApiService) {}

  getAll() {
    return this.apiService.get("/customers/", null);
  }

  save(data) {
    return this.apiService.post("/customers/", data);
  }

  delete(id) {
    return this.apiService.delete("/customers/" + id);
  }
}

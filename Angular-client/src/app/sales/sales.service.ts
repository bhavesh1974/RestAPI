import { Injectable } from "@angular/core";
import { ApiService } from "../shared/services/api.service";

@Injectable({
  providedIn: "root"
})
export class SalesService {
  constructor(private apiService: ApiService) {}

  getAll() {
    return this.apiService.get("/sales/", null);
  }

  save(data) {
    return this.apiService.post("/sales/", data);
  }

  delete(id) {
    return this.apiService.delete("/sales/" + id);
  }
}

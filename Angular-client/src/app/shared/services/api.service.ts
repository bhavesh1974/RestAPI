import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpHeaders,
  HttpRequest,
  HttpResponse
} from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable()
export class ApiService {
  urlRoot: string = "http://localhost:8080/restapi";
  constructor(private httpClient: HttpClient) {}

  post(url: string, data: any) {
    let headers = new HttpHeaders({
      "Content-Type": "application/json"
    });
    return this.httpClient.post(this.urlRoot + url, data, {
      headers: headers,
      reportProgress: true
    });
  }

  put(url: string, data: any) {
    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    return this.httpClient.put(this.urlRoot + url, data, {
      headers: headers,
      reportProgress: true
    });
  }

  delete(url: string) {
    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    return this.httpClient.delete(this.urlRoot + url, {
      headers: headers,
      reportProgress: true
    });
  }

  uploadFile(url: string, data: any) {
    return this.httpClient.post(this.urlRoot + url, data, {
      observe: "events",
      reportProgress: true
    });
  }

  get(url: string, headers: Headers) {
    return this.httpClient.get(this.urlRoot + url, {
      observe: "body",
      responseType: "json",
      reportProgress: true
    });
  }

  getImage(url: string): Observable<Blob> {
    return this.httpClient.get(this.urlRoot + url, {
      responseType: "blob"
    });
  }
}

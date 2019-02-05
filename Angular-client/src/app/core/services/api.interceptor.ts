import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from "@angular/common/http";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { AuthService } from "../../auth/services/auth.service";

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const copiedReq = req.clone({
      headers: req.headers.set(
        "Authorization",
        "Bearer " + this.authService.getToken()
      )
    });
    // const copiedReq = req.clone({
    //   params: req.params.set("auth", this.authService.getToken())
    // });
    return next.handle(copiedReq);
    // return null;
  }
}

import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./core/ui/header/header.component";
import { FooterComponent } from "./core/ui/footer/footer.component";
import { HomeComponent } from "./core/home/home.component";
import { ApiService } from "./core/services/api.service";
import { AuthModule } from "./auth/auth.module";
import { AppRoutingModule } from "./app-routing.module";
import { AppBootstrapModule } from "./appbootstrap.module";
import { NgxSpinnerModule } from "ngx-spinner";
import { ApiInterceptor } from "./core/services/api.interceptor";
import { UserModule } from "./user/user.module";
import { AuthGuard } from "./auth/services/auth-guard.service";
import { NgFlashMessagesModule } from "ng-flash-messages";
import { FlashService } from "./core/services/flash.service";
import { SidebarComponent } from "./core/ui/sidebar/sidebar.component";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    UserModule,
    AuthModule,
    AppBootstrapModule,
    NgxSpinnerModule,
    NgFlashMessagesModule.forRoot()
  ],
  providers: [
    AuthGuard,
    ApiService,
    FlashService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

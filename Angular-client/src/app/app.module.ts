import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./shared/panels/header/header.component";
import { FooterComponent } from "./shared/panels/footer/footer.component";
import { HomeComponent } from "./shared/home/home.component";
import { ApiService } from "./shared/services/api.service";
import { AuthModule } from "./auth/auth.module";
import { AppRoutingModule } from "./app-routing.module";
import { AppBootstrapModule } from "./appbootstrap.module";
import { NgxSpinnerModule } from "ngx-spinner";
import { ApiInterceptor } from "./shared/services/api.interceptor";
import { UserModule } from "./user/user.module";
import { AuthGuard } from "./shared/services/auth-guard.service";
import { NgFlashMessagesModule } from "ng-flash-messages";
import { FlashService } from "./shared/services/flash.service";
import { SidebarComponent } from "./shared/panels/sidebar/sidebar.component";
import { NotfoundComponent } from "./notfound/notfound.component";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    HomeComponent,
    NotfoundComponent
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

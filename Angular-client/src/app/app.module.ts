import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./shared/panels/header/header.component";
import { FooterComponent } from "./shared/panels/footer/footer.component";
import { HomeComponent } from "./shared/home/home.component";
import { ApiService } from "./shared/services/api.service";
import { AuthModule } from "./auth/auth.module";
import { AppBootstrapModule } from "./appbootstrap.module";
import { NgxSpinnerModule } from "ngx-spinner";
import { ApiInterceptor } from "./shared/services/api.interceptor";
import { UserModule } from "./user/user.module";
import { AuthGuard } from "./shared/services/auth-guard.service";
import { NgFlashMessagesModule } from "ng-flash-messages";
import { FlashService } from "./shared/services/flash.service";
import { SidebarComponent } from "./shared/panels/sidebar/sidebar.component";
import { NotfoundComponent } from "./notfound/notfound.component";
import { AppRoutingModule } from "./app-routing.module";
import { LogService, LogLevel } from "./shared/services/log.service";
import { OtherModule } from "./other/other.module";
import { SalesModule } from "./sales/sales.module";
import { CustomerModule } from "./customer/customer.module";
import { DashboardComponent } from "./dashboard/dashboard/dashboard.component";
import { HighchartsChartComponent } from "highcharts-angular";
import { FormsampleComponent } from "./formsample/formsample.component";
import { TextboxComponent } from "./shared/component/textbox/textbox.component";
import { FormService } from "./shared/services/form.service";

let logger = new LogService();
logger.minimumLevel = LogLevel.DEBUG;

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    HomeComponent,
    DashboardComponent,
    HighchartsChartComponent,
    NotfoundComponent,
    FormsampleComponent,
    TextboxComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    UserModule,
    AuthModule,
    OtherModule,
    SalesModule,
    CustomerModule,
    AppRoutingModule,
    AppBootstrapModule,
    NgxSpinnerModule,
    NgFlashMessagesModule.forRoot()
  ],
  providers: [
    AuthGuard,
    ApiService,
    FormService,
    FlashService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptor,
      multi: true
    },
    {
      provide: LogService,
      useValue: logger
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

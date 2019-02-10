import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { SigninComponent } from "./signin/signin.component";
import { AuthRoutingModule } from "./auth-routing.module";
import { AuthService } from "./auth.service";
import { BrowserModule } from "@angular/platform-browser";
import { CoreModule } from "../shared/shared.module";

@NgModule({
  declarations: [SigninComponent],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    AuthRoutingModule,
    CoreModule
  ],
  providers: [AuthService]
})
export class AuthModule {}

import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ChangepasswordComponent } from "./changepassword/changepassword.component";
import { UpdateprofileComponent } from "./updateprofile/updateprofile.component";
import { UploadpictureComponent } from "./uploadpicture/uploadpicture.component";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { CoreModule } from "../shared/shared.module";
import { UserService } from "./user.service";
import { UserRoutingModule } from "./user-routing.module";
import { SignupComponent } from "./signup/signup.component";
import { MustMatchDirective } from "./signup/must-match.directive";

@NgModule({
  declarations: [
    ChangepasswordComponent,
    UpdateprofileComponent,
    UploadpictureComponent,
    SignupComponent,
    MustMatchDirective
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    UserRoutingModule,
    CoreModule
  ],
  providers: [UserService],
  exports: [MustMatchDirective]
})
export class UserModule {}

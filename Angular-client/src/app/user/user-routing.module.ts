import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { UpdateprofileComponent } from "./updateprofile/updateprofile.component";
import { UploadpictureComponent } from "./uploadpicture/uploadpicture.component";
import { ChangepasswordComponent } from "./changepassword/changepassword.component";
import { AuthGuard } from "../shared/services/auth-guard.service";
import { SignupComponent } from "./signup/signup.component";

const userRoutes: Routes = [
  {
    path: "user/updateProfile",
    component: UpdateprofileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "user/uploadPicture",
    component: UploadpictureComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "user/changePassword",
    component: ChangepasswordComponent,
    canActivate: [AuthGuard]
  },
  { path: "user/signup", component: SignupComponent }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(userRoutes)],
  exports: [RouterModule]
})
export class UserRoutingModule {}

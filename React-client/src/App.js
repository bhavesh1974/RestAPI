import React, { Component } from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import SignIn from "./auth/signin/signin";
import SignUp from "./auth/signup/signup";
import Home from "./core/home/home";
import Header from "./core/header/header";
import UpdateProfile from "./user/updateprofile/updateprofile";
import UploadPicture from "./user/uploadpicture/uploadpicture";
import ChangePassword from "./user/changepassword/changepassword";

class App extends Component {
  componentDidMount() {
    document.title = "React-Client";
  }
  render() {
    return (
      <div>
        <Header />
        <div
          className="container"
          style={{ marginTop: "60px", marginLeft: "150px" }}
        >
          <Switch>
            <Route path="/signup" component={SignUp} />
            <Route path="/signin" component={SignIn} />
            <Route path="/updateprofile" component={UpdateProfile} />
            <Route path="/uploadpicture" component={UploadPicture} />
            <Route path="/changepassword" component={ChangePassword} />
            <Route path="/" exact component={Home} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;

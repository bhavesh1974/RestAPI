import React, { Component } from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import SignIn from "./auth/signin/signin";
import SignUp from "./user/signup/signup";
import Home from "./shared/home/home";
import Header from "./shared/header/header";
import UpdateProfile from "./user/updateprofile/updateprofile";
import UploadPicture from "./user/uploadpicture/uploadpicture";
import ChangePassword from "./user/changepassword/changepassword";
import SalesList from "./sales/list/list";

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
          style={{
            marginTop: "60px",
            marginLeft: "160px",
            width: "85%"
          }}
        >
          <Switch>
            <Route path="/signup" component={SignUp} />
            <Route path="/signin" component={SignIn} />
            <Route path="/updateprofile" component={UpdateProfile} />
            <Route path="/uploadpicture" component={UploadPicture} />
            <Route path="/changepassword" component={ChangePassword} />
            <Route path="/sales/list" component={SalesList} />
            <Route path="/" exact component={Home} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;

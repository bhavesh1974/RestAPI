import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { NavDropdown, MenuItem } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import SideBar from "../sidebar/sidebar";
import SubHeader from "./subheader";

class Header extends React.Component {
  handleLogout = () => {
    this.props.authenticate();
    this.props.history.push("/");
  };

  handleSelect = eventKey => {
    if (eventKey === "1") {
      this.props.history.push("/updateprofile");
    } else if (eventKey === "2") {
      this.props.history.push("/uploadpicture");
    } else if (eventKey === "3") {
      this.props.history.push("/changepassword");
    } else if (eventKey === "4") {
      this.handleLogout();
    }
  };

  render() {
    let view = null;
    if (this.props.isAuthenticated === true) {
      view = (
        <ul
          className="nav navbar-nav navbar-right"
          style={{ marginRight: "15px" }}
        >
          <NavDropdown
            eventKey="0"
            title={this.props.userName}
            id="nav-dropdown"
            onSelect={k => this.handleSelect(k)}
          >
            <MenuItem eventKey="1">Update Profile</MenuItem>
            <MenuItem eventKey="2">Upload Picture</MenuItem>
            <MenuItem eventKey="3">Change Password</MenuItem>
            <MenuItem eventKey="4">Logout</MenuItem>
          </NavDropdown>
        </ul>
      );
    } else {
      view = (
        <ul
          className="nav navbar-nav navbar-right"
          style={{ marginRight: "15px" }}
        >
          <li className="nav-item">
            <Link className="nav-link" to="/signup">
              <i className="fa fa-user" aria-hidden="true" />
              &nbsp;Sign Up
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/signin">
              <i className="fa fa-sign-in" aria-hidden="true" />
              &nbsp; Sign In
            </Link>
          </li>
        </ul>
      );
    }

    return (
      <React.Fragment>
        <div className="row">
          <nav
            className="navbar navbar-fixed-top navbar-default"
            style={{ padding: "0px" }}
          >
            <div className="container-fluid" style={{ padding: "0px" }}>
              <div
                className="navbar-header"
                style={{
                  backgroundColor: "rgb(57, 121, 218)",
                  width: "150px",
                  textAlign: "center"
                }}
              >
                <Link to="/" className="navbar-brand">
                  &nbsp;React-Client
                </Link>
              </div>
              <div className="collapse navbar-collapse">{view}</div>
            </div>
          </nav>
        </div>
        <div className="row">
          <SideBar />
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    userName: state.userName,
    token: state.token,
    imageToShow: state.imageToShow,
    isAuthenticated: state.isAuthenticated
  };
};

const mapDispatcherToProps = dispatch => {
  return {
    authenticate: () => {
      dispatch({ type: "logout" });
    }
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatcherToProps
  )(Header)
);

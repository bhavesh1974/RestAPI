import React from "react";
import FormControlError from "../../shared/forms/formcontrollerror";
import handleChange from "../../shared/forms/handlechange";
import handleSubmit from "../../shared/forms/handleSubmit";
import api from "../../shared/service/api";
import { connect } from "react-redux";

class SignIn extends React.Component {
  state = {
    form: {
      email: {
        value: "bhavesh1974@gmail.com",
        validation: { required: true, isEmail: true },
        validationMsg: "",
        label: "Email"
      },
      password: {
        value: "12345678",
        validation: { required: true },
        validationMsg: "",
        label: "Password"
      }
    },
    isValid: "",
    isSubmitted: "",
    signInError: "",
    source: null
  };

  handleChange = event => {
    this.setState({ form: handleChange(event, this.state.form) });
  };

  handleSubmit = event => {
    this.setState(
      { form: handleSubmit(event, { ...this.state.form }) },
      function() {
        if (this.state.form.isValid === true) {
          let formData = {};
          for (let formElement in this.state.form) {
            if (formElement !== "isValid" && formElement !== "isSubmitted") {
              formData[formElement] = this.state.form[formElement].value;
            }
          }
          this.callAPI("/auth/signin", formData);
        }
      }
    );
    event.preventDefault();
  };

  callAPI = (url, data) => {
    api
      .post(url, data)
      .then(response => {
        this.props.authenticate(response.data);
        this.props.history.push("/");
      })
      .catch(error => {
        if (error.response) {
          if (error.response.status === 401) {
            this.setState({
              signInError: error.response.data.message
            });
          }
        } else {
          this.setState({
            signInError: "Unknown Error"
          });
        }
      });
  };

  render() {
    return (
      <div className="row">
        <div className="col-xs-12 col-sm-10 col-md-8 col-sm-offset-1 col-md-offset-2  ">
          <FormControlError validationMsg={this.state.signInError} />
          <div>
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={this.state.form.email.value}
                  onChange={this.handleChange}
                  className="form-control"
                />
                <FormControlError
                  validationMsg={this.state.form.email.validationMsg}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={this.state.form.password.value}
                  onChange={this.handleChange}
                  className="form-control"
                />
                <FormControlError
                  validationMsg={this.state.form.password.validationMsg}
                />
              </div>
              <button className="btn btn-primary" type="submit">
                Sign In
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    userName: state.userName,
    token: state.token,
    isAuthenticated: state.isAuthenticated
  };
};

const mapDispatcherToProps = dispatch => {
  return {
    authenticate: data => {
      dispatch({ type: "signin", userName: data.userName, token: data.token });
    },
    setPicture: data => {
      dispatch({ type: "setpicture", picture: data });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatcherToProps
)(SignIn);

import React from "react";
import FormControlError from "../../shared/forms/formcontrollerror";
import handleChange from "../../shared/forms/handlechange";
import handleSubmit from "../../shared/forms/handleSubmit";
import api from "../../shared/service/api";

class SignUp extends React.Component {
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
      },
      confirmpassword: {
        value: "12345678",
        validation: { required: true },
        validationMsg: "",
        label: "Confirm Password"
      },
      firstName: {
        value: "Bhavesh",
        validation: { required: true, minLength: 2 },
        validationMsg: "",
        label: "First Name"
      },
      lastName: {
        value: "Shah",
        validation: { required: true },
        validationMsg: "",
        label: "Last Name"
      },
      phone: {
        value: "1234567890",
        validation: {},
        validationMsg: "",
        label: "Phone"
      },
      isSubmitted: false,
      isValid: false
    },
    signUpStatus: "",
    signUpError: "",
    signUpSuccess: ""
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
          this.callAPI("/auth/signup", formData);
        }
      }
    );
    event.preventDefault();
  };

  callAPI = (url, data) => {
    api
      .post(url, data)
      .then(response => {
        this.setState({
          signUpError: "",
          signUpSuccess: response.data.message
        });
      })
      .catch(error => {
        if (error.response.status === 401) {
          this.setState({
            signUpError: error.response.data.message,
            signUpSuccess: ""
          });
          //console.log(error.response.data);
        }
      });
  };

  render() {
    let view = null;
    if (this.state.signUpSuccess.length === 0) {
      view = (
        <div className="row">
          <div className="col-xs-12 col-sm-10 col-md-8 col-sm-offset-1 col-md-offset-2  ">
            <FormControlError validationMsg={this.state.signUpError} />
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
                <div className="form-group">
                  <label htmlFor="password">Confirm Password</label>
                  <input
                    type="password"
                    id="confirmpassword"
                    name="confirmpassword"
                    value={this.state.form.confirmpassword.value}
                    onChange={this.handleChange}
                    className="form-control"
                  />
                  <FormControlError
                    validationMsg={
                      this.state.form.confirmpassword.validationMsg
                    }
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="firstName">First Name</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={this.state.form.firstName.value}
                    onChange={this.handleChange}
                    className="form-control"
                  />
                  <FormControlError
                    validationMsg={this.state.form.firstName.validationMsg}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="firstName">Last Name</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={this.state.form.lastName.value}
                    onChange={this.handleChange}
                    className="form-control"
                  />
                  <FormControlError
                    validationMsg={this.state.form.lastName.validationMsg}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Phone</label>
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    value={this.state.form.phone.value}
                    onChange={this.handleChange}
                    className="form-control"
                  />
                  <FormControlError
                    validationMsg={this.state.form.phone.validationMsg}
                  />
                </div>
                <button className="btn btn-primary" type="submit">
                  Sign Up
                </button>
              </form>
            </div>
          </div>
        </div>
      );
    } else {
      view = (
        <div className="row">
          <div className="col-xs-12 col-sm-10 col-md-8 col-sm-offset-1 col-md-offset-2  ">
            {this.state.signUpSuccess}
          </div>
        </div>
      );
    }

    return <div>{view}</div>;
  }
}

export default SignUp;

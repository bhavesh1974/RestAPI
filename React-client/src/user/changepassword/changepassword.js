import React from "react";
import FormControlError from "../../shared/forms/formcontrollerror";
import handleChange from "../../shared/forms/handlechange";
import handleSubmit from "../../shared/forms/handleSubmit";
import api from "../../shared/service/api";

class ChangePassword extends React.Component {
  state = {
    form: {
      oldpassword: {
        value: "12345678",
        validation: { required: true },
        validationMsg: "",
        label: "Old Password"
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
      }
    },
    submitStatus: "",
    submitError: "",
    submitSuccess: ""
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
          this.callAPI("/user/changePassword", formData);
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
          submitError: "",
          submitSuccess: response.data.message
        });
      })
      .catch(error => {
        if (error.response.status === 401) {
          this.setState({
            submitError: error.response.data.message,
            submitSuccess: ""
          });
          //console.log(error.response.data);
        }
      });
  };

  render() {
    let view = null;
    view = (
      <div className="row">
        <div className="col-xs-12 col-sm-10 col-md-8 col-sm-offset-1 col-md-offset-2  ">
          <FormControlError validationMsg={this.state.submitError} />
          <FormControlError validationMsg={this.state.submitSuccess} />
          <div>
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label htmlFor="password">Old Password</label>
                <input
                  type="oldpassword"
                  id="oldpassword"
                  name="oldpassword"
                  value={this.state.form.oldpassword.value}
                  onChange={this.handleChange}
                  className="form-control"
                />
                <FormControlError
                  validationMsg={this.state.form.password.validationMsg}
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
                  validationMsg={this.state.form.confirmpassword.validationMsg}
                />
              </div>
              <button className="btn btn-primary" type="submit">
                Change
              </button>
            </form>
          </div>
        </div>
      </div>
    );
    return <div>{view}</div>;
  }
}

export default ChangePassword;

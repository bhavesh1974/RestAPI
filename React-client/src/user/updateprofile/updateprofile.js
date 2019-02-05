import React from "react";
import FormControlError from "../../core/forms/formcontrollerror";
import handleChange from "../../core/forms/handlechange";
import handleSubmit from "../../core/forms/handleSubmit";
import api from "../../core/service/api";
import { connect } from "react-redux";

class UpdateProfile extends React.Component {
  state = {
    form: {
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
    submitStatus: "",
    submitError: "",
    submitSuccess: ""
  };

  componentDidMount() {
    api.get("/user/profile").then(response => {
      let newForm = { ...this.state.form };
      newForm.firstName.value = response.data.data.firstName;
      newForm.lastName.value = response.data.data.lastName;
      newForm.phone.value = response.data.data.phone;
      this.setState({ form: newForm });
    });
  }

  createImageFromBlob(image) {
    let reader = new FileReader();
    reader.addEventListener(
      "load",
      () => {
        this.setState({ source: reader.result });
      },
      false
    );

    if (image) {
      reader.readAsDataURL(image);
    }
  }

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
          this.callAPI("/user/updateProfile", formData);
        }
      }
    );
    event.preventDefault();
  };

  callAPI = (url, data) => {
    api
      .put(url, data)
      .then(response => {
        this.setState({
          submitError: "",
          submitSuccess: response.data.message
        });
        this.props.authenticate(data);
      })
      .catch(error => {
        console.log(error);
        if (error.response.status === 401) {
          this.setState({
            submitError: error.response.data.message,
            submitSuccess: ""
          });
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
                Update
              </button>
            </form>
          </div>
        </div>
      </div>
    );

    return <div>{view}</div>;
  }
}

const mapDispatcherToProps = dispatch => {
  return {
    authenticate: data => {
      dispatch({ type: "update", userName: data.firstName });
    }
  };
};

export default connect(
  null,
  mapDispatcherToProps
)(UpdateProfile);

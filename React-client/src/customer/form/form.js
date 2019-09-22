import React from "react";
import api from "../../shared/service/api";
import handleChange from "../../shared/forms/handlechange";
import handleSubmit from "../../shared/forms/handleSubmit";
import FormControlError from "../../shared/forms/formcontrollerror";
import { Modal, Button } from "react-bootstrap";

class CustomerForm extends React.Component {
  state = {
    form: {
      id: {
        value: "",
        label: "Id"
      },
      customerCode: {
        value: "",
        validation: { required: true },
        validationMsg: "",
        label: "Code"
      },
      customerName: {
        value: "",
        validation: { required: true },
        validationMsg: "",
        label: "Name"
      },
      address: {
        value: "",
        validation: { required: true },
        validationMsg: "",
        label: "Address"
      },
      city: {
        value: "",
        validation: { required: true },
        validationMsg: "",
        label: "city"
      },
      state: {
        value: "",
        validation: { required: true },
        validationMsg: "",
        label: "State"
      },
      phone: {
        value: "",
        validation: { required: true },
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

  componentWillReceiveProps(oldProps, newProps) {
    if (this.props != undefined) {
      let updatedForm = { ...this.state.form };
      updatedForm.id.value = this.props.editRecord.id;
      updatedForm.customerCode.value = this.props.editRecord.customerCode;
      updatedForm.customerName.value = this.props.editRecord.customerName;
      updatedForm.address.value = this.props.editRecord.address;
      updatedForm.city.value = this.props.editRecord.city;
      updatedForm.state.value = this.props.editRecord.state;
      updatedForm.phone.value = this.props.editRecord.phone;
      this.setState({ form: updatedForm });
    }
  }

  handleChange = event => {
    this.setState({ form: handleChange(event, this.state.form) });
  };

  callAPI = (url, data) => {
    api
      .post(url, data)
      .then(response => {
        alert(response.data.message);
        this.props.onHide();
      })
      .catch(error => {
        if (error.response.status === 401) {
          this.setState({
            submitError: error.response.data.message,
            submitSuccess: ""
          });
        }
      });
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
          this.callAPI("/customers", formData);
        }
      }
    );
    event.preventDefault();
  };

  render() {
    let view = null;
    view = (
      <div className="row">
        <div className="col-xs-12">
          <FormControlError validationMsg={this.state.submitError} />
          <FormControlError validationMsg={this.state.submitSuccess} />
          <div>
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label htmlFor="customer">Code</label>
                <input
                  type="text"
                  id="customerCode"
                  name="customerCode"
                  value={this.state.form.customerCode.value}
                  onChange={this.handleChange}
                  className="form-control input-sm"
                />
                <FormControlError
                  validationMsg={this.state.form.customerCode.validationMsg}
                />
              </div>
              <div className="form-group">
                <label htmlFor="customerName">Name</label>
                <input
                  type="text"
                  id="customerName"
                  name="customerName"
                  value={this.state.form.customerName.value}
                  onChange={this.handleChange}
                  className="form-control input-sm"
                />
                <FormControlError
                  validationMsg={this.state.form.customerName.validationMsg}
                />
              </div>
              <div className="form-group">
                <label htmlFor="address">Address</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={this.state.form.address.value}
                  onChange={this.handleChange}
                  className="form-control input-sm"
                />
                <FormControlError
                  validationMsg={this.state.form.address.validationMsg}
                />
              </div>
              <div className="form-group">
                <label htmlFor="city">City</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={this.state.form.city.value}
                  onChange={this.handleChange}
                  className="form-control input-sm"
                />
                <FormControlError
                  validationMsg={this.state.form.city.validationMsg}
                />
              </div>
              <div className="form-group">
                <label htmlFor="state">State</label>
                <input
                  type="text"
                  id="state"
                  name="state"
                  value={this.state.form.state.value}
                  onChange={this.handleChange}
                  className="form-control input-sm"
                />
                <FormControlError
                  validationMsg={this.state.form.state.validationMsg}
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
                  className="form-control input-sm"
                />
                <FormControlError
                  validationMsg={this.state.form.phone.validationMsg}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    );

    return (
      <Modal
        size="lg"
        {...this.props}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Customer</Modal.Title>
        </Modal.Header>
        <Modal.Body>{view}</Modal.Body>
        <Modal.Footer>
          <Button className="btn-primary" onClick={this.handleSubmit}>
            Submit
          </Button>
          <Button onClick={this.props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default CustomerForm;

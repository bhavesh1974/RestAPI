import React from "react";
import { Modal, Button } from "react-bootstrap";
import FormControlError from "../../shared/forms/formcontrollerror";
import handleChange from "../../shared/forms/handlechange";
import handleSubmit from "../../shared/forms/handleSubmit";
import api from "../../shared/service/api";

class SalesForm extends React.Component {
  state = {
    form: {
      id: {
        value: "",
        label: "Id"
      },
      salesDate: {
        value: "",
        validation: { required: true },
        validationMsg: "",
        label: "Sales Date"
      },
      customer: {
        value: "",
        validation: { required: true },
        validationMsg: "",
        label: "Customer"
      },
      item: {
        value: "",
        validation: {},
        validationMsg: "",
        label: "Item"
      },
      qty: {
        value: "0",
        validation: {},
        validationMsg: "",
        label: "Qty."
      },
      rate: {
        value: "0",
        validation: {},
        validationMsg: "",
        label: "Rate"
      },
      taxPercent: {
        value: "0",
        validation: {},
        validationMsg: "",
        label: "Tax"
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
      updatedForm.customer.value = this.props.editRecord.customer;
      updatedForm.item.value = this.props.editRecord.item;
      updatedForm.qty.value = this.props.editRecord.qty;
      updatedForm.rate.value = this.props.editRecord.rate;
      updatedForm.taxPercent.value = this.props.editRecord.taxPercent;
      updatedForm.salesDate.value = this.props.editRecord.salesDate;
      updatedForm.id.value = this.props.editRecord.id;
      this.setState({ form: updatedForm });
    }
  }

  calculateAmount() {
    return (
      this.state.form.rate.value * this.state.form.qty.value +
      (this.state.form.rate.value *
        this.state.form.qty.value *
        this.state.form.taxPercent.value) /
        100
    );
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
          this.callAPI("/sales/save", formData);
        }
      }
    );
    event.preventDefault();
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
                <label htmlFor="salesDate">Sales Date</label>
                <input
                  type="text"
                  id="salesDate"
                  name="salesDate"
                  value={this.state.form.salesDate.value}
                  onChange={this.handleChange}
                  className="form-control input-sm"
                />
                <FormControlError
                  validationMsg={this.state.form.salesDate.validationMsg}
                />
              </div>
              <div className="form-group">
                <label htmlFor="customer">Customer</label>
                <input
                  type="text"
                  id="customer"
                  name="customer"
                  value={this.state.form.customer.value}
                  onChange={this.handleChange}
                  className="form-control input-sm"
                />
                <FormControlError
                  validationMsg={this.state.form.customer.validationMsg}
                />
              </div>
              <div className="form-group">
                <label htmlFor="item">Item</label>
                <input
                  type="text"
                  id="item"
                  name="item"
                  value={this.state.form.item.value}
                  onChange={this.handleChange}
                  className="form-control input-sm"
                />
                <FormControlError
                  validationMsg={this.state.form.item.validationMsg}
                />
              </div>
              <div className="form-inline">
                <label htmlFor="qty">Qty:&nbsp;</label>
                <input
                  type="text"
                  id="qty"
                  name="qty"
                  value={this.state.form.qty.value}
                  onChange={this.handleChange}
                  className="form-control input-sm"
                />
                <FormControlError
                  validationMsg={this.state.form.qty.validationMsg}
                />
                <label htmlFor="rate">&nbsp;Rate:&nbsp;</label>
                <input
                  type="text"
                  id="rate"
                  name="rate"
                  value={this.state.form.rate.value}
                  onChange={this.handleChange}
                  className="form-control input-sm"
                />
                <FormControlError
                  validationMsg={this.state.form.rate.validationMsg}
                />
                <label htmlFor="grossAmount">&nbsp;Gross Amt:&nbsp;</label>
                <label htmlFor="grossAmount">
                  &nbsp;{this.state.form.qty.value * this.state.form.rate.value}
                  &nbsp;
                </label>
              </div>
              &nbsp;
              <div className="form-inline">
                <label htmlFor="taxPercent">Tax:&nbsp;</label>
                <input
                  type="text"
                  id="taxPercent"
                  name="taxPercent"
                  value={this.state.form.taxPercent.value}
                  onChange={this.handleChange}
                  className="form-control input-sm"
                />
                <FormControlError
                  validationMsg={this.state.form.taxPercent.validationMsg}
                />
                <label htmlFor="grossAmount">&nbsp;Net Amt:&nbsp;</label>
                <label htmlFor="grossAmount">
                  &nbsp;{this.calculateAmount()}
                  &nbsp;
                </label>
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
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Sales</Modal.Title>
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

export default SalesForm;

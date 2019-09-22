import React from "react";
import api from "../../shared/service/api";
import { Button } from "react-bootstrap";

import Loadable from "react-loadable";
import { connect } from "react-redux";

const LoadableComponent = Loadable({
  loader: () => import("../form/form"),
  loading() {
    return <div>Loading...</div>;
  }
});

class CustomerList extends React.Component {
  state = {
    customers: [],
    filterCustomers: [],
    modalShow: false,
    editRecord: {
      id: "",
      customerCode: "",
      customerName: "",
      address: "",
      city: "",
      state: "",
      phone: ""
    }
  };

  componentDidMount() {
    if (this.props.isAuthenticated === false) {
      this.props.history.replace("/");
    }
    this.loadCustomers();
  }

  loadCustomers() {
    api
      .get("/customers")
      .then(data => {
        this.setState({ customers: data.data, filterCustomers: data.data });
      })
      .catch(error => {});
  }

  filterList = event => {
    const filter = this.state.customers.filter(
      item =>
        item.customerName
          .toLowerCase()
          .indexOf(event.target.value.toLowerCase()) === 0
    );
    this.setState({ filterCustomers: filter });
  };

  closeForm = () => {
    this.setState({ modalShow: false });
  };

  addForm = () => {
    this.setState(
      {
        editRecord: {
          id: "",
          customerCode: "",
          customerName: "",
          address: "",
          city: "",
          state: "",
          phone: ""
        }
      },
      function() {
        this.setState({ modalShow: true });
      }
    );
  };

  editForm(record) {
    this.setState({ editRecord: record }, function() {
      this.setState({ modalShow: true });
    });
  }

  delete(id) {
    if (window.confirm("Are you sure you want to delete?") === false) {
      return;
    }
    api.delete("/customers/" + id).then(
      response => {
        alert(response.data.message);
        this.loadCustomers();
      },
      error => {
        alert(error.error.message);
      }
    );
  }

  renderRecord() {
    return this.state.filterCustomers.map((record, key) => (
      <tr key={key}>
        <th scope="row" className="text-center">
          {key + 1}
        </th>
        <td>{record.customerCode}</td>
        <td>{record.customerName}</td>
        <td>{record.address}</td>
        <td>{record.city}</td>
        <td>{record.state}</td>
        <td>{record.phone}</td>
        <td className="text-center">
          <a onClick={() => this.editForm(record)}>
            <i className="fa fa-pencil" />
          </a>
          &nbsp;
          <a onClick={() => this.delete(record.id)}>
            <i className="fa fa-trash" />
          </a>
        </td>
      </tr>
    ));
  }

  render() {
    return (
      <div className="row">
        <div>
          <input
            type="text"
            className="form-control"
            placeholder="Search Customer"
            onChange={this.filterList}
          />
          <div className="panel panel-default panel-table">
            <div className="panel-heading">
              <div className="row">
                <div className="col col-xs-6">
                  <h3 className="panel-title">Sales</h3>
                </div>
                <div className="col col-xs-6 text-right">
                  <Button className="btn-primary" onClick={this.addForm}>
                    Add Customer
                  </Button>
                </div>
              </div>
            </div>
            <div className="panel-body table-responsive">
              <table className="table table-striped table-bordered table-list">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Code</th>
                    <th scope="col">Name</th>
                    <th scope="col">Address</th>
                    <th scope="col">City</th>
                    <th scope="col">State</th>
                    <th scope="col">Phone</th>
                    <th>&nbsp;</th>
                  </tr>
                </thead>
                <tbody>{this.renderRecord()}</tbody>
              </table>
            </div>
          </div>
        </div>
        <LoadableComponent
          show={this.state.modalShow}
          onHide={this.closeForm}
          editRecord={this.state.editRecord}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { isAuthenticated: state.isAuthenticated };
};

export default connect(mapStateToProps)(CustomerList);

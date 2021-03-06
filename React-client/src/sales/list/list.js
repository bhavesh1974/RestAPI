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

class SalesList extends React.Component {
  state = {
    sales: [],
    filterSales: [],
    modalShow: false,
    editRecord: {
      id: "",
      salesDate: "",
      customer: "",
      item: "",
      qty: 0,
      rate: 0,
      taxPercent: 0
    }
  };

  componentDidMount() {
    if (this.props.isAuthenticated === false) {
      this.props.history.replace("/");
    }
    this.loadSales();
  }

  loadSales() {
    api
      .get("sales/getAll")
      .then(data => {
        this.setState({ sales: data.data });
        this.setState({ filterSales: data.data });
      })
      .catch(error => {});
  }

  calculateNetAmount(amount, tax) {
    return amount + (amount * tax) / 100;
  }

  closeForm = () => {
    this.setState({ modalShow: false });
  };

  addForm = () => {
    this.setState(
      {
        editRecord: {
          id: "",
          salesDate: "",
          customer: "",
          item: "",
          qty: 0,
          rate: 0,
          taxPercent: 0
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
    api.delete("/sales/delete/" + id).then(
      response => {
        alert(response.data.message);
        this.loadSales();
      },
      error => {
        alert(error.error.message);
      }
    );
  }

  filterList = event => {
    const filter = this.state.sales.filter(
      item =>
        item.customer
          .toLowerCase()
          .indexOf(event.target.value.toLowerCase()) === 0
    );
    this.setState({ filterSales: filter });
  };

  renderRecord() {
    return this.state.filterSales.map((record, key) => (
      <tr key={key}>
        <th scope="row" className="text-center">
          {key + 1}
        </th>
        <td>{record.salesDate}</td>
        <td>{record.customer}</td>
        <td>{record.item}</td>
        <td className="text-right">{record.qty}</td>
        <td className="text-right">{record.rate}</td>
        <td className="text-right">{record.qty * record.rate}</td>
        <td className="text-right">{record.taxPercent}</td>
        <td className="text-right">
          {this.calculateNetAmount(record.qty * record.rate, record.taxPercent)}
        </td>
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
                    Add Sales
                  </Button>
                </div>
              </div>
            </div>
            <div className="panel-body table-responsive">
              <table className="table table-striped table-bordered table-list">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Date</th>
                    <th scope="col">Customer</th>
                    <th scope="col">Item</th>
                    <th scope="col" className="text-right">
                      Qty.
                    </th>
                    <th scope="col" className="text-right">
                      Rate
                    </th>
                    <th scope="col" className="text-right">
                      Gross Amt.
                    </th>
                    <th scope="col" className="text-right">
                      Tax
                    </th>
                    <th scope="col" className="text-right">
                      Net Amt.
                    </th>
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

export default connect(mapStateToProps)(SalesList);

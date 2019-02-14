import React from "react";
import { withRouter, Link } from "react-router-dom";

class SideBar extends React.Component {
  render() {
    return (
      <div className="sidenav" style={{ marginTop: "50px", paddig: "0px" }}>
        <ul className="list-unstyled">
          <li className="nav-item">
            <a className="nav-link" href="#">
              <i className="fa fa-home" aria-hidden="true">
                {" "}
              </i>{" "}
              Dashboard
            </a>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/sales/list">
              <i className="fa fa-list" aria-hidden="true">
                {" "}
              </i>{" "}
              List
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/socket">
              <i className="fa fa-list" aria-hidden="true">
                {" "}
              </i>{" "}
              Socket
            </Link>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              <i className="fa fa-question-circle" aria-hidden="true">
                {" "}
              </i>{" "}
              Help Center
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              <i className="fa fa-cog" aria-hidden="true">
                {" "}
              </i>{" "}
              Setting
            </a>
          </li>
        </ul>
      </div>
    );
  }
}

export default withRouter(SideBar);

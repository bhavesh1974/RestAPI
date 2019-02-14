import React, { Component } from "react";

class Button extends Component {
  render() {
    return <button className="btn btn-primary">{this.props.label}</button>;
  }
}

Button.defaultProps = {
  label: "Default"
};

export default Button;

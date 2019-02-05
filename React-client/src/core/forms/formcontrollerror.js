import React from "react";
const FormControlError = props => {
  if (props.validationMsg.length > 0) {
    return <div className="alert alert-danger">{props.validationMsg}</div>;
  } else {
    return "";
  }
};

export default FormControlError;

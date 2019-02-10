import React from "react";
import api from "../../shared/service/api";

class UploadPicture extends React.Component {
  state = { selectedFile: null };

  fileChangedHandler = event => {
    //this.setState({ file: URL.createObjectURL(event.target.files[0]) });
    this.setState({ selectedFile: event.target.files[0] });
  };

  uploadHandler = () => {
    const formData = new FormData();
    formData.append("files", this.state.selectedFile);

    api.post("/user/uploadPicture", formData).then(
      success => {
        this.props.history.push("/");
      },
      error => {
        console.log(error);
      }
    );
  };

  render() {
    return (
      <form>
        <div className="form-group">
          <label>Select Picture</label>
          <input type="file" onChange={this.fileChangedHandler} />
        </div>
        <button
          type="button"
          className="btn btn-primary"
          onClick={this.uploadHandler}
        >
          Submit
        </button>
      </form>
    );
  }
}

export default UploadPicture;

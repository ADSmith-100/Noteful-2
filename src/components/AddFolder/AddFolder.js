import React from "react";
import Context from "../../Context";

function addFolderRequest(name, callback) {
  let id = function () {
    // Math.random should be unique because of its seeding algorithm.
    // Convert it to base 36 (numbers + letters), and grab the first 9 characters
    // after the decimal.
    return "_" + Math.random().toString(36).substr(2, 9);
  };
  fetch("http://localhost:8000/api/folders", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      id: id,
      name: name.value,
    }),
  })
    .then((res) => {
      if (!res.ok) {
        // get the error message from the response,
        return res.json().then((error) => {
          // then throw it
          throw error;
        });
      }
      return res.json();
    })
    .then((data) => {
      //console.log({ data, callback });
      callback(name);
    })
    .catch((error) => {
      //console.log(error);
    });
}

export default class AddFolder extends React.Component {
  static contextType = Context;
  constructor(props) {
    super(props);
    this.state = {
      folderName: { value: "" },
    };
  }

  updateFolder(name) {
    this.setState({
      folderName: { value: name },
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { folderName } = this.state;

    addFolderRequest(folderName, this.context.addFolder);
  }

  render() {
    return (
      <form className="add_folder" onSubmit={(e) => this.handleSubmit(e)}>
        <h2>Add Folder</h2>

        <input
          type="text"
          name="folder"
          id="folder"
          required
          placeholder="New Folder"
          onChange={(e) => this.updateFolder(e.target.value)}
        ></input>
        <button type="submit" aria-label="save new folder">
          Save
        </button>
      </form>
    );
  }
}

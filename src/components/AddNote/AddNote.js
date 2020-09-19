import React from "react";
import Context from "../../Context";
import { withRouter } from "react-router-dom";

let id = function () {
  // Math.random should be unique because of its seeding algorithm.
  // Convert it to base 36 (numbers + letters), and grab the first 9 characters
  // after the decimal.

  return "_" + Math.random().toString(36).substr(2, 9);
};

function addNoteRequest(name, folderid, content, callback) {
  fetch("http://localhost:8000/api/notes", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      id: id,
      name: name,
      modified: new Date().toDateString(),
      folderid: folderid,
      content: content,
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
      console.log({ data, callback });
      callback(name);

      //alert("Your note was saved!");
    })

    .catch((error) => {
      console.log(error);
    });
}

class AddNote extends React.Component {
  static contextType = Context;
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      name: "",
      folderid: "",
      content: "",
    };
  }

  handleSubmit(event) {
    event.preventDefault();
    const { name, folderid, content } = this.state;

    addNoteRequest(name, folderid, content, this.context.addNote);
    this.props.history.push(`/api/folder/${folderid}`);
  }

  updateNoteName(name) {
    if (name !== "") {
      this.setState({
        name: name,
      });
    }
  }

  updateNoteContent(content) {
    this.setState({
      content: content,
    });
  }

  updateFolderId(folderid) {
    let result = this.context.folders.filter((obj) => {
      return obj.name === folderid;
    });
    if (result === "") {
      alert("Please choose a folder");
    } else {
      this.setState({
        folderid: result[0].id,
      });
    }
  }
  render() {
    let FolderArray = [];
    for (let o in this.context.folders) {
      FolderArray.push(this.context.folders[o].name);
    }

    return (
      <div>
        <form className="add_note" onSubmit={(e) => this.handleSubmit(e)}>
          <input
            className="newNote"
            type="text"
            name="note"
            id="note"
            placeholder="New Note Name"
            aria-label="New Note Name"
            onChange={(e) => this.updateNoteName(e.target.value)}
            required
          ></input>
          <p>
            <input
              className="noteContent"
              type="text"
              name="content"
              id="content"
              placeholder="New Note Content"
              aria-label="New Note Content"
              onChange={(e) => this.updateNoteContent(e.target.value)}
              required
            ></input>
          </p>

          <select
            className="dropDown"
            name="noteFolder"
            id="noteFolder"
            aria-label="New Note Folder Selection"
            onChange={(e) => this.updateFolderId(e.target.value)}
            required
            defaultValue="None"
          >
            <option value="">None</option>
            {FolderArray.map((folder) => (
              <option
                {...folder}
                key={folder.id}
                value={folder.id}
                name={folder.name}
                text={folder.name}
              >
                {folder}
              </option>
            ))}
            ;
          </select>
          <p>
            <button type="submit" aria-label="save new note">
              Save Note
            </button>
          </p>
        </form>
      </div>
    );
  }
}

export default withRouter(AddNote);

//good example of how to populate dropdowns with data from state/context

//notice how the setstate methods work - they don't have the {value: name}
// like the other ones in Add Folder.  that might simplify things...

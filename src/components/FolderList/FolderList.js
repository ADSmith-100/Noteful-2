import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import Context from "../../Context";
import "./FolderList.css";

export default class FolderList extends Component {
  static contextType = Context;

  render() {
    let folderid = 0;
    if (this.props.match.params.noteid) {
      this.props.notes.forEach((note) => {
        if (note.id === Number(this.props.match.params.noteid)) {
          folderid = note.folderid;
        }
      });
    }
    const fList = Array.from(this.context.folders);
    const list = fList.map(
      (folder, name) =>
        (folderid === 0 || folder.id === folderid) && (
          <NavLink
            key={folder.id}
            className="NoteListNav__folder-link"
            to={`/api/folder/${folder.id}`}
          >
            {folder.name}
            <li
              className="folder_item"
              {...folder}
              key={folder.id}
              name={name}
            ></li>
          </NavLink>
        )
    );
    return (
      <div className="Folder_List">
        <ul>{list}</ul>
        <NavLink
          className="AddFolderLink"
          to="/AddFolderForm"
          aria-label="To Add Folder Form"
        >
          Add Folder
        </NavLink>
      </div>
    );
  }
}

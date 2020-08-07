import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import Context from "../../Context";
import "./FolderList.css";

export default class FolderList extends Component {
  static contextType = Context;
  render() {
    let folderId = 0;
    if (this.props.match.params.noteid) {
      this.props.notes.forEach((note) => {
        if (note.id === this.props.match.params.noteid) {
          folderId = note.folderId;
        }
      });
    }
    const list = this.props.folders.map(
      (folder, name) =>
        (folderId === 0 || folder.id === folderId) && (
          <NavLink
            className="NoteListNav__folder-link"
            to={`/folder/${folder.id}`}
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
        <button className="Add_Folder">Add Folder</button>
      </div>
    );
  }
}

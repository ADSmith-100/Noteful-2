import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "./FolderList.css";

export default class FolderList extends Component {
  render() {
    const list = this.props.folders.map((folder, name) => (
      <li className="folder_item" {...folder} key={folder.id} name={name}>
        <NavLink
          className="NoteListNav__folder-link"
          to={`/folder/${folder.id}`}
        >
          {folder.name}
        </NavLink>
      </li>
    ));
    return (
      <div className="Folder_List">
        <ul>{list}</ul>
        <button className="Add_Folder">Add Folder</button>
      </div>
    );
  }
}

import React, { Component } from "react";
import "./FolderList.css";

export default class FolderList extends Component {
  render() {
    const list = this.props.folders.map((folder, key, name) => (
      <li className="folder_item" {...folder} key={folder.id} name={name}>
        <span className="folderName">{folder.name}</span>
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

import React from "react";
import "./NoteData.css";

class NoteData extends React.Component {
  render() {
    const { data } = this.props.Notes.content;

    return (
      <div className="notes">
        <p> {data} </p>
      </div>
    );
  }
}

export default NoteData;

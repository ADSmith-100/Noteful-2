import React from "react";

export default class ErrorPage extends React.Component {
  constructor() {
    super();
    this.state = {
      error: null,
    };
  }

  static getDerivedStateFromError(error) {
    console.error(error);
    this.setState({ error });
  }

  render() {
    if (this.state.error) {
      return (
        <div className="ErrorPage">
          <h1>Something went wrong!</h1>
          <p>Please refresh the page</p>
        </div>
      );
    }

    return this.props.children;
  }
}

import { Component } from "react";
import { Link as RouterLink, withRouter } from "react-router-dom";
import React from "react";

class Header extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div class="topnav">
        <a onClick={() => this.props.history.push("/")}>Home</a>
        <a onClick={() => this.props.history.push("/my-nominations")}>
          My Nominations
        </a>
      </div>
    );
  }
}

export default withRouter(Header);

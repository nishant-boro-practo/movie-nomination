import { Component } from "react";
import { Link as RouterLink, withRouter } from "react-router-dom";
import React from "react";

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      active: false,
    };
  }

  render() {
    return (
      <div class="topnav">
        <a
          className={!this.state.active ? "active" : ""}
          onClick={() => {
            this.setState({ active: !this.state.active });
            this.props.history.push("/");
          }}
        >
          Home
        </a>
        <a
          className={this.state.active ? "active" : ""}
          onClick={() => {
            this.setState({ active: !this.state.active });
            this.props.history.push("/my-nominations");
          }}
        >
          My Nominations
        </a>
      </div>
    );
  }
}

export default withRouter(Header);

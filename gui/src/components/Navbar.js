import React, { Component } from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";
import * as actions from "../store/actions/auth";
// import UsernameDropdown from './UsernameDropdown';

export class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: ""
    };
  }

  componentDidMount() {
    const token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };

      const url = `${process.env.REACT_APP_API_URL}api/user/`;
      axios.get(url).then(res =>
        this.setState({
          username: res.data.username
        })
      );
    }
  }

  render() {
    const { isAuth, logout } = this.props;
    const { username } = this.state;

    let myCollections = null;
    if (isAuth) {
      myCollections = (
        <Menu.Item key="2">
          <Link to="/my-collections">My Collections</Link>
        </Menu.Item>
      );
    }

    let dropdown;
    if (isAuth) {
      dropdown = (
        <Menu.SubMenu key="3" title={username} style={{ float: "right" }}>
          <Menu.Item onClick={logout}>Log Out</Menu.Item>
        </Menu.SubMenu>
      );
    } else {
      dropdown = (
        <Menu.Item key="3" style={{ float: "right" }}>
          <Link to="/login">Log In</Link>
        </Menu.Item>
      );
    }

    return (
      <div>
        <Menu theme="dark" mode="horizontal" style={{ lineHeight: "64px" }}>
          <Menu.Item key="1">
            <Link to="/">Collections</Link>
          </Menu.Item>
          {myCollections}
          {dropdown}
        </Menu>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(actions.logout())
});

export default connect(
  null,
  mapDispatchToProps
)(Navbar);

import React, {Component} from 'react'
import {Glyphicon, Dropdown, MenuItem} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Logo from './auth/component_logo';
import About from './component_about';

class NavBar extends Component {

  render() {
    return (
      <nav className="navbar navbar-custom">
        <span className="navbar-brand navbar-brand-cust vertical-center">
          <Logo
            loginImg='../../style/images/CP_Logo_White_S.png'
            imgClass='logo-navbar'
           />
        <span className="aligner-item-bottom">{this.props.heading}</span>
        </span>
        <Dropdown id="bg-nested-dropdown" className="pull-right margin-top dropdwn-header aligner-item-bottom">
          <Dropdown.Toggle className="bttn">
            <Glyphicon glyph="menu-hamburger"></Glyphicon>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <MenuItem className="dropdwn-menu">
              <Link to="/">Dashboard</Link>
              <Link to="/addresses">Address editor</Link>
              <Link to="/about">About</Link>
            </MenuItem>
            <MenuItem className="dropdwn-menu" onClick={this.props.handleLogout.bind(this)}>Logout</MenuItem>
          </Dropdown.Menu>
        </Dropdown>
      </nav>
    )
  }
}

export default NavBar

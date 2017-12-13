import React, {Component} from 'react'
import {Glyphicon, Dropdown, MenuItem} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Logo from './auth/component_logo';

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
            <MenuItem className="dropdwn-menu" onClick={this.props.handleLogout.bind(this)}>Logout</MenuItem>

            {this.props.linkTo.path ? <MenuItem className="dropdwn-menu">
              <Link
                to={{pathname: this.props.linkTo.path,
                  query: {fromPath: this.props.linkTo.fromPath,
                  fromName: this.props.linkTo.fromName}}}>
                {this.props.linkTo.name}
              </Link>
            </MenuItem> : ''}
          </Dropdown.Menu>
        </Dropdown>
      </nav>
    )
  }
}

export default NavBar

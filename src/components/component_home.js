import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Button} from 'react-bootstrap';
import {logoutUser} from '../actions';
import AddressForm from './component_addressForm';

console.log('our token', localStorage.getItem('jwtToken'))

class Home extends Component {

  handleLogout() {
    this.props.logoutUser(() => {
      this.props.history.push('/login')
    });
  }

  render() {
    return (
      <div>
        <div className="container">
          <nav className="navbar navbar-cutom">
            <div className="container-fluid">
              <div className="navbar-header">
                <h1 className="navbar-brand">Hello</h1>
                <ul className="nav navbar-nav">
                  <li>
                    <button className="bttn" onClick={this.handleLogout.bind(this)} type="button">Logout</button>
                  </li>
                </ul>
              </div>
            </div>
          </nav>

          <div className="row container-address">
            <div className="col-xs-10">
              <div>array of values</div>
            </div>
          </div>
          <div className="row container-adress-input">
            <div className="col-xs-10">
              <AddressForm />
            </div>
          </div>
        </div>
        <div className="row footer">
          <div className="col-xs-10">
            <p>Total of all wallets</p>
            <h2>total</h2>
          </div>
        </div>
      </div>

    );
  }
}

export default connect(null, {logoutUser})(Home)

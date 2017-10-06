import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Button } from 'react-bootstrap';
import { logoutUser } from '../actions';

console.log('our token',localStorage.getItem('jwtToken'))

class Home extends Component {

  handleLogout() {
    this.props.logoutUser( () => {
      this.props.history.push('/login')
    });
  }

  render() {
    return (
      <div className="holder">
        <header className="row">
          <h1 className="col-xs-10">Hello</h1>
          <div className="col-xs-2">
            <button className="bttn" onClick={this.handleLogout.bind(this)} type="button">Logout</button>
          </div>
        </header>
        <div className="row container-address">
          <div className="col-xs-10">
            <div>array of inputs</div>
          </div>
        </div>

        <div className="row container-total">
          <div className="col-xs-10">
            <p>Total of all wallets</p>
            <h2>total</h2>
          </div>
        </div>
      </div>
    );
  }
}


export default connect(null, { logoutUser })(Home)

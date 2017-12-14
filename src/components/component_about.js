import React, {Component} from 'react'
import NavBar from './component_navbar';
import {logoutUser} from '../actions';
import {connect} from 'react-redux';

class About extends Component {


  handleLogout() {
    this.props.logoutUser( () => {
      this.props.history.push('/login')
    });
  }

  render() {
    return (
      <div>
        <Navbar
          handleLogout={() => this.handleLogout()}
          heading={'About'}
        />
        <h1>About page</h1>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
  }

}

connect(mapStateToProps, {logoutUser})(About)

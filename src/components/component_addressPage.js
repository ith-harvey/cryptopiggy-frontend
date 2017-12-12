import React, { Component } from 'react'
import AddressList from './component_addressList';
import NavBar from './component_navbar';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { logoutUser } from '../actions';
import { allAddressesWithBalance } from '../actions/etherscan';


class AddressPage extends Component {

  componentWillMount() {
    this.props.allAddressesWithBalance()
  }

  handleLogout() {
    this.props.logoutUser( () => {
      this.props.history.push('/login')
    });
  }


  render() {
    return (
      <div>
        <NavBar
          handleLogout={() => this.handleLogout()}
          linkTo={{path: '/', name: 'Dashboard', fromPath: '/addresses', fromName: 'Address editor'}}
          heading={'Public Address editor'}
        />
        <div className="container">

          <div className="text-center disclosure-div">
            DISCLOSURE: Do not enter in and save your private address in the space below. The input below is ment for your public address so we can track the ammount of crypto you have in your wallet and therefore assess it's value.
          </div>
          <div className="col-xs-11">
            <AddressList
              addressesArr={this.props.addressesArr}
            />
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    addressesArr: state.address.addressesArr
  }
}

export default connect(mapStateToProps, {logoutUser, allAddressesWithBalance})(AddressPage)

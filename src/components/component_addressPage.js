import React, { Component } from 'react'
import AddressList from './component_addressList';
import NavBar from './component_navbar';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import ContainedModal from './component_modal';

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
        <ContainedModal
          modalHeader="Address editor"
          modalBody={["Crypto Piggy utilizes your Ethereum account's public address in order to provide you with insights and data visualizations on the dashboard.", <br></br>,<br></br>, "Simply enter in the public addresses you wish to track on the following page, it's as simple as that! If you don't know what a public address, don't worry. Just refer to this article about public addresses from Coin Desk and then enter in your address information when you're ready."]}
         />
        <NavBar
          handleLogout={() => this.handleLogout()}
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

import React, { Component } from 'react'
import AddressList from './component_addressList';
import NavBar from './component_navbar';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import ContainedModal from './component_modal';
import ToolTip from './component_tooltip';

import { logoutUser } from '../actions';
import { allAddressesWithBalance } from '../actions/etherscan';


class AddressPage extends Component {
  state = {
    show: false
  }

  componentWillMount() {
    this.props.allAddressesWithBalance()

    if (this.props.location.state !== undefined) {
      this.setState({show: true})
    }
  }

  handleLogout() {
    this.props.logoutUser( () => {
      this.props.history.push('/login')
    });
  }

  render() {

    return (
      <div>
        <ToolTip
          toolTipHeader="Enter a public address"
          toolTipBody={["Crypto Piggy utilizes your Ethereum account's public address in order to provide you with insights and data visualizations on the dashboard.", <br></br>,<br></br>, "Simply enter in the public addresses you wish to track in the input above.", <br></br>,<br></br>, <div className="tiny-info-txt"> If you don't know what a public address is refer to this <a href="https://www.investopedia.com/terms/p/public-key.asp">article about public addresses</a> from Investopedia and enter in your Ethereum public address information when you're ready.</div>]}
          displayToolTip={this.props.addressesArr.length ? false : true}
        />
        <NavBar
          handleLogout={() => this.handleLogout()}
          heading={'Public Address editor'}
        />
        <div className="container">
          <div className="text-center disclosure-div">
            DISCLOSURE: Do not enter in and save your private address in the space below. The input below is ment for your Ethereum public address so we can track the ammount of crypto you have in your wallet and therefore assess it's value.
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

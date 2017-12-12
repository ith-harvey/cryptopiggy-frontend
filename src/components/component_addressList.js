import React, {Component} from 'react'
import Address from './component_address'
import AddressForm from './component_addressForm';
import {fetchAddresses, deleteAddress} from '../actions'
import {connect} from 'react-redux';
import {allAddressesWithBalance} from '../actions/etherscan'



class AddressList extends Component {

  onDeleteAddress(id) {
    this.props.deleteAddress(id, () => {
      this.props.allAddressesWithBalance()
    })
  }

  render() {
    let addressNodes = this.props.addressesArr.map(address => {
      return (
        <Address
          uniqueID={address.id}
          address={address.address}
          amountEth={address.amount_in_wallet}
          amountUsd={address.amount_in_usd}
          deleteAddress={() => this.onDeleteAddress(address.id)}
          key={ address.id } >
        </Address>
      )
    })

    return (
      <div>
        <div className='margin-bottom'>
          <AddressForm />
        </div>
        <div className="scroll-div">
          {addressNodes}
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    errorMessage: state.address.error,
    message: state.address.message,
  }
}


export default connect(mapStateToProps, {deleteAddress, fetchAddresses, allAddressesWithBalance})(AddressList)

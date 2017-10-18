import React, {Component} from 'react'
import Address from './component_address'
import {fetchAddresses, deleteAddress} from '../actions'
import {connect} from 'react-redux';

class AddressList extends Component {

  // map function
  componentDidMount() {
    this.props.fetchAddresses()
  }

  onDeleteAddress(id) {
    console.log('delete', id)
    this.props.deleteAddress(id)
  }



  render() {
    let addressNodes = this.props.addressesArr.map(address => {
      return (
        <Address
          uniqueID={address.id}
          address={address.address}
          amount={address.amount_in_wallet}
          deleteAddress={() => onDeleteAddress(address.id).bind(this)}
          key={ address.id} >
        </Address>
      )
    })

    return (
      <div>
        { addressNodes }
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    errorMessage: state.address.error,
    message: state.address.message,
    addressesArr: state.address.addressesArr
  }
}


export default connect(mapStateToProps, {deleteAddress, fetchAddresses})(AddressList)

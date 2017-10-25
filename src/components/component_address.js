import React, {Component} from 'react'
import { Glyphicon } from 'react-bootstrap'

class Address extends Component {

  // map function

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-xs-8">
            <span className="address">{this.props.address}</span>
            <p>{this.props.amountEth} | ${this.props.amountUsd}</p>
          </div>
          <div className="col-xs-2">
            <Glyphicon onClick={this.props.deleteAddress} glyph="remove-circle"></Glyphicon>
          </div>
        </div>
      </div>
    )
  }

}

export default Address

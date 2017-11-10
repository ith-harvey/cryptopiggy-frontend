import React, {Component} from 'react'
import { Glyphicon } from 'react-bootstrap'
import { Col, Row } from 'react-bootstrap';

class Address extends Component {

  // map function

  render() {
    return (
      <div>
        <Row>
          <Col xs={10} className="no-overflow">
            <span className="address">{this.props.address}</span>
            <p>{this.props.amountEth} | ${this.props.amountUsd}</p>
          </Col>
          <Col xs={2}>
            <Glyphicon onClick={this.props.deleteAddress} glyph="remove-circle"></Glyphicon>
          </Col>
        </Row>

      </div>
    )
  }

}

export default Address

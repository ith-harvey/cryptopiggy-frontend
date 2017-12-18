import React, {Component} from 'react'

class AccountValue extends Component {

  render() {
    return (
      <div className="row">
        <div className="text-right vertical-center">
          <div className="horizontal-center-margin">
            <h1 className="title-total-val">
              ${this.props.totalUsd}
            </h1>
            <h4>
              {this.props.totalEth}
              <span className="tiny-label">Eth</span>
            </h4>
          </div>
        </div>
      </div>
    )
  }
}

export default AccountValue

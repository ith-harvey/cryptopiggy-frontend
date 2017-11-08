import React, {Component} from 'react'

class PortfolioValue extends Component {

  setWindow(month) {
    switch(month) {
      case '.5':
      //code
      break;

      case '1':
      //code
      break;

      case '6':
      //code
      break;

      default:
      //code
    }

  }

  render() {
    return (
      <div>
        <div className="row">
          <p>Total Ether: {this.props.totalEth}</p>
          <h4>Total in USD: ${this.props.totalUsd}</h4>
        </div>
        <div className="row">
          <div className="col-xs-8">
            {/* <h4>${this.props.performWindow.Val}</h4> */}
          </div>
          <div className="col-xs-4">
          <div class="dropdown">
            <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              clicker
            </button>
            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <a className="dropdown-item" onClick={this.setWindow.bind(this)} href="#">Two week view</a>
              <a className="dropdown-item" onClick={this.setWindow.bind(this)} href="#">One month view</a>
              <a className="dropdown-item" onClick={this.setWindow.bind(this)} href="#">Six month view</a>
              <a className="dropdown-item" onClick={this.setWindow.bind(this)} href="#">One year view</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    )
  }

}

export default PortfolioValue

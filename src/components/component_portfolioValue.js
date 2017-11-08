import React, {Component} from 'react'
import {DropdownButton, MenuItem} from 'react-bootstrap'

class PortfolioValue extends Component {
  state = {
    performWindowVal: 'nothing yet'
  }

  setWindow(e) {
    switch(e.target.getAttribute("value")) {
      case '.5':
        if (this.props.twoWeeksAgo.valueBackThen)
        this.setState({performWindowVal: this.props.twoWeeksAgo.valueBackThen})
        else this.setState({performWindowVal: 'Not enough history'})
      break;

      case '1':
        if (this.props.oneMonthAgo.valueBackThen) this.setState({performWindowVal: this.props.oneMonthAgo.valueBackThen})
        else this.setState({performWindowVal: 'Not enough history'})
      break;

      case '6':
      if (this.props.sixMonthsAgo.valueBackThen)
        this.setState({performWindowVal: this.props.sixMonthsAgo.valueBackThen})
        else this.setState({performWindowVal: 'Not enough history'})
      break;

      default:
      if (this.props.oneYearAgo.valueBackThen)
      this.setState({performWindowVal: this.props.oneYearAgo.valueBackThen})
      else this.setState({performWindowVal: 'Not enough history'})
    }
  }

  render() {
    let { performWindowVal } = this.state
    return (
      <div>
        <div className="row">
          <p>Total Ether: {this.props.totalEth}</p>
          <h4>Total in USD: ${this.props.totalUsd}</h4>
        </div>
        <div className="row">
          <div className="col-xs-8">
            {this.state.performWindowVal}
          </div>
          <div className="col-xs-4">
            <DropdownButton title="Dropdown" id="bg-nested-dropdown">
              <MenuItem value=".5" onClick={(e)=> this.setWindow(e)}>Two week view</MenuItem>
              <MenuItem value="1" onClick={(e)=> this.setWindow(e)}>One month view</MenuItem>
              <MenuItem value="6" onClick={(e)=> this.setWindow(e)}>Six month view</MenuItem>
              <MenuItem value="12" onClick={(e)=> this.setWindow(e)}>One year view</MenuItem>
            </DropdownButton>
        </div>
      </div>
    </div>
    )
  }

}

export default PortfolioValue

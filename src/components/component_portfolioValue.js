import React, {Component} from 'react'
import {DropdownButton, MenuItem} from 'react-bootstrap'

class PortfolioValue extends Component {
  state = {
    performWindowVal: 'nothing yet'
  }



  setWindow(e) {
    let diff

    let calcDiff = (curval, oldval) => curval - oldval
    console.log('in switch', this.props.twoWeeksAgo)
    switch(e.target.getAttribute("value")) {
      case '.5':
        if (this.props.twoWeeksAgo.valueBackThen) {
          diff = calcDiff(this.props.totalUsd,this.props.twoWeeksAgo.valueBackThen)
        }
        else diff = 'Not enough history'
      break;

      case '1':
        if (this.props.oneMonthAgo.valueBackThen) {
          diff = calcDiff(this.props.totalUsd,this.props.oneMonthAgo.valueBackThen)
        }
        else diff = 'Not enough history'
      break;

      case '6':
      if (this.props.sixMonthsAgo.valueBackThen) {
        diff = calcDiff(this.props.totalUsd,this.props.sixMonthsAgo.valueBackThen)
      }
      else diff = 'Not enough history'
      break;

      default:
      if (this.props.oneYearAgo.valueBackThen) {
        diff = calcDiff(this.props.totalUsd,this.props.oneYearAgo.valueBackThen)
      }
      else diff = 'Not enough history'
    }
    this.setState({performWindowVal: diff })
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

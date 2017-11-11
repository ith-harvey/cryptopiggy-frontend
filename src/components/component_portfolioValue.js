import React, {Component} from 'react';
import { DropdownButton, MenuItem } from 'react-bootstrap';
import LineChart from './graph/component_lineChart';

class PortfolioValue extends Component {
  state = {
    performWindowVal: 'nothing yet',
    performWindowData: []
  }

  componentDidMount() {
   this.setWindow() // empty argument -> hit default case (whenCreated)
  }

  setWindow(e) {
    let handleInput = e => e ? e.target.getAttribute("value") : 'whenCreated'

    let diff
    let windowData

    let calcDiff = (curval, oldval) => {
      let returnVal = (curval - oldval).toFixed(2)
      if (returnVal >= 0) return `+$${returnVal}`
      return `-$${returnVal}`
    }

    console.log('running')


    switch(handleInput(e)) {
      case '.5':
        if (this.props.twoWeeksAgo.valueBackThen) {
          diff = calcDiff(this.props.totalUsd,this.props.twoWeeksAgo.valueBackThen)
          windowData = this.props.twoWeeksAgo.windowData.slice()
        } else {
          diff = 'Not enough history'
          windowData = []
        }
      break;

      case '1':
        if (this.props.oneMonthAgo.valueBackThen) {
          diff = calcDiff(this.props.totalUsd,this.props.oneMonthAgo.valueBackThen)
          windowData = this.props.oneMonthAgo.windowData.slice()
        }
        else diff = 'Not enough history', windowData = []
      break;

      case '6':
      if (this.props.sixMonthsAgo.valueBackThen) {
        diff = calcDiff(this.props.totalUsd,this.props.sixMonthsAgo.valueBackThen)
        windowData = this.props.sixMonthsAgo.windowData.slice()
      }
      else diff = 'Not enough history', windowData = []
      break;

      case '12':
      if (this.props.oneYearAgo.valueBackThen) {
        diff = calcDiff(this.props.totalUsd,this.props.oneYearAgo.valueBackThen)
        windowData = this.props.oneYearAgo.windowData.slice()
      }
      else diff = 'Not enough history', windowData = []
      break;

      default:
      console.log('in default!', this.props.whenCreated.valueBackThen)
      if (this.props.whenCreated.valueBackThen) {
        diff = calcDiff(this.props.totalUsd,this.props.whenCreated.valueBackThen)
        windowData = this.props.whenCreated.windowData.slice()
      }
      else diff = 'Not enough history', windowData = []
    }

    this.setState({performWindowVal: diff, performWindowData: windowData })
  }

  render() {

    let { performWindowVal, performWindowData } = this.state
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
            <DropdownButton title="dropdown" id="bg-nested-dropdown">
              <MenuItem value="whenCreated" onClick={(e)=> this.setWindow(e)}>All time view</MenuItem>
              <MenuItem value=".5" onClick={(e)=> this.setWindow(e)}>Two week view</MenuItem>
              <MenuItem value="1" onClick={(e)=> this.setWindow(e)}>One month view</MenuItem>
              <MenuItem value="6" onClick={(e)=> this.setWindow(e)}>Six month view</MenuItem>
              <MenuItem value="12" onClick={(e)=> this.setWindow(e)}>One year view</MenuItem>
            </DropdownButton>
          </div>
        </div>
        <LineChart
          performanceData={this.state.performWindowData}
         />
      </div>
    )
  }

}

export default PortfolioValue

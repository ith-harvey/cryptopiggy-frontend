import React, {Component} from 'react';
import { DropdownButton, MenuItem } from 'react-bootstrap';
import LineChart from './graph/component_lineChart';

class PortfolioValue extends Component {
  state = {
    performWindowVal: 'nothing yet',
    performWindowData: [],
    performPercent: 'can\'t calculate'
  }

  componentDidMount() {
   this.setWindow() // empty argument -> hit default case (whenCreated)
  }

  setWindow(e) {

    let handleInput = e => e ? e.target.getAttribute("value") : 'whenCreated'

    let diff, windowData, percentDiff

    let calcDiff = (curval, oldval) => {
      let returnVal = (curval - oldval).toFixed(2)
      if (returnVal >= 0) return `+$${returnVal}`
      return `-$${returnVal}`
    }

    let calcPercentDiff = (curval, oldval) => {
      curval = Number(curval)
      oldval = Number(oldval)
      console.log('cur', curval)
      console.log('old', oldval)
      let returnVal = ((curval - oldval) / oldval * 100).toString()
      // .substr(2,3)
      console.log('percent', returnVal)
      returnVal = `${returnVal.substr(0,2)}.${returnVal.substr(2,3)}%`
      return returnVal
    }


    switch(handleInput(e)) {
      case '24h':
        if (this.props.aDayAgo.valueBackThen) {
          diff = calcDiff(this.props.totalUsd,this.props.aDayAgo.valueBackThen)
          windowData = this.props.aDayAgo.windowData.slice()
        } else {
          diff = 'Not enough history', percentDiff = 'can\'t calculate', windowData = []
        }
      break;

      case '.25':
        if (this.props.oneWeekAgo.valueBackThen) {
          diff = calcDiff(this.props.totalUsd,this.props.oneWeekAgo.valueBackThen)
          windowData = this.props.oneWeekAgo.windowData.slice()

          percentDiff = calcPercentDiff(this.props.totalUsd, this.props.oneWeekAgo.valueBackThen)
        } else {
          diff = 'Not enough history', percentDiff = 'can\'t calculate', windowData = []
        }
      break;

      case '1':
        if (this.props.oneMonthAgo.valueBackThen) {
          diff = calcDiff(this.props.totalUsd,this.props.oneMonthAgo.valueBackThen)
          windowData = this.props.oneMonthAgo.windowData.slice()

          percentDiff = calcPercentDiff(this.props.totalUsd, this.props.oneMonthAgo.valueBackThen)
        }
        else diff = 'Not enough history', windowData = [], percentDiff = 'can\'t calculate'
      break;

      case '6':
      if (this.props.sixMonthsAgo.valueBackThen) {
        diff = calcDiff(this.props.totalUsd,this.props.sixMonthsAgo.valueBackThen)
        windowData = this.props.sixMonthsAgo.windowData.slice()

        percentDiff = calcPercentDiff(this.props.totalUsd, this.props.sixMonthsAgo.valueBackThen)
      }
      else diff = 'Not enough history', windowData = [], percentDiff = 'can\'t calculate'
      break;

      case '12':
      if (this.props.oneYearAgo.valueBackThen) {
        diff = calcDiff(this.props.totalUsd,this.props.oneYearAgo.valueBackThen)
        windowData = this.props.oneYearAgo.windowData.slice()

        percentDiff = calcPercentDiff(this.props.totalUsd, this.props.oneYearAgo.valueBackThen)
      }
      else diff = 'Not enough history', windowData = [], percentDiff = 'can\'t calculate'
      break;

      default:
      if (this.props.whenCreated.valueBackThen) {
        diff = calcDiff(this.props.totalUsd,this.props.whenCreated.valueBackThen)
        windowData = this.props.whenCreated.windowData.slice()

        percentDiff = calcPercentDiff(this.props.totalUsd, this.props.whenCreated.valueBackThen)
      }
      else diff = 'Not enough history', windowData = [], percentDiff = 'can\'t calculate'
    }

    this.setState({performWindowVal: diff, performWindowData: windowData, performPercent: percentDiff})
  }

  render() {

    let { performWindowVal, performWindowData, performPercent } = this.state

    return (
      <div>
        <div className="row">
          <p>Total Ether: {this.props.totalEth}</p>
          <h4>Total in USD: ${this.props.totalUsd}</h4>
        </div>
        <div className="row">
          <div className="col-xs-8">
            <div className="row">
              <div className="col-xs-6">
                {this.state.performWindowVal}
              </div>
              <div className="col-xs-6">
                {this.state.performPercent}
              </div>
            </div>
          </div>
          <div className="col-xs-4">
            <DropdownButton className="bttn" title="dropdown" id="bg-nested-dropdown">
              <MenuItem value="whenCreated" className="dropdwn-menu" onClick={(e)=> this.setWindow(e)}>All time view</MenuItem>
              <MenuItem className="dropdwn-menu" value="24h" onClick={(e)=> this.setWindow(e)}>One day view</MenuItem>
              <MenuItem className="dropdwn-menu" value=".25" onClick={(e)=> this.setWindow(e)}>One week view</MenuItem>
              <MenuItem className="dropdwn-menu" value="1" onClick={(e)=> this.setWindow(e)}>One month view</MenuItem>
              <MenuItem className="dropdwn-menu" value="6" onClick={(e)=> this.setWindow(e)}>Six month view</MenuItem>
              <MenuItem className="dropdwn-menu" value="12" onClick={(e)=> this.setWindow(e)}>One year view</MenuItem>
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

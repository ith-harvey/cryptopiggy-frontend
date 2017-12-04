import React, {Component} from 'react';
import { DropdownButton, MenuItem } from 'react-bootstrap';
import LineChart from './graph/component_lineChart';
import LineSeparator from './component_lineSeparator';

class PortfolioValue extends Component {
  state = {
    performWindowVal: 'nothing yet',
    performWindowData: [],
    performPercent: 'can\'t calculate',
    title: "All time view"
  }

  componentDidMount() {
   this.setWindow() // empty argument -> hit default case (whenCreated)
  }

  setWindow(e) {

    let handleInput = e => e ? e.target.getAttribute("value") : 'whenCreated'

    let diff, windowData, percentDiff

    let calcDiff = (curval, oldval) => {
      let returnval = (curval - oldval).toFixed(2)
      console.log('type of', typeof returnval)
      return returnval
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
        this.setState({title: "One day view"})
      break;

      case '.25':
        if (this.props.oneWeekAgo.valueBackThen) {
          diff = calcDiff(this.props.totalUsd,this.props.oneWeekAgo.valueBackThen)
          windowData = this.props.oneWeekAgo.windowData.slice()

          percentDiff = calcPercentDiff(this.props.totalUsd, this.props.oneWeekAgo.valueBackThen)
        } else {
          diff = 'Not enough history', percentDiff = 'can\'t calculate', windowData = []
        }
        this.setState({title: "One week view"})
      break;

      case '1':
        if (this.props.oneMonthAgo.valueBackThen) {
          diff = calcDiff(this.props.totalUsd,this.props.oneMonthAgo.valueBackThen)
          windowData = this.props.oneMonthAgo.windowData.slice()

          percentDiff = calcPercentDiff(this.props.totalUsd, this.props.oneMonthAgo.valueBackThen)
        }
        else diff = 'Not enough history', windowData = [], percentDiff = 'can\'t calculate'
        this.setState({title: "One month view"})
      break;

      case '6':
      if (this.props.sixMonthsAgo.valueBackThen) {
        diff = calcDiff(this.props.totalUsd,this.props.sixMonthsAgo.valueBackThen)
        windowData = this.props.sixMonthsAgo.windowData.slice()

        percentDiff = calcPercentDiff(this.props.totalUsd, this.props.sixMonthsAgo.valueBackThen)
      }
      else diff = 'Not enough history', windowData = [], percentDiff = 'can\'t calculate'
      this.setState({title: "Six month view"})
      break;

      case '12':
      if (this.props.oneYearAgo.valueBackThen) {
        diff = calcDiff(this.props.totalUsd,this.props.oneYearAgo.valueBackThen)
        windowData = this.props.oneYearAgo.windowData.slice()

        percentDiff = calcPercentDiff(this.props.totalUsd, this.props.oneYearAgo.valueBackThen)
      }
      else diff = 'Not enough history', windowData = [], percentDiff = 'can\'t calculate'
      this.setState({title: "One year view"})
      break;

      default:
      if (this.props.whenCreated.valueBackThen) {
        diff = calcDiff(this.props.totalUsd,this.props.whenCreated.valueBackThen)
        windowData = this.props.whenCreated.windowData.slice()

        percentDiff = calcPercentDiff(this.props.totalUsd, this.props.whenCreated.valueBackThen)
      }
      else diff = 'Not enough history', windowData = [], percentDiff = 'can\'t calculate'
      this.setState({title: "All time view"})
    }
    this.setState({performWindowVal: diff, performWindowData: windowData, performPercent: percentDiff})
  }

  render() {
    let { performWindowVal, performWindowData, performPercent } = this.state
    const modifytxt = {}

    if (this.state.performWindowVal > 0) {
      modifytxt.color = 'green'
      modifytxt.mssg = 'gain'
    } else {
      modifytxt.color = 'red'
      modifytxt.mssg = 'loss'
    }

    return (
      <div>
        <div className="row">
          <div className="text-right vertical-center">
            <div className="horizontal-center">
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
        <div className="row vertical-center">
          <LineSeparator
            separatorClass='col-xs-4'
          />
          <div className="col-xs-4">
          <DropdownButton className="bttn dropdwn-window-button" title={this.state.title} id="bg-nested-dropdown">
            <MenuItem value="whenCreated" className="dropdwn-menu" onClick={(e)=> this.setWindow(e)}>All time view</MenuItem>
            <MenuItem className="dropdwn-menu" value="24h" onClick={(e)=> this.setWindow(e)}>One day view</MenuItem>
            <MenuItem className="dropdwn-menu" value=".25" onClick={(e)=> this.setWindow(e)}>One week view</MenuItem>
            <MenuItem className="dropdwn-menu" value="1" onClick={(e)=> this.setWindow(e)}>One month view</MenuItem>
            <MenuItem className="dropdwn-menu" value="6" onClick={(e)=> this.setWindow(e)}>Six month view</MenuItem>
            <MenuItem className="dropdwn-menu" value="12" onClick={(e)=> this.setWindow(e)}>One year view</MenuItem>
          </DropdownButton>
          </div>
          <LineSeparator
            separatorClass='col-xs-4'
          />
        </div>
        <div className="row vertical-center">
          <div className={"col-xs-6 text-center " + modifytxt.color}>
            <h3 className="heading-time-window">${this.state.performWindowVal}</h3>
            <span className={"tiny-label-colorless " + modifytxt.color}>
              {modifytxt.mssg}
            </span>
          </div>
          <div className={"col-xs-6 text-center " + modifytxt.color}>
            <h3 className="heading-time-window">{this.state.performPercent}</h3>
            <span className={"tiny-label-colorless " + modifytxt.color}>
              {modifytxt.mssg}
            </span>
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

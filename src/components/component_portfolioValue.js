import React, {Component} from 'react';
import { DropdownButton, MenuItem } from 'react-bootstrap';
import LineChart from './graph/component_lineChart';
import LineSeparator from './component_lineSeparator';

class PortfolioValue extends Component {
  state = {
    performWindowVal: 'nothing yet',
    performWindowData: [],
    xAxisInterval: '',
    performPercent: 'can\'t calculate',
    title: "All time view"
  }

  componentDidMount() {
   this.setWindow() // empty argument -> hit default case (whenCreated)
  }

  setWindow(e) {

    let handleInput = e => e ? e.target.getAttribute("value") : 'whenCreated'

    let diff, windowData, percentDiff, xInterval

    let calcDiff = (curval, oldval) => {
      let returnval = (curval - oldval).toFixed(2)
      return returnval
    }

    let calcPercentDiff = (curval, oldval) => {
      curval = Number(curval)
      oldval = Number(oldval)
      let returnVal = ((curval - oldval) / oldval * 100).toString()
      returnVal = returnVal.slice(0,returnVal.length - 10)
      return Number(returnVal)
    }


    let setLineChrtValues = (timeWindow) => {
      // if value !null -> set timewindow values for lineChart
      // This function:
        // calculates difference
        // sets up the points on the graph
        // calculates percent difference
        // instructs lnchart on how to set x axis time 'hourly' or 'monthly'

      if (timeWindow.valueBackThen) { 
      diff = calcDiff(this.props.totalUsd, timeWindow.valueBackThen)

      windowData = timeWindow.windowData.slice()

      percentDiff = calcPercentDiff(this.props.totalUsd, timeWindow.valueBackThen)

      xInterval = timeWindow.xAxisInterval
      } else {
        diff = 'Not enough history', percentDiff = 'can\'t calculate', windowData = [], xInterval='can\'t calculate'
      }
      this.setState({
        performWindowVal: diff,
        performWindowData: windowData,
        performPercent: percentDiff,
        xAxisInterval: xInterval
      })
    }


    switch(handleInput(e)) {
      case '24h':
        setLineChrtValues(this.props.aDayAgo)
        this.setState({title: "One day view"})
      break;

      case '.25':
        setLineChrtValues(this.props.oneWeekAgo)
        this.setState({title: "One week view"})
      break;

      case '1':
        setLineChrtValues(this.props.oneMonthAgo)
        this.setState({title: "One month view"})
      break;

      case '6':
        setLineChrtValues(this.props.sixMonthsAgo)
        this.setState({title: "Six month view"})
      break;

      case '12':
        setLineChrtValues(this.props.oneYearAgo)
        this.setState({title: "One year view"})
      break;

      default:
        setLineChrtValues(this.props.whenCreated)
        this.setState({title: "All time view"})
    }

  }

  render() {
    console.log('xAxisInterval logging', this.state.xAxisInterval)
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
            <h3 className="heading-time-window">{this.state.performPercent}%</h3>
            <span className={"tiny-label-colorless " + modifytxt.color}>
              {modifytxt.mssg}
            </span>
          </div>
        </div>
          <LineChart
            performanceData={this.state.performWindowData}
            xAxisInterval={this.state.xAxisInterval}
          />
      </div>
    )
  }

}

export default PortfolioValue

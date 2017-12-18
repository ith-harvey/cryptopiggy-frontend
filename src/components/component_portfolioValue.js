import React, {Component} from 'react';
import { DropdownButton, MenuItem } from 'react-bootstrap';
import LineChart from './graph/component_lineChart';
import LineSeparator from './component_lineSeparator';
import AccountValue from './component_accountvalue';


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

    let difference = (curval, oldval) => {
      let returnval = (curval - oldval).toFixed(2)
      return returnval
    }

    let percentDif = (curval, oldval) => {
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
        diff = difference(this.props.totalUsd, timeWindow.valueBackThen)
        windowData = timeWindow.windowData.slice()
        percentDiff = percentDif(this.props.totalUsd, timeWindow.valueBackThen)
        xInterval = timeWindow.xAxisInterval

      } else {
        diff = null, percentDiff = null, windowData = [], xInterval= null
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

    if (!this.state.performWindowData.length) return (
      <div>
        <AccountValue
        totalUsd={this.props.totalUsd}
        totalEth={this.props.totalEth}
       />
       <LineSeparator
         separatorClass='width-full margin-bottom'
       />
        <div className="text-center disclosure-div">
          Uh oh, it looks like you have either: <br></br> <br></br> 1. Not setup your public addresses with Crypto Piggy. <br></br> <br></br> or <br></br> <br></br> 2. It hasn't been an hour since you added your first address! <br></br> <br></br> If it has been an hour, don't wait! email questions@cryptopiggy.us with your account information so we can help.
        </div>
      </div>
    )

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
        <AccountValue
          totalUsd={this.props.totalUsd}
          totalEth={this.props.totalEth}
         />
        <div className="row vertical-center horizontal-center">
          <div className="width-third">
            <LineSeparator
              separatorClass='width-line'
            />
          </div>

          <div className="width-dropdown">
            <div className="vertical-center horizontal-center">
            <DropdownButton className="bttn dropdwn-window-button" title={this.state.title} id="bg-nested-dropdown">
              <MenuItem value="whenCreated" className="dropdwn-menu" onClick={(e)=> this.setWindow(e)}>All time view</MenuItem>

              <MenuItem className="dropdwn-menu" value="24h" disabled={!this.props.aDayAgo.valueBackThen} onClick={(e)=>  !this.props.aDayAgo.valueBackThen ? null : this.setWindow(e)}>One day view</MenuItem>

              <MenuItem className="dropdwn-menu" value=".25" disabled={!this.props.oneWeekAgo.valueBackThen} onClick={(e)=>  !this.props.oneWeekAgo.valueBackThen ? null : this.setWindow(e)}>One week view</MenuItem>

              <MenuItem className="dropdwn-menu" value="1" disabled={!this.props.oneMonthAgo.valueBackThen} onClick={(e)=>  !this.props.oneMonthAgo.valueBackThen ? null : this.setWindow(e)}>One month view</MenuItem>

              <MenuItem className="dropdwn-menu" value="6" disabled={!this.props.sixMonthsAgo.valueBackThen} onClick={(e)=>  !this.props.sixMonthsAgo.valueBackThen ? null : this.setWindow(e)}>Six month view</MenuItem>

              <MenuItem className="dropdwn-menu" value="12" disabled={!this.props.oneYearAgo.valueBackThen} onClick={(e)=>  !this.props.oneYearAgo.valueBackThen ? null : this.setWindow(e)}>One year view</MenuItem>

            </DropdownButton>
            </div>
          </div>

          <div className="width-third">
            <LineSeparator
              separatorClass='width-line horizontal-center-dropdwn'
            />
          </div>
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

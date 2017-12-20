import React, {Component} from 'react'
import {Button} from 'react-bootstrap';

class ToolTip extends Component {
  state = {
    show: this.props.displayToolTip
  }

  close() {
    this.setState({ show: false });
  }

  open() {
    this.setState({ show: true })
  }

  render() {

    if (!this.state.show) return <div></div>

    if (this.props.toolTipHeader === 'Setup your account') {
      return (
        <div>
          <div className="arrow-up-border-dashboard"></div>
          <div className="arrow-up-dashboard"></div>
          <div className="tooltip-dashboard">
            <div>
              <h3>{this.props.toolTipHeader}</h3>
              <p>{this.props.toolTipBody}</p>
              <Button className="bttn pull-right" onClick={() => this.close() }>Ok got it!</Button>
            </div>
          </div>
        </div>
      )
    } else if (this.props.toolTipHeader === 'Enter a public address') {
      return (
        <div>
          <div className="arrow-up-border-addressEditor"></div>
          <div className="arrow-up-addressEditor"></div>
          <div className="tooltip-addressEditor">
            <div>
              <h3>{this.props.toolTipHeader}</h3>
              <p>{this.props.toolTipBody}</p>
              <Button className="bttn pull-right" onClick={() => this.close() }>Ok got it!</Button>
            </div>
          </div>
        </div>
      )
    }
  }
}

export default ToolTip

import React, {Component} from 'react'

class LineSeparator extends Component {

  render() {
    return (
      <div className="row vertical-center">
        <div className="col-xs-4 separator-line"></div>
        <div className="col-xs-4 separator-text address text-center">{this.props.separatorTitle}</div>
        <div className="col-xs-4 separator-line"></div>
      </div>
    )
  }

}

export default LineSeparator

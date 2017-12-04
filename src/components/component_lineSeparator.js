import React, {Component} from 'react'

class LineSeparator extends Component {

  render() {
    return (
        <div className={this.props.separatorClass + " separator-line"}></div>
    )
  }

}

export default LineSeparator

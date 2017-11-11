import React, {Component} from 'react';
import * as d3 from 'd3';

class Dots extends Component {

  render() {
      let _self = this;

      //remove last & first point
      let data = this.props.data.slice().splice(1);
      data.pop();

      let circles = data.map(function( d, i ) {
        return (
          <circle className="dot" r="7" cx={_self.props.x(d.date)} cy={_self.props.y(d.value)} fill="#7dc7f4"
          stroke="#3f5175" strokeWidth="5px" key={i}
          onMouseOver={_self.props.showToolTip} onMouseOut={_self.props.hideToolTip}
          data-key={d3.timeFormat("%m/%d/%Y")(d.date)} data-amount={d.amount_eth} data-value={d.value} />
        );
      })

      return (
        <g>
          {circles}
        </g>
      );
  }
}

Dots.propTypes = {
  data:React.PropTypes.array,
  x:React.PropTypes.func,
  y:React.PropTypes.func
}

export default Dots

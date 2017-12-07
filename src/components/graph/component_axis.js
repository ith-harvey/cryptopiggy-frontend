import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import * as d3 from 'd3';


class Axis extends Component {

    componentDidUpdate() {
      this.renderAxis();
    }

    componentDidMount() {
      this.renderAxis();
    }

    xOrYModify(node) {
      if (this.props.axisType === 'y') {
        return d3.select(node).call(this.props.axis);
      } else {


        if (this.props.numberOfNodes < 25) {
          return d3.select(node)
          .call(this.props.axis).selectAll(".tick")
          .attr('class', 'tick hidden-tick')
          .filter( (d,i) => {
            let copy = new Date(d)
            copy.setHours(12)
            if (d.getTime() === copy.getTime()) {
              return d
            }
            copy.setHours(18)
            if (d.getTime() === copy.getTime()) {
              return d
            }
            copy.setHours(0)
            if (d.getTime() === copy.getTime()) {
              return d
            }
            copy.setHours(6)
            if (d.getTime() === copy.getTime()) {
              return d
            }
          })
          .attr('class', 'tick visible-tick')
          .filter( (d,i) => {
            let copy = new Date(d)
            copy.setHours(0)
            if (d.getTime() === copy.getTime()) {
              return d
            }
          })
          .attr('class', 'tick visible-tick just-date');
          // IMPORTANT need to go back and clip the hours off of the date
        }

        if (25 < this.props.numberOfNodes < 50) {
          return d3.select(node)
          .call(this.props.axis).selectAll(".tick")
          .attr('class', 'tick hidden-tick')
          .filter( (d,i) => {
            let copy = new Date(d)
            copy.setHours(12)
            if (d.getTime() === copy.getTime()) {
              return d
            }
            copy.setHours(18)
            if (d.getTime() === copy.getTime()) {
              return d
            }
            copy.setHours(0)
            if (d.getTime() === copy.getTime()) {
              return d
            }
            copy.setHours(6)
            if (d.getTime() === copy.getTime()) {
              return d
            }
          })
          .attr('class', 'tick visible-tick')
          .filter( (d,i) => {
            let copy = new Date(d)
            copy.setHours(0)
            if (d.getTime() === copy.getTime()) {
              return d
            }
          })
          .attr('class', 'tick visible-tick just-date');
          // IMPORTANT need to go back and clip the hours off of the date
        }

    }
    }

    renderAxis() {
      var node = ReactDOM.findDOMNode(this);
      this.xOrYModify(node)
    }

    render() {

        var translate = "translate(0,"+(this.props.h)+")";
        return (
          <g className={"axis "+this.props.axisType+"-axis"}
            transform={this.props.axisType=='x'?translate:""} >
          </g>
        )
    }

}

Axis.propTypes = {
  h:React.PropTypes.number,
  axis:React.PropTypes.func,
  axisType:React.PropTypes.oneOf(['x','y'])
}

export default Axis

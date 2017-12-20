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

    tickPlacement(setHourOrDate, copy, d, desiredInterval) {
      if(setHourOrDate === 'setHours') {

      } else {
        copy.setDate(desiredInterval)
        if (d.getTime() === copy.getTime()) {
          return d
        }
      }
    }

    xOrYModify(node) {
      if (this.props.axisType === 'y') {
        return d3.select(node).call(this.props.axis);
      } else {

        if (this.props.numberOfNodes < 5) {
          return d3.select(node)
          .call(this.props.axis).selectAll(".tick")
          .attr('class', 'tick hidden-tick')
          .filter( (d,i) => {
            return d
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


        if (this.props.numberOfNodes < 26 && this.props.xAxisInterval === 'hourly') {
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

        if (this.props.numberOfNodes < 26 && this.props.xAxisInterval === 'yearly') {
          return d3.select(node)
          .call(this.props.axis).selectAll(".tick")
          .attr('class', 'tick hidden-tick')
          .filter( (d,i) => {
            if (i % 2 === 0) {
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

        if (25 < this.props.numberOfNodes < 60) {
          return d3.select(node)
          .call(this.props.axis).selectAll(".tick")
          .attr('class', 'tick hidden-tick')
          .filter( (d,i) => {
            let copy = new Date(d)
            copy.setDate(1)
            if (d.getTime() === copy.getTime()) {
              return d
            }

            copy.setDate(5)
            if (d.getTime() === copy.getTime()) {
              return d
            }

            copy.setDate(10)
            if (d.getTime() === copy.getTime()) {
              return d
            }

            copy.setDate(15)
            if (d.getTime() === copy.getTime()) {
              return d
            }

            copy.setDate(20)
            if (d.getTime() === copy.getTime()) {
              return d
            }
            copy.setDate(25)
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

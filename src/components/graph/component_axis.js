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
      if (this.props.axisType === 'y'){
        return d3.select(node).call(this.props.axis);
      } else {
        return d3.select(node)
        .call(this.props.axis).selectAll(".tick")
        .attr('class', 'tick visible-tick')
        .filter( (d,i) => {
          if (i % 6) return d
          console.log('inselection! d', d)
          console.log('inselection! d', i)
        })
        .attr('class', 'tick hidden-tick');
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

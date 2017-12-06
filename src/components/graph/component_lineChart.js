import React, {Component} from 'react';
import Dots from './component_chartDots'
import Axis from './component_axis'
import Grid from './component_grid'
import ToolTip from './component_tooltip'
import * as d3 from 'd3';

class LineChart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      width: this.props.width,
      tooltip: {
        display: false,
        data: {key: '', value: '', amount:''}
      }
    }
  }

  showToolTip(e) {
    e.target.setAttribute('fill', '#FFFFFF');
    this.setState({
      tooltip: {
        display: true,
        data: {
            key: e.target.getAttribute('data-key'),
            value: e.target.getAttribute('data-value'),
            amount: e.target.getAttribute('data-amount')
            },
        pos: {
            x: e.target.getAttribute('cx'),
            y: e.target.getAttribute('cy')
        }
      }
    });
  }

  hideToolTip(e) {
    e.target.setAttribute('fill', '#7dc7f4');
    this.setState({
      tooltip:{
        display: false,
        data: {key:'',value:'', amount:''}
      }
    });
  }

  render() {
    console.log('data we play with : ', this.props.xAxisInterval)
    if (this.props.performanceData.length < 1) return <div />

      console.log('data we play with : ',this.props.xAxisInterval)

      let margin = {top: 5, right: 50, bottom: 20, left: 50},
          w = this.state.width - (margin.left + margin.right),
          h = this.props.height - (margin.top + margin.bottom);

      let parseDate = d3.timeParse("%m/%d/%Y %H:%M:%S");

      this.props.performanceData.forEach(function (d) {
        d.date = parseDate(d.day);
      });

      let x = d3.scaleTime()
          .domain(d3.extent(this.props.performanceData, function (d) {
              return d.date;
          }))
          .rangeRound([0, w]);

      let y = d3.scaleLinear()
          .domain([0,d3.max(this.props.performanceData,function(d){
              return d.value+100;
          })])
          .range([h, 0]);

      let line = d3.line()
          .x(function (d) {
              return x(d.date);
          })
          .y(function (d) {
              return y(d.value);
          }).curve(d3.curveCardinal)

      let transform = `translate(${margin.left}, ${margin.top})`;

      let yAxis = d3.axisLeft(y)
          .ticks(5);

      let xAxis = d3.axisBottom(x)
          .tickValues(
            this.props.performanceData.map(function(d,i) {
            // if( i > 0 ) {
              // return d.date; I WILL HAVE TO CHANGE THIS ONCE MY DATA IS UP AND RUNNING
              return d.date;
             // }
          })
          // .splice(1)
          )
         .tickFormat(d3.timeFormat("%m/%d"))
         .ticks(5);

      let yGrid = d3.axisLeft(y)
          .ticks(5)
          .tickFormat("")
          .tickSize(-w, 0, 0);

      return (
          <svg id={this.props.chartId} width={this.state.width} height={this.props.height} className="col-xs-12">
            <g transform={transform}>

              <Grid h={h} grid={yGrid} gridType="y"/>

              <Axis h={h} axis={yAxis} axisType="y" />
              <Axis h={h} axis={xAxis} axisType="x"/>

              <path className="line" d={line(this.props.performanceData)} strokeLinecap="round"/>

              <Dots data={this.props.performanceData} x={x} y={y}
                showToolTip={(e)=> this.showToolTip(e)}
                hideToolTip={(e) => this.hideToolTip(e)}
              />

              <ToolTip tooltip={this.state.tooltip}/>
            </g>
          </svg>
      )
  }
}

LineChart.defaultProps = {
  width: 340,
  height: 235,
  chartId: 'v1_chart'
}

LineChart.propTypes = {
  width:React.PropTypes.number,
  height:React.PropTypes.number,
  chartId:React.PropTypes.string
}

export default LineChart

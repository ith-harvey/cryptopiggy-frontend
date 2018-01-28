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
            value: Number(e.target.getAttribute('data-value')).toFixed(2),
            amount: Number(e.target.getAttribute('data-amount')).toFixed(5)
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


  customizeXAxis(x) {

    let setxAxisFormat = () => {
      if((this.props.xAxisInterval === 'hourly')) return d3.timeFormat("%m/%d %H:%M")
      if (this.props.xAxisInterval === 'monthly') return d3.timeFormat("%m/%d")
      if (this.props.xAxisInterval === 'yearly') return d3.timeFormat("%m/%y")

    }

    if (this.props.performanceData.length < 5) {
      return d3.axisBottom(x)
          .tickValues(
            this.props.performanceData.map( (d,i) => {
              return d.date;
          })
          )
         .tickFormat(setxAxisFormat())
         .ticks(5);
    } else if (this.props.performanceData.length >= 5) {
      return d3.axisBottom(x)
          .tickValues(
            this.props.performanceData.map( (d,i) => {
              return d.date;
          })
          )
         .tickFormat(setxAxisFormat())
         .ticks(5);
    }
  }

  render() {
    if (this.props.performanceData.length < 1) return <div />

      let margin = {top: 5, right: 70, bottom: 60, left: 40},
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

      let transform = `translate(${margin.left}, ${margin.top})`;

      let yAxis = d3.axisLeft(y)
          .ticks(5);

      let xAxis = this.customizeXAxis(x)

      let yGrid = d3.axisLeft(y)
          .ticks(5)
          .tickFormat("")
          .tickSize(-w, 0, 0);

      let line = d3.line()
        .x(function(d) {
          return x(d.date); })
        .y(function(d) { return y(d.value); })
        .curve(d3.curveCardinal);


      return (
          <svg id={this.props.chartId} width={this.state.width} height={this.props.height} className="col-xs-12">
            <g transform={transform}>

              <Grid h={h} grid={  yGrid} gridType="y"/>

              <Axis h={h} axis={yAxis} axisType="y" />
              <Axis h={h} axis={xAxis}
                numberOfNodes={this.props.performanceData.length}
                xAxisInterval={this.props.xAxisInterval}
                axisType="x"/>

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
  width: 360,
  height: 280,
  chartId: 'v1_chart'
}

LineChart.propTypes = {
  width:React.PropTypes.number,
  height:React.PropTypes.number,
  chartId:React.PropTypes.string
}

export default LineChart

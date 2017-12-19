import React, {Component} from 'react'
import * as d3 from 'd3';

class ToolTip extends Component {
  state = {
    usd: 0,
    eth: 0
  }

  componentWillMount() {


    console.log('what we try to modify:', typeof this.props.tooltip.data.value)




  }

  render() {
    let visibility="hidden";
    let transform="";
    let x=0;
    let y=0;
    let width=100,height=55;
    let transformText='translate('+width/2+','+(height/2-17)+')';
    let transformArrow="";

    if (this.props.tooltip.display == true) {

      let position = this.props.tooltip.pos;

      x = position.x;
      y = position.y;
      visibility = "visible";

      if ( y > height ) {
        transform='translate(' + (x-width/2) + ',' + (y-height-20) + ')';
        transformArrow='translate('+(width/2-20)+','+(height-2)+')';

      } else if ( y < height ) {
        transform='translate(' + (x-width/2) + ',' + (Math.round(y)+20) + ')';
        transformArrow='translate('+(width/2-20)+','+0+') rotate(180,20,0)';
      }

    } else {
      visibility="hidden"
    }

    return (
      <g transform={transform}>
        <rect class="shadow" is width={width} height={height} rx="5" ry="5" visibility={visibility} fill="#6391da" opacity=".9"/>
        <polygon class="shadow" is points="10,0  30,0  20,10"
          transform={transformArrow}
          fill="#6391da" opacity=".9" visibility={visibility}
        />
        <text is visibility={visibility} transform={transformText}>
            <tspan is x="0" text-anchor="middle" dy="2" font-size="12px" fill="#ffffff">{this.props.tooltip.data.key}</tspan>
            <tspan is x="0" text-anchor="middle" dy="20" font-size="13px" fill="#a9f3ff">{"$"+this.props.tooltip.data.value}</tspan>
            <tspan is x="0" text-anchor="middle" dy="18" font-size="12px" fill="#a9f3ff">{this.props.tooltip.data.amount + ' Eth'}</tspan>
        </text>
      </g>
    );
  }
}

ToolTip.propTypes = {

  tooltip:React.PropTypes.object

}

export default ToolTip

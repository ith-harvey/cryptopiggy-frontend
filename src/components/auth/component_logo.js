import React, {Component} from 'react';

  class Logo extends Component {

    render() {
      return (
          <div className="img-holder">
              <img className={this.props.imgClass} src={this.props.loginImg}/>
          </div>
      )
    }

  }


export default Logo

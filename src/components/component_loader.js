import React, {Component} from 'react'
import Logo from './auth/component_logo';

class Loader extends Component {

  render() {
    return (
        <div className="loader">
          <svg className="circular" viewBox="25 25 50 50">
            <circle className="path" cx="50" cy="50" r="20" fill="none" strokeWidth="1" stroke-miterlimit="10"/>
          </svg>

        <Logo
          loginImg='../../style/images/Cryptopiggy_Logo_L.png'
          imgClass='logo-loader'
         />
        </div>
    )
  }

}

export default Loader

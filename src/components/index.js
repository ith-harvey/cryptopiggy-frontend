import React, { Component } from 'react';
import { Link } from 'react-router-dom'

import { Button } from 'react-bootstrap';


export default class Home extends Component {
  render() {
    return (
      <div className="holder">
        <div className="row parent">
        <Link to="/mylibrary" className="col-xs-6 my-library-div">My library</Link>
        <div className="col-xs-6">
          <div>green</div>
        </div>
        </div>
        <div className="row parent">
          <div className="col-xs-6">
            <div>yellow</div>
          </div>
          <div className="col-xs-6">
            <div>red</div>
          </div>
        </div>
      </div>
    );
  }
}

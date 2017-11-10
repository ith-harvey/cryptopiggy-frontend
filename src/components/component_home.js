import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Button} from 'react-bootstrap';
import AddressForm from './component_addressForm';
import AddressList from './component_addressList';
import PortfolioValue from './component_portfolioValue';

import {logoutUser} from '../actions';
import {performanceHistory} from '../actions/performance-history'


class Home extends Component {

  componentWillMount() {
    this.props.performanceHistory()
  }


  handleLogout() {
    this.props.logoutUser( () => {
      this.props.history.push('/login')
    });
  }


  render() {
    return (
      <div>
        <div className="container">
          <nav className="navbar navbar-cutom">
            <div className="container-fluid">
              <div className="navbar-header">
                <h1 className="navbar-brand">Hello</h1>
                <ul className="nav navbar-nav">
                  <li>
                    <button className="bttn" onClick={this.handleLogout.bind(this)} type="button">Logout</button>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
          <div className="row container-address">
            <div className="col-xs-10">
              <AddressList />
            </div>
          </div>
          <div className="row container-adress-input">
            <div className="col-xs-10">
              <AddressForm />
            </div>
          </div>
          <div className="row footer">
            <div className="col-xs-10">
              <PortfolioValue
                totalEth={this.props.totalEth}
                totalUsd={this.props.totalUSD}
                twoWeeksAgo={this.props.twoWeeksAgo}
                oneMonthAgo={this.props.oneMonthAgo}
                sixMonthsAgo={this.props.sixMonthsAgo}
                oneYearAgo={this.props.oneYearAgo}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    totalEth: state.address.totalCrypto,
    totalUSD: state.address.totalUSD,
    oneMonthAgo: state.performanceHistory.oneMonthAgo,
    oneYearAgo: state.performanceHistory.oneYearAgo,
    sixMonthsAgo: state.performanceHistory.sixMonthsAgo,
    twoWeeksAgo: state.performanceHistory.twoWeeksAgo
  }

}

export default connect(mapStateToProps, {logoutUser, performanceHistory})(Home)

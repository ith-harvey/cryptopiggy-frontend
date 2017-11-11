import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Button} from 'react-bootstrap';
import AddressForm from './component_addressForm';
import AddressList from './component_addressList';
import PortfolioValue from './component_portfolioValue';

import {logoutUser} from '../actions';
import {performanceHistory} from '../actions/performance-history'
import {allAddressesWithBalance} from '../actions/etherscan'


class Home extends Component {

  componentWillMount() {
    this.props.allAddressesWithBalance()
    this.props.performanceHistory()
  }


  handleLogout() {
    this.props.logoutUser( () => {
      this.props.history.push('/login')
    });
  }


  render() {
    if (!this.props.totalUSD) return <div>Loading animation...</div>

    return (
      <div>
        <div className="container">
          <nav className="navbar navbar-cutom">
            <span className="navbar-brand">Hello</span>
            <ul className="navbar-nav navbar-right">
              <li className="nav-item">
                <button className="bttn" onClick={this.handleLogout.bind(this)} type="button">Logout</button>
              </li>
            </ul>
          </nav>
          <div className="col-xs-10">
            <PortfolioValue
              totalEth={this.props.totalEth}
              totalUsd={this.props.totalUSD}
              twoWeeksAgo={this.props.twoWeeksAgo}
              oneMonthAgo={this.props.oneMonthAgo}
              sixMonthsAgo={this.props.sixMonthsAgo}
              oneYearAgo={this.props.oneYearAgo}
              whenCreated={this.props.whenCreated}
            />
          </div>
          <div className="col-xs-10">
            <AddressList />
          </div>
          <div className="col-xs-10">
            <AddressForm />
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
    twoWeeksAgo: state.performanceHistory.twoWeeksAgo,
    whenCreated: state.performanceHistory.whenCreated
  }

}

export default connect(mapStateToProps, {logoutUser, performanceHistory, allAddressesWithBalance})(Home)

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Button, Glyphicon, Dropdown, MenuItem} from 'react-bootstrap';
import AddressList from './component_addressList';
import NavBar from './component_navbar';
import PortfolioValue from './component_portfolioValue';

import {logoutUser} from '../actions';
import {allAddressesWithBalance} from '../actions/etherscan';
import {performanceHistory} from '../actions/performance-history'


class Home extends Component {

  componentWillMount() {
    this.props.performanceHistory()
    this.props.allAddressesWithBalance()
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
        <NavBar
          handleLogout={() => this.handleLogout()}
          linkTo={{path: '/addresses', name: 'Address editor', fromPath: '/home', fromName: 'Dashboard'}}
          heading={'Dashboard'}
        />
        <div className="container">
          <div className="col-xs-12">
            <PortfolioValue
              totalEth={this.props.totalEth}
              totalUsd={this.props.totalUSD}
              aDayAgo={this.props.aDayAgo}
              oneWeekAgo={this.props.oneWeekAgo}
              oneMonthAgo={this.props.oneMonthAgo}
              sixMonthsAgo={this.props.sixMonthsAgo}
              oneYearAgo={this.props.oneYearAgo}
              whenCreated={this.props.whenCreated}
            />
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
    aDayAgo: state.performanceHistory.aDayAgo,
    oneWeekAgo: state.performanceHistory.oneWeekAgo,
    whenCreated: state.performanceHistory.whenCreated,
  }
}

export default connect(mapStateToProps, {logoutUser, performanceHistory, allAddressesWithBalance})(Home)

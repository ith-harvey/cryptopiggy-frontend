import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Button, Glyphicon, Dropdown, MenuItem} from 'react-bootstrap';
import AddressList from './component_addressList';
import NavBar from './component_navbar';
import PortfolioValue from './component_portfolioValue';
import Loader from './component_loader';
import ContainedModal from './component_modal';

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
    if (!this.props.totalUSD || !this.props.whenCreated) return <div className="container"><Loader /></div>

    return (
      <div>
        <NavBar
          handleLogout={() => this.handleLogout()}
          heading={'Dashboard'}
        />
        <ContainedModal
          modalHeader="Setup your dashboard"
          modalBody={["Whoops, it looks like you have not setup your account yet. ", <br></br>,<br></br>, "In order to setup your dashboard, you must first provide information about your portfolio. To do so, please navigate to the address editor."]}
          linkAddress="/addresses"
          linkName="Address editor"
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

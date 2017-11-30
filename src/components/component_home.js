import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Button, Glyphicon, Dropdown, MenuItem} from 'react-bootstrap';
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
            <span className="navbar-brand">Crypto Piggy</span>
            <ul className="navbar-nav navbar-right">
              <li className="nav-item">
                <Dropdown id="bg-nested-dropdown">
                  <Dropdown.Toggle className="bttn">
                    <Glyphicon glyph="cog"></Glyphicon>
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <MenuItem className="dropdwn-menu" onClick={this.handleLogout.bind(this)}>Logout</MenuItem>
                    <MenuItem className="dropdwn-menu" onClick={this.handleLogout.bind(this)}>Modify addresses</MenuItem>
                  </Dropdown.Menu>
              </Dropdown>
              </li>
            </ul>
          </nav>
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
          <div className="col-xs-12">
            <AddressList
              addressesArr={this.props.addressesArr}
            />
          </div>
          <div className="col-xs-12">
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
    aDayAgo: state.performanceHistory.aDayAgo,
    oneWeekAgo: state.performanceHistory.oneWeekAgo,
    whenCreated: state.performanceHistory.whenCreated,
    addressesArr: state.address.addressesArr
  }

}

export default connect(mapStateToProps, {logoutUser, performanceHistory, allAddressesWithBalance})(Home)

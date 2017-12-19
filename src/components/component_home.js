import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Button, Glyphicon, Dropdown, MenuItem} from 'react-bootstrap';
import AddressList from './component_addressList';
import NavBar from './component_navbar';
import PortfolioValue from './component_portfolioValue';
import Loader from './component_loader';
import ContainedModal from './component_modal';
import ToolTip from './component_tooltip';

import {logoutUser} from '../actions';
import {allAddressesWithBalance} from '../actions/etherscan';
import {performanceHistory} from '../actions/performance-history'


class Home extends Component {
  state = {
    show: false
  }

  componentWillMount() {
    this.props.performanceHistory()
    this.props.allAddressesWithBalance()

    if (this.props.whenCreated.valueBackThen) this.setState({show: true})
    console.log('do we have value backthen1?', this.props.whenCreated.valueBackThen)
  }


  handleLogout() {
    this.props.logoutUser( () => {
      this.props.history.push('/login')
    });
  }


  render() {
    console.log('eth',this.props.totalEth)
    console.log('usd',this.props.totalUsd)


    if (!this.props.totalUSD || !this.props.whenCreated) return <div className="container"><Loader /></div>

    return (
      <div>
        <NavBar
          handleLogout={() => this.handleLogout()}
          heading={'Dashboard'}
        />
        <ToolTip
          toolTipHeader="Setup your account"
          toolTipBody={["It looks like you still need to setup your Crypto Piggy account. ", <br></br>,<br></br>, "To do so, navigate to the drop down menu in the top right hand corner and select 'Address editor' to provide information about your portfolio."]}
          displayToolTip={this.props.addressesArr.length ? false : true}
        />
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

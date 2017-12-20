import React, {Component} from 'react'
import NavBar from './component_navbar';
import LineSeparator from './component_lineSeparator';
import {logoutUser} from '../actions';
import {connect} from 'react-redux';

class About extends Component {


  handleLogout() {
    this.props.logoutUser( () => {
      this.props.history.push('/login')
    });
  }

  render() {
    return (
      <div>
        <NavBar
          handleLogout={() => this.handleLogout()}
          heading={'About'}
        />
        <div className="container">
          <div className="col-xs-12 about-styling">
          <p>Crypto Piggy is an open source crypto portfolio chrome extension that allows users to track the performance of their Ethereum addresses.</p>

          <br></br>

          <h4>Commonly Asked Questions</h4>
          <LineSeparator
            separatorClass='width-full margin-bottom'
          />

          <br></br>

          <h5>My graph doesn't display?</h5>
          <p>Double check that you have added an Ethereum public address and that the account has Ether in it. If you have done this, waited over an hour and nothing is still showing up on the graph portion of the dashboard please reach out to questions@cryptopiggy.us with you inquiry. We will do our best to troubleshoot.</p>

          <br></br>

          <h5>Why don't my ERC20 Tokens don't show up?</h5>
          <p>We are currently working to add additional cryptocurrencies outside of just Ether, this includes all ERC20 tokens. We hope to support multiple currencies in the coming months.</p>

          <br></br>

          <h5>How can I pitch in, or help out Crypto Piggy?</h5>
          <p>We have plenty of ideas in regards to additional features like first and foremost supporting other currencies... If you have any other ideas, comments, questions or want to work on the project. Please don't hesitate to reach out to questions@cryptopiggy.us.</p>

          <p>Additionally since the project is maintained by a small group of people, we would also greatly appreciate your support. We accept Ethereum donations here:</p>
          </div>
        </div>
      </div>
    )
  }

}


export default connect(null, {logoutUser})(About)

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { registerUser } from '../../actions';
import { Link } from 'react-router-dom';

import Logo from './component_logo';
import AddressForm from '../component_addressForm';
import AddressList from '../component_addressList';
import { allAddressesWithBalance } from '../../actions/etherscan'

const form = reduxForm({
  form: 'register',
  validate
});

const renderField = field => (
    <div>
      <input className="form-control" {...field.input}/>
      {field.touched && field.error && <div className="error">{field.error}</div>}
    </div>
);

function validate(formProps) {
  const errors = {};

  if (!formProps.email) {
    errors.email = 'Please enter an email';
  }

  if (!formProps.password) {
    errors.password = 'Please enter a password';
  }

  return errors;
}

class Register extends Component {
  constructor() {
    super()
    this.state = { addressFormVisible: false }
  }

  componentWillMount() {
    this.props.allAddressesWithBalance()
  }

  handleFormSubmit(formProps) {
    this.props.registerUser(formProps, () => {
      this.setState({ addressFormVisible: true })
      console.log('attempted to reset state')
    });
  }

  renderAlert() {
    if(this.props.errorMessage) {
      return (
        <div className="alert alert-danger">
          <span><strong>Error!</strong> {this.props.errorMessage}</span>
        </div>
      );
    }
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <div className="container">
        {this.state.addressFormVisible ?
              <div className="col-xs-10 col-xs-offset-1">
                <AddressList
                  addressesArr={this.props.addressesArr}
                />
                <Link to="/" className="bttn pull-right">To dashboard</Link>
              </div>
          : <div className="col-xs-10 col-xs-offset-1">
              <div className="logo-holder">
                <Logo />
              </div>
              <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                  {this.renderAlert()}
                  <div>
                    <label>Username</label>
                    <Field name="username" className="form-control" component={renderField} type="text" />
                  </div>
                  <div>
                    <label>Password</label>
                    <Field name="password" className="form-control" component={renderField} type="password" />
                  </div>
                  <div>
                    <label>Re-enter Password</label>
                    <Field name="doublechkpassword" className="form-control" component="input" type="password" />
                  </div>
                  <button type="submit" className="bttn pull-right">Next</button>
                  <Link to="/login" className="bttn pull-right">To Login</Link>
                </form>
            </div>
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    errorMessage: state.auth.error,
    message: state.auth.message,
    addressesArr: state.address.addressesArr
  };
}

export default connect(mapStateToProps, { registerUser, allAddressesWithBalance})(form(Register));

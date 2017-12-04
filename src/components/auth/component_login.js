import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom'
import { loginUser } from '../../actions';
import Logo from './component_logo';

const form = reduxForm({
  form: 'login'
});

class Login extends Component {
  handleFormSubmit(formProps) {
    this.props.loginUser(formProps, () => {
      this.props.history.push('/')
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
          <div className="logo-holder text-center">
            <Logo
              loginImg='../../../style/images/Cryptopiggy_Logo_L.png'
              imgClass='logo-login'
             />
             <h1>Crypto Piggy</h1>
          </div>
          <div className="col-xs-10 col-xs-offset-1">
            <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
            {this.renderAlert()}
              <div>
                <label>Username</label>
                <Field name="username" className="form-control input-cust" component="input" type="text" />
              </div>
              <div>
                <label>Password</label>
                <Field name="password" className="form-control input-cust" component="input" type="password" />
              </div>
              <button type="submit" className="bttn pull-right">Login</button>
              <Link to="/register" className="bttn pull-right">Register</Link>
            </form>
          </div>
        </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    errorMessage: state.auth.error,
    message: state.auth.message
  };
}

export default connect(mapStateToProps, { loginUser })(form(Login));

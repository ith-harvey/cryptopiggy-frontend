import React, {Component} from 'react'
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { addAddress } from '../actions';
import { allAddressesWithBalance } from '../actions/etherscan'


const form = reduxForm({
  form: 'address',
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
  if (!formProps.address) {
    errors.email = 'Please enter a public address';
  }
  return errors;
}


class AddressForm extends Component {

  handleFormSubmit(formProps) {
    this.props.addAddress(formProps, () => {
      this.props.allAddressesWithBalance()
    });
  }

  renderAlert() {
    if(this.props.errorMessage) {
      return (
        <div>
          <span><strong>Error!</strong> {this.props.errorMessage}</span>
        </div>
      );
    }
  }

  render() {
    const { handleSubmit } = this.props

    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        {this.renderAlert()}
        <div className="row">
          <div className="col-xs-8">
            <Field name="address"
               className="input-cust form-control"
              component={renderField}
              type="text" required/>
          </div>
          <div className="col-xs-4">
            <button type="submit" className="bttn">add address</button>
          </div>
        </div>
      </form>
    )
  }
}

function mapStateToProps(state) {
  return {
    errorMessage: state.error,
    message: state.message
  }
}

export default connect(mapStateToProps, {addAddress, allAddressesWithBalance})(form(AddressForm))

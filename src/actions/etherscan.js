
import axios from 'axios'
import { browserHistory } from 'react-router';

const ADDRESS_FETCHED = 'address_fetched'

// const ROOT_URL = 'http://localhost:3000'
const ROOT_URL = 'http://13.56.11.169'

export function allAddressesWithBalance() {
  return function(dispatch) {
    let token = localStorage.getItem('jwtToken')
    axios.post(`${ROOT_URL}/address/balance/user`, { token })
    .then(response => {
      console.log('addresses & balance response ->', response)
      dispatch({
        type: ADDRESS_FETCHED,
        payload: response.data
      });
    })
    .catch((error) => {
      console.log(error)
      errorHandler(dispatch, error.response, ADDRESS_ERROR)
    });
  }
}

import axios from 'axios'
import { browserHistory } from 'react-router';

const PERFORM_HISTORY_FETCHED = 'perform_history_fetched',
      PERFORM_HISTORY_ERROR = 'perform_history_error';

const ROOT_URL = 'http://localhost:3000'

export function performanceHistory () {
  return function(dispatch) {
    let token = localStorage.getItem('jwtToken')
    axios.post(`${ROOT_URL}/portfolio/performhistory`, {token})
    .then(response => {
      console.log('performance window response ->', response)
      dispatch({
        type: PERFORM_HISTORY_FETCHED,
        payload: response.data
      });
    })
    .catch((error) => {
      console.log(error)
      errorHandler(dispatch, error.response, PERFORM_HISTORY_ERROR)
    });
  }
}

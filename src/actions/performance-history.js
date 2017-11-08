import axios from 'axios'
import { browserHistory } from 'react-router';

const PERFORM_HISTORY_FETCHED = 'perform_history_fetched',
      PERFORM_HISTORY_ERROR = 'perform_history_error';

const ROOT_URL = 'http://localhost:3000'

function todaysDateTime() {
  const today = new Date()
  const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  const dateTime = date+' '+time;
  return dateTime
}

export function performanceHistory () {
  console.log('running!!!!!')
  return function(dispatch) {
    let todaysDate = todaysDateTime()
    let token = localStorage.getItem('jwtToken')
    axios.post(`${ROOT_URL}/portfolio/performhistory`, {token, todaysDate})
    .then(response => {
      console.log('response from serv /////', response)
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

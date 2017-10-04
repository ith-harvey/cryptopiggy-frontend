import React, {Component} from 'react'
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Switch, Route  } from 'react-router-dom'
import reduxThunk from 'redux-thunk'

import reducers from '../reducers';

import Home from './component_home'
import Register from './auth/component_register'
import Login from './auth/component_login'
import Mylibrary from './component_mylibrary'
import NotFoundPage from './component_notfound'
import RequireAuth from './auth/component_require_auth';


let token = localStorage.getItem('jwtToken')

if (token) {
  console.log('token exists')
  store.dispatch({ type: AUTH_USER })
}

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);

class App extends Component {

  render() {
    return (
      <Provider store={createStoreWithMiddleware(reducers)}>
        <Switch>
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path='/' component={RequireAuth(Home)}/>
          <Route path='/*' component={NotFoundPage}/>
        </Switch>
      </Provider>
    )
  }
}

export default App

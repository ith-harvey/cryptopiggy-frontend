import React, {Component} from 'react'
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Switch, Route  } from 'react-router-dom'
import reduxThunk from 'redux-thunk'

import reducers from '../reducers';

import Home from './component_home'
import Register from './auth/component_register'
import AddressPage from './component_addressPage'
import Login from './auth/component_login'
import AddAddress from './auth/component_login'
import Mylibrary from './component_mylibrary'
import NotFoundPage from './component_notfound'
import RequireAuth from './auth/component_require_auth';


const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);


class App extends Component {

  render() {
    return (
      <Provider store={createStoreWithMiddleware(reducers)}>
        <Switch>
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/addresses" component={AddressPage} />
          <Route path='/' component={RequireAuth(Home)} />
          <Route path='/*' component={NotFoundPage}/>
        </Switch>
      </Provider>
    )
  }
}

export default App

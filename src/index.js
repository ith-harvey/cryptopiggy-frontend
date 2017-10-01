import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Switch, Route  } from 'react-router-dom'
import reduxThunk from 'redux-thunk'
import { CookiesProvider } from 'react-cookie';
import { withCookies, Cookies } from 'react-cookie';

import Home from './components'
import Mylibrary from './components/component_mylibrary'

import NotFoundPage from './components/component_notfound';

import Register from './components/auth/component_register';
import Login from './components/auth/component_login';
import RequireAuth from './components/auth/component_require_auth';


import reducers from './reducers';
import { AUTH_USER } from './actions';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
console.log('cookie',cookie)
const token = cookie.load('token');

if (token) {
  store.dispatch({ type: AUTH_USER });
}

ReactDOM.render(
  <CookiesProvider>
    <BrowserRouter>
      <Provider store={createStoreWithMiddleware(reducers)}>
        <Switch>
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path='/mylibrary' component={Mylibrary}/>
          <Route path='/' component={RequireAuth(Home)}/>

          <Route path='/*' component={NotFoundPage}/>
        </Switch>
      </Provider>
    </BrowserRouter>
  </CookiesProvider>
  , document.querySelector('.container'));

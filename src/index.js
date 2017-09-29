import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Switch, Route  } from 'react-router-dom'
import reduxThunk from 'redux-thunk'

import Home from './components'
import Mylibrary from './components/component_mylibrary'

import NotFoundPage from './components/component_notfound';

import Register from './components/auth/component_register';
import Login from './components/auth/component_login';
import RequireAuth from './components/auth/component_require-auth';


import reducers from './reducers';
import { AUTH_USER } from './actions/types';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);

ReactDOM.render(
  <BrowserRouter>
    <Provider store={createStoreWithMiddleware(reducers)}>
      <Switch>
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route path='/mylibrary' component={Mylibrary}/>
        <Route path='/' component={Home}/>

        <Route path='/*' component={NotFoundPage}/>
      </Switch>
    </Provider>
  </BrowserRouter>
  , document.querySelector('.container'));

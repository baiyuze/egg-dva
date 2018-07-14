import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import Welcome from './pages/welcome';
import Products from './pages/products';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={Welcome} />
        <Route path="/products" exact component={Products} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;

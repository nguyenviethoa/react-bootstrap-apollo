// @flow weak

import React        from 'react';
import {
  Route,
  Switch
}                   from 'react-router';
import Home         from '../views/home/Home';
import About        from '../views/about/About';
import Logout    from '../views/logout/Logout';
import PrivateRoute from '../components/privateRoute/PrivateRoute';

const MainRoutes = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/about" component={About} />
      {/* private views: need user to be authenticated */}
      <PrivateRoute path="/logout" component={Logout} />
    </Switch>
  );
};

export default MainRoutes;

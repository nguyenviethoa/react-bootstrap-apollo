// @flow weak

// #region imports
import React, {
  Component
}                               from 'react';
import gql from "graphql-tag";
import { ApolloProvider, Query, Mutation } from "react-apollo";
import {
  Router,
  Switch,
  Route
}                               from 'react-router-dom';

import {
  Container,
  Nav,
  PinListPage,
  AddPinPage,
  Spinner
} from "apollo-subscription-example-components";
// #region import createHistory from hashHistory or BrowserHistory:
import createHistory            from 'history/createHashHistory';
// import createHistory            from 'history/createBrowserHistory';
// #endregion
import App                      from './containers/app/App';
import ScrollToTop              from './components/scrollToTop/ScrollToTop';
import Login                    from './views/login/Login';
import PageNotFound             from './views/pageNotFound/PageNotFound'; // not connected to redux (no index.js)
import LogoutRoute              from './components/logoutRoute/LogoutRoute';
// #endregion

// #region flow types
type Props = any;
type State = any;
// #endregion

const history = createHistory();


const USERS_QUERY = gql`
  {
    getAllUsers{
      username
    }
  }
`;

const MERCHANT_CONFIRMED_SUBSCRIPTION = gql`
  subscription {
    merchantConfirmed {
      username
      email
    }
  }
`;

const UsersQuery = ({ children }) => (
  <Query query={USERS_QUERY}>
    {({ loading, error, data, subscribeToMore }) => {
      if (loading)
        return (
          <div style={{ paddingTop: 20 }}>
            <Spinner show />
          </div>
        );
      if (error) return <p>Error</p>;

      const subscribeToMoreMerchantConfirmed = () => {
        subscribeToMore({
          document: MERCHANT_CONFIRMED_SUBSCRIPTION,
          updateQuery: (prev, { subscriptionData }) => {

            console.log('get subscription: ', subscriptionData)
            // if (!subscriptionData.data || !subscriptionData.data.pinAdded)
            //   return prev;
            // const newPinAdded = subscriptionData.data.pinAdded;

            // return Object.assign({}, prev, {
            //   pins: [...prev.pins, newPinAdded]
            // });
          }
        });
      };

      return children(data.getAllUsers, subscribeToMoreMerchantConfirmed);
    }}
  </Query>
);

class Root extends Component {
  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route exact path="/login" component={Login} />
          <UsersQuery> 
            {
              (users, subscribeToMoreMerchantConfirmed) => <App users={users} subscribeToMoreMerchantConfirmed={subscribeToMoreMerchantConfirmed}/>
            }
          </UsersQuery>
          {/* logout: just redirects to login (App will take care of removing the token) */}
          <LogoutRoute path="/logout" />
          <Route component={PageNotFound} />
        </Switch>
      </Router>
    );
  }
}

export default Root;

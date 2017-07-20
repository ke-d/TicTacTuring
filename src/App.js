import React from 'react';
import { AsyncStorage } from 'react-native';
import storeFactory from './redux/Store';
import { ApolloClient, createNetworkInterface, ApolloProvider, applyMiddleware } from 'react-apollo';
import AppWithNavigationState from './navigation/AppNavigator';

import initialState from './redux/InitialState';

const networkInterface = createNetworkInterface({
  uri: 'https://api.graph.cool/simple/v1/cj4op83dh2t0k014902sz6iaj'
});

networkInterface.use([{
  applyMiddleware (req, next) {
    if (!req.options.headers) {
      req.options.headers = {}
    }
    AsyncStorage.getItem("token")
    .then((value) => {
      // We have data!!
      console.log("header", value);

      req.options.headers.authorization = `Bearer ${value}`
      next()
    });
  },
}])

const client = new ApolloClient({
  networkInterface
});

const store = storeFactory(initialState, client);

export default () => {
  return (
    <ApolloProvider store={store} client={client}>
      <AppWithNavigationState/>
    </ApolloProvider>
  );
};

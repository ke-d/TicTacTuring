import React, { Component } from 'react';
import { StackNavigator, addNavigationHelpers } from 'react-navigation';
import { Provider, connect } from 'react-redux';
import storeFactory from './redux/Store';
import { ApolloClient, createNetworkInterface, ApolloProvider } from 'react-apollo';
import AppWithNavigationState from './navigation/AppNavigator';

import initialState from './redux/InitialState';

const networkInterface = createNetworkInterface({
  uri: 'https://api.graph.cool/simple/v1/cj4op83dh2t0k014902sz6iaj'
});

const client = new ApolloClient({
  networkInterface: networkInterface
});

const store = storeFactory(initialState, client);

export default () => {
  return (
    <ApolloProvider store={store} client={client}>
      <AppWithNavigationState/>
    </ApolloProvider>
  );
};

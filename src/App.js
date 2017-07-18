import React, { Component } from 'react';
import { StackNavigator, addNavigationHelpers } from 'react-navigation';
import { Provider, connect } from 'react-redux';
import storeFactory from './redux/Store';

import AppWithNavigationState from './navigation/AppNavigator';

import initialState from './redux/InitialState';


const store = storeFactory(initialState);

export default () => {
  return (
    <Provider store={store}>
      <AppWithNavigationState/>
    </Provider>
  );
};

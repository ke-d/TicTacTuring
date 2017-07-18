import React, { Component } from 'react';
import { StackNavigator, addNavigationHelpers } from 'react-navigation';
import { Provider, connect } from 'react-redux';
import storeFactory from '../redux/store';

import AppWithNavigationState from './AppNavigator';

import initialState from '../redux/initialState';


const store = storeFactory(initialState);

export default () => {
  return (
    <Provider store={store}>
      <AppWithNavigationState/>
    </Provider>
  );
};

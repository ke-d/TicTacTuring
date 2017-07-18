import React from 'react';
import { connect } from 'react-redux';
import { addNavigationHelpers, StackNavigator } from 'react-navigation';

import MainMenu from './containers/MainMenu';
import Profile from './containers/Profile';

export const AppNavigator = StackNavigator({
   Home: { screen: Profile },
   Profile: { screen: Profile}
 });

const AppWithNavigationState = ({ dispatch, nav }) => (
  <AppNavigator navigation={addNavigationHelpers({ dispatch, state: nav })} />
);


const mapStateToProps = state => ({
  nav: state.nav,
});

export default connect(mapStateToProps)(AppWithNavigationState);

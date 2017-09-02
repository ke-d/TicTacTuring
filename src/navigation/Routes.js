import MainMenu from '../components/containers/MainMenu';
import Profile from '../components/containers/Profile';

import TicTacTuring from '../components/containers/TicTacTuring';

// All the routes of TicTacTuring
const Routes = {
  Home: { screen: MainMenu },
  Profile: { screen: Profile },
  TicTacTuring: { screen: TicTacTuring },

};

export default Routes;

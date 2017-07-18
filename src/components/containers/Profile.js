import Profile from '../ui/Profile';
import { addGame } from '../../redux/Actions';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  const { email, games } = state.user;
  return {
    email,
    games
  };
}

const mapDispatchToProps = (dispatch) => {
  // console.log(dispatch);
  return {
    onNewGame(id, won, datePlayed) {
      dispatch(
        addGame(id, won, datePlayed)
      )
    },
    onNewGames(games) {
      dispatch(
        setGame(games)
      )
    }
  };
}


export default Container = connect(mapStateToProps, mapDispatchToProps)(Profile);

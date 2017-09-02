import TicTacTuring from '../ui/TicTacTuring';
import { connect } from 'react-redux';
import { resetGame } from '../../redux/Actions';

// Map the state from redux state to props
const mapStateToProps = (state) => {
  const { won, gameDone } = state.game;
  return {
    won,
    gameDone
  }
};

// Map the redux actions to props
const mapDispatchToProps = (dispatch) => {
  return {
    onResetGame() {
      dispatch(
        resetGame()
      )
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TicTacTuring);

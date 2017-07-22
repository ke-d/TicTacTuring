import TicTacTuring from '../ui/TicTacTuring';
import { connect } from 'react-redux';
import { resetGame } from '../../redux/Actions';
const mapStateToProps = (state) => {
  const { won, gameDone } = state.game;
  return {
    won,
    gameDone
  }
};

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

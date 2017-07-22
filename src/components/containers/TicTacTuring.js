import TicTacTuring from '../ui/TicTacTuring';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  const { won, gameDone } = state.game;
  return {
    won,
    gameDone
  }
};

export default connect(mapStateToProps)(TicTacTuring);

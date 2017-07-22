import GameBoard from '../ui/GameBoard';
import * as GameActions from '../../redux/Actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const mapStateToProps = (state) => {
  const { userInputs, aiInputs, gameDone, won } = state.game;
  return {
    userInputs,
    aiInputs,
    gameDone,
    won
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    gameActions: bindActionCreators(GameActions, dispatch)
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(GameBoard);

import GameBoard from '../ui/GameBoard';
import { onUserAction, resetGame } from '../../redux/Actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { compose, graphql } from 'react-apollo';
import { userQuery } from '../../graphql/Queries';
import { createGame } from '../../graphql/Mutations';

// Map the createGame mutation for the game board

const ComponentWithMutations = compose(
  graphql(userQuery, { options: {fetchPolicy: 'network-only' }}),
  graphql(createGame, {
    props: ({ mutate, ownProps }) => ({

      submitGame: (won) => {
        let { id } = ownProps.data.user;
        return mutate({
          variables: { won, id }
        })
        .catch(error => console.log(error));
      }

    })
  })
)(GameBoard);

// Map the redux state that contains all the variables of the game
const mapStateToProps = (state) => {
  const { userInputs, aiInputs, gameDone, won } = state.game;
  return {
    userInputs,
    aiInputs,
    gameDone,
    won,
    navIndex: state.nav.index
  };
};

// Map the redux actions to props
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onUserAction: bindActionCreators(onUserAction, dispatch),
    resetGame: bindActionCreators(resetGame, dispatch)
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ComponentWithMutations);

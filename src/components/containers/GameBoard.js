import GameBoard from '../ui/GameBoard';
import * as GameActions from '../../redux/Actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { compose, graphql } from 'react-apollo';
import { userQuery } from '../../graphql/Queries';
import { createGame } from '../../graphql/Mutations';

const ComponentWithMutations = compose(
  graphql(userQuery, { options: {fetchPolicy: 'network-only' }}),
  graphql(createGame, {
    props: ({ mutate, ownProps }) => ({

      submitGame: (won) => {
        console.log(ownProps);
        let { id } = ownProps.data.user;
        console.log("id", id);
        return mutate({
          variables: { won, id }
        })
        .catch(error => console.log(error));
      }

    })
  })
)(GameBoard);

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

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    gameActions: bindActionCreators(GameActions, dispatch)
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ComponentWithMutations);

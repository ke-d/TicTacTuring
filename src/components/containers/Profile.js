import Profile from '../ui/Profile';
import { compose, graphql } from 'react-apollo';
import { getUserData, getUserDataNoPage } from '../../graphql/Queries';
import { createGame } from '../../graphql/Mutations';
import { connect } from 'react-redux';
import { addUserGames } from '../../redux/Actions';
import { bindActionCreators } from 'redux';

// Map the state from redux state to props
const mapStateToProps = (state) => {
  return {
    navIndex: state.nav.index,
    games: state.userGames
  }
};

// Map the redux actions to props
const mapDispatchToProps = (dispatch) => {
  return {
    onNewGames: bindActionCreators(addUserGames, dispatch)
  }
};

const ComponentData = connect(mapStateToProps, mapDispatchToProps)(Profile);

// Creates the pagination in the game list
const ComponentWithMutations = compose(
  graphql(getUserData, {
    options: () => ({
      variables: {
        first: 12,
        skip: 0
      },
      fetchPolicy: 'network-only'
    }),
     props: (props) => {

       const {loading, user, fetchMore, refetch, error} = props.data;
       if(!loading) {
         const { games, email } = user;
         return {
           loading,
           error,
           email,
           initialGames: games,
           refetch,
           fetchMore,
           loadNextPage() {

             return fetchMore({
               variables: {
                 first: 10,
                 skip: games.length
               },
               updateQuery: (previousResult, { fetchMoreResult }) => {
                console.log("current", games.length);
                // console.log("MORE", fetchMoreResult);
                if (!fetchMoreResult) {
                  return previousResult;
                }
                // Create a newGames array that appends the old games and the new games
                const newGames = [...previousResult.user.games, ...fetchMoreResult.user.games];
                console.log("new Size", newGames.length);
                return Object.assign({}, previousResult, {
                  games: newGames,
                });
               }

             });

           }
         }
       } else {
         return {
           loading,
           error
         }
       }
     }
   }
 )
)(ComponentData);

export default ComponentWithMutations;

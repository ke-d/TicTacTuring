import Profile from '../ui/Profile';
import { compose, graphql } from 'react-apollo';
import { getUserData, getUserDataNoPage } from '../../graphql/Queries';
import { createGame } from '../../graphql/Mutations';
import { connect } from 'react-redux';

// const ComponentWithMutations = compose(
//   graphql(getUserData, {
//     options: () => ({
//       variables: {
//         first: 12,
//         skip: 0
//       },
//       fetchPolicy: 'network-only'
//     }),
//      props: ({data: {loading, user, fetchMore, refetch}}) => {
//        if(!loading) {
//          const { games, email } = user;
//          return {
//            loading,
//            email,
//            games,
//            refetch,
//            loadNextPage() {
//
//              return fetchMore({
//                variables: {
//                  first: 10,
//                  skip: games.length
//                },
//                updateQuery: (previousResult, { fetchMoreResult }) => {
//                 //console.log("MORE", fetchMoreResult);
//                 if (!fetchMoreResult) {
//                   return previousResult;
//                 }
//                 const newGames = [...previousResult.user.games, ...fetchMoreResult.user.games];
//                 console.log("new Size", newGames.length);
//                 return Object.assign({}, previousResult, {
//                   games: newGames
//                 });
//                }
//
//              })
//
//            }
//          }
//        }
//      }
//    }
//  )
// )(Profile);

const ComponentWithMutations = compose(
  graphql(getUserDataNoPage, {
    options: () => ({
      fetchPolicy: 'network-only'
    }),
     props: ({data: {loading, user, fetchMore, refetch}}) => {
       if(!loading) {
         const { games, email } = user;
         return {
           loading,
           email,
           games,
           refetch
         }
       } else {
         return {
           loading
         }
       }
     }
   }
 )
)(Profile);

const mapStateToProps = (state) => {
  return {
    navIndex: state.nav.index
  }
};

export default ComponentData = connect(mapStateToProps)(ComponentWithMutations);

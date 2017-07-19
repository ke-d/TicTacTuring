import Profile from '../ui/Profile';
import { addGame } from '../../redux/Actions';
import { connect } from 'react-redux';
import { gql, graphql } from 'react-apollo';

// const mapStateToProps = (state) => {
//   const { email, games } = state.user;
//   return {
//     email,
//     games
//   };
// }
//
// const mapDispatchToProps = (dispatch) => {
//   return {
//     onNewGame(id, won, datePlayed) {
//       dispatch(
//         addGame(id, won, datePlayed)
//       )
//     },
//     onNewGames(games) {
//       dispatch(
//         setGame(games)
//       )
//     }
//   };
// }

// const mapQueriesToProps = ({ ownProps, state }) => {
//   return {
//     data: {
//       query: gql`
//         query {
//           User(id: "cj5a88yfu2e010115teba5ynj"){
//             id
//             email
//             games {
//               id
//               won
//               createdAt
//             }
//           }
//         }
//       `
//     }
//   }
// }

// export default Container = connect(mapQueriesToProps)(Profile);

export default graphql(gql`
        query {
          User(id: "cj5a88yfu2e010115teba5ynj"){
            id
            email
            games {
              id
              won
              createdAt
            }
          }
        }
      `)(Profile);

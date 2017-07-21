import Profile from '../ui/Profile';
import { compose, graphql } from 'react-apollo';
import { getUserData, userQuery } from '../../graphql/Queries';
import { createGame } from '../../graphql/Mutations';


export default ComponentWithMutations = compose(
  graphql(getUserData, { options: {fetchPolicy: 'network-only' }}),
  graphql(createGame, {
    props: ({ mutate, ownProps }) => ({

      onNewGame: (won) => {
        let { id } = ownProps.data.user;
        console.log("id", id);
        return mutate({
          variables: { won, id }
        })
        .then((result) => {
          console.log(result);
          ownProps.data.refetch();
        })
        .catch(error => console.log(error));
      }

    })
  })
)(Profile);

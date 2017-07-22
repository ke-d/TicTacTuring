import Profile from '../ui/Profile';
import { compose, graphql } from 'react-apollo';
import { getUserData, userQuery } from '../../graphql/Queries';
import { createGame } from '../../graphql/Mutations';


export default ComponentWithMutations = compose(
  graphql(getUserData, { options: {fetchPolicy: 'network-only' }})
)(Profile);

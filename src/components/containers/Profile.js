import Profile from '../ui/Profile';
import { graphql } from 'react-apollo';
import { getUserData } from '../../graphql/Queries';


export default graphql(getUserData, { options: {fetchPolicy: 'network-only' }})(Profile);

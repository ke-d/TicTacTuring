import MainMenu from '../ui/MainMenu';
import { graphql } from 'react-apollo';
import { signInUser } from '../../graphql/Mutations';

export default NewEntryWithData = graphql(signInUser, {
  props: ({ mutate }) => ({
    login: (email, password) => mutate({ variables: { email, password } }),
  }),
})(MainMenu);

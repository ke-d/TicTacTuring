import MainMenu from '../ui/MainMenu';
import { graphql } from 'react-apollo';
import { signInUser } from '../../graphql/Mutations';
import { setToken } from '../../redux/Actions';
import { connect } from 'react-redux';
import { AsyncStorage } from 'react-native';

export default graphql(signInUser, {
  props: ({ mutate, ownProps }) => ({

    onLogin: (email, password) => {
      return mutate({ variables: { email, password } })
      .then((result) => {
        let token = result.data.signinUser.token;
        let { dispatch } = ownProps;

        return token;
      })
      .then(token => AsyncStorage.setItem("token", token))
      .then(() => {
        let { navigate } = ownProps.navigation;
        return navigate("Profile");
      })
      .catch(error => console.log(error));
    }

  }),
})(MainMenu);

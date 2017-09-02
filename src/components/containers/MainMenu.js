import MainMenu from '../ui/MainMenu';
import { graphql, withApollo } from 'react-apollo';
import { signInUser } from '../../graphql/Mutations';
import { login, logout } from '../../redux/Actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Map the login mutation to the main manu
const ComponentWithMutations = withApollo(graphql(signInUser, {
  props: ({ mutate, ownProps }) => ({
    onLogin: (email, password) => {
      return mutate({ variables: { email, password } })
      .then((result) => {
        // Get the auth token after the mutation
        const token = result.data.signinUser.token;
        return token;
      })
      .then(token => ownProps.login(token))
      .then(() => {
        // Reset the apollo state and go towards the profile route
        const { navigate } = ownProps.navigation;
        ownProps.client.resetStore();
        return navigate("Profile");
      });
    }

  })
})(MainMenu));

// Map the state from redux state to props
const mapStateToProps = (state) => {
  return {
    navIndex: state.nav.index
  }
};

// Map the redux actions to props
const mapDispatchToProps = (dispatch) => {
  return {
    login: bindActionCreators(login, dispatch),
    logout: bindActionCreators(logout, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ComponentWithMutations);

import MainMenu from '../ui/MainMenu';
import { graphql, withApollo } from 'react-apollo';
import { signInUser } from '../../graphql/Mutations';
import { login, logout } from '../../redux/Actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
const ComponentWithMutations = withApollo(graphql(signInUser, {
  props: ({ mutate, ownProps }) => ({
    onLogin: (email, password) => {
      return mutate({ variables: { email, password } })
      .then((result) => {
        const token = result.data.signinUser.token;
        return token;
      })
      .then(token => ownProps.login(token))
      .then(() => {
        const { navigate } = ownProps.navigation;
        ownProps.client.resetStore();
        return navigate("Profile");
      });
    }

  })
})(MainMenu));

const mapStateToProps = (state) => {
  return {
    navIndex: state.nav.index
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: bindActionCreators(login, dispatch),
    logout: bindActionCreators(logout, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ComponentWithMutations);

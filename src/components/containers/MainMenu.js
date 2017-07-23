import MainMenu from '../ui/MainMenu';
import { graphql } from 'react-apollo';
import { signInUser } from '../../graphql/Mutations';
import { login, logout } from '../../redux/Actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
const ComponentWithMutations = graphql(signInUser, {
  props: ({ mutate, ownProps }) => ({
    onLogin: (email, password) => {
      console.log(ownProps);
      return mutate({ variables: { email, password } })
      .then((result) => {
        let token = result.data.signinUser.token;
        return token;
      })
      .then(token => ownProps.login(token))
      .then(() => {
        let { navigate } = ownProps.navigation;
        return navigate("Profile");
      });
    }

  })
})(MainMenu);

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

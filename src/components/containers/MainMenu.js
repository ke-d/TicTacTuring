import MainMenu from '../ui/MainMenu';
import { graphql } from 'react-apollo';
import { signInUser } from '../../graphql/Mutations';
import { setToken } from '../../redux/Actions';
import { connect } from 'react-redux';
import { AsyncStorage } from 'react-native';

const ComponentWithMutations = graphql(signInUser, {
  props: ({ mutate, ownProps }) => ({
    onLogin: (email, password) => {
      return mutate({ variables: { email, password } });
    }

  })
})(MainMenu);

const mapStateToProps = (state) => {
  return {
    navIndex: state.nav.index
  }
};

export default connect(mapStateToProps)(ComponentWithMutations);

import Profile from '../ui/Profile';
import { compose, graphql } from 'react-apollo';
import { getUserData, userQuery } from '../../graphql/Queries';
import { createGame } from '../../graphql/Mutations';
import { connect } from 'react-redux';

const ComponentWithMutations = compose(
  graphql(getUserData, { options: {fetchPolicy: 'network-only' }})
)(Profile);

const mapStateToProps = (state) => {
  return {
    navIndex: state.nav.index
  }
};

export default connect(mapStateToProps)(ComponentWithMutations);

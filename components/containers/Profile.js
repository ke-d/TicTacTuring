import Profile from '../ui/Profile';
import { connect } from 'react-redux';
import React from 'React';

const mapStateToProps = (state) => {
  // console.log("test", state);
  return {
    email: state.user.email,
    games: state.user.games
  }
}

export default Container = connect(mapStateToProps)(Profile);

// export default () =>
//   <Profile
//     email={"test@gmail.com"}
//     games={[{"id":1, "won": true, "datePlayed":"2015-2-2"}]}
//   />

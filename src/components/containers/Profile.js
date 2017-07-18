import Profile from '../ui/Profile';
import { connect } from 'react-redux';
import React from 'React';

const mapStateToProps = (state) => {
  const { email, games } = state.user;
  return {
    email,
    games
  }
}

export default Container = connect(mapStateToProps)(Profile);

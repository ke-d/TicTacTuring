import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

import GameList from './GameList';


export default class Profile extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    //console.log(initialState);
  }

  render() {
    let { games, email } = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          {`${email}`}
        </Text>
        <GameList
          games={games}
        />
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  header: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  }
});

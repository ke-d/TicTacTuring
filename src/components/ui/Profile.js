import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  ActivityIndicator
} from 'react-native';

import GameList from './GameList';

export default class Profile extends Component {
  constructor(props) {
    super(props);
  }

  componentWillReceiveProps(nextProps) {
    const { navIndex } = nextProps;
    const thisComponentIndex = 1;
    if(this.props.navIndex > navIndex && navIndex === thisComponentIndex) {
      nextProps.data.refetch();
      console.log("back to Profile");
    }
  }

  render() {
    const { data: { loading, error, todos } } = this.props;

    if(loading) {
      return (

        <ActivityIndicator
          animating={true}
          size="large"
        />

      )
    } else if(error) {
      <Text style={styles.welcome}>
        {`An Error has occured`}
      </Text>
    } else {

      const { games, email} = this.props.data.user;
      return (
        <View style={styles.container}>
          <Text style={styles.welcome}>
            {`${email}`}
          </Text>
          <Button title="Play Game" onPress={() => this.props.navigation.navigate("TicTacTuring")} />
          <GameList
            games={games}
          />

        </View>

      );
    }
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

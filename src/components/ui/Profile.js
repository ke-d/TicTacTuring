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
  componentDidMount() {

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
      // console.log("email", this.props.data);
      let { games, email} = this.props.data.User;
      return (
        <View style={styles.container}>
          <Text style={styles.welcome}>
            {`${email}`}
          </Text>
          <Button title="Play Games" onPress={() => onNewGame("4", false, "2016-2-2")} />
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
